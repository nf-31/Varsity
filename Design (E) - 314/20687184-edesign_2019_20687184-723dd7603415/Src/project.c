/*
 * project.c
 *
 *  Created on: 16 Feb 2019
 *      Author: 20687184
 *
 *      This source file contains all functions to be used in the project.
 */

//Includes
#include "project.h"
#include "main.h"
#include "lcd.h"
#include "bme280.h"
#include "bme_sensor.h"
#include "bme280_defs.h"
#include "variables.h"
#include <stdio.h>
#include "lis2dh12_reg.h"
#include "accelerometer.h"


void sample_current(void)
{
	if (HAL_GetTick() - g_cur_cnt1 >= 10) // sample after every 10 ms
	{
		g_cur_cnt1 = HAL_GetTick();
		cur_flag = 1;
		HAL_ADC_Start_IT(&hadc2);

	}// end if

} // end sample_current

void get_current(void)
{
	double s_current = 0;
	double current = 0;
	double actual_cur = 0;
	if (HAL_GetTick() - g_cur_cnt2 >= 1000)
	{
		g_cur_cnt2 = HAL_GetTick();

		// current calculation
		for (int i = 0; i < 100; i++) s_current += g_current[i];
		current = s_current / 100.0;
		actual_cur = current * 0.084; // actual value based on precalculated ratio
		g_cur = actual_cur;

	} // end if
	get_cur = 0;
} // end if

void sample_voltage(void)
{
	if (HAL_GetTick() - g_vol_cnt1 >= 10) // sample after every 10 ms
	{
		g_vol_cnt1 = HAL_GetTick();
		vol_flag = 1;
		HAL_ADC_Start_IT(&hadc1);

	}// end if

} // end sample_voltage

void get_voltage(void)
{
	double s_voltage = 0;
	double voltage = 0;
	double actual_vol = 0;

	if (HAL_GetTick() - g_vol_cnt2 >= 1000)
	{
		g_vol_cnt2 = HAL_GetTick();

		// voltage calculation
		for (int i = 0; i < 100; i++) s_voltage += g_voltage[i];
		voltage = s_voltage / 100.0; // average of sampled value
		actual_vol = voltage * 0.01043642072; // actual value based on pre-calculated ratio
		g_vol = actual_vol;

	} // end if

	get_vol = 0;

} // end get voltage

void burn_signal(void)
{
	if (g_burn > 4)
	{
		start_burn = 1;
	} // end if

	if (start_burn)
	{
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_8,GPIO_PIN_SET);
		lcd_b = 1;
		start_burn = 0;
		g_burn = -20;
		g_tim_cnt = HAL_GetTick();
		end_burn = 1;
	} // end if

	if (((HAL_GetTick() - g_tim_cnt) >= 10000) && (end_burn == 1))
	{
		HAL_GPIO_WritePin(GPIOA,GPIO_PIN_8,GPIO_PIN_RESET);
		lcd_b = 0;
		g_burn  = 0;
		end_burn = 0;

	} // end if

} // end burn_signal


void get_string()
{
	// copy contents of tempbuf into g_rxbuf
	for (int i = 0; i < MAX_LEN; i++)
	{
		g_rxbuf[i] = g_tempbuf[i];

	} // end for
} // end get_string

void checksum (void)
{
	int cs_index = 0; // index for cs string
	int gps_index = 0; // index for gps string
	int start_char = 0; // flag to indicate occurrence of $ in rx_buf
	int end_char = 0; //flag to indicate occurrence of * in rx_buf
	uint8_t val = 0; // variable to store evaluated checksum
	int calc = 0; // flag to indicate that checksum should start to be calculated
	int comp = 0; //variable to contain hex representation of sent checksum

	//Splitting of received string into gps string and checksum
	for (int i = 0; i < MAX_LEN; i++)
	{
		if(end_char)
		{
			cs[cs_index] = g_rxbuf[i];
			cs_index++;
		} // end if

		if(cs_index > 1)
		{ // prevent overflow of the checksum array
			end_char = 0;
		} // end if

		if (g_rxbuf[i] == 36) start_char = 1;

		if(start_char)
		{ // copy characters in rx_buf to gps starting from $
			gps[gps_index] = g_rxbuf[i];
			gps_index++;
		} // end if

		if (g_rxbuf[i] == 42)
		{
			end_char = 1;
			start_char = 0;
		} // end if

		g_rxbuf[i] = 0; //clear element of g_rxbuf

	} // end for

	// checksum evaluation
	for (int i = 0; i < MAX_LEN; i++)
	{
		if(gps[i] == 42) calc = 0;
		if(calc) val ^= gps[i];
		if(gps[i] == 36) calc = 1;

	} // end for
	//
	chk = val; // let global variable chk contain the calculated checksum
	sscanf(cs, "%2X", &comp); // convert value in cs to hex and store in comp

	// If $GPGGA is contained in string and calculated checksum is equal to sent checksum, set flag to enable parsing of the gps string
	if((chk == (uint8_t)comp) && (gps[1] == 'G') && (gps[2] == 'P') && (gps[3] == 'G') && (gps[4] == 'G') && (gps[5] == 'A')) parse_gps = 1;

	// reset values
	val = 0;
	cs_index = 0;
	comp = 0;
	start_checksum = 0;

} // end checksum

void process_gps(void)
{
	int comma_cnt[15]; // variable to store number of commas reached in string
	int x = 0; // index counter for comma_cnt[]
	char time[10]; // gps substring containing time
	int t = 0; // index counter for time[]
	char hours[2];
	char minutes[2];
	char seconds[2];
	char latitude[10] = "000000000"; //gps substring containing latitude
	int l_lat = 0; // index counter for latitude[]
	char lat_deg[3]; // latitude degrees substring
	char lat_min[7] = "000000"; // latitude degrees substring
	int latmin = 0; // preliminary variable to store latitude minutes
	char longitude[11] = "0000000000"; // gps substring containing longitude
	int l_lon = 0; // index counter for longitude[]
	char lon_deg[4]; // longitude degrees substring
	char lon_min[7] = "000000"; // longitude minutes substring
	int lonmin = 0; // preliminary variable to store longitude minutes
	char altitude[9] = "00000000"; // gps substring containing altitude
	int alt = 0; // index counter for altitude[]
	char alt_w[6] = {'\0','\0','\0','\0','\0','\0'}; // altitude substring
	char alt_dec[3] = "00"; // decimal part of altitude
	char lcd_alt[7] =  {'\0','\0','\0','\0','\0','\0','\0'};
	int alt_dcnt = 0; // index counter for alt_dec[]
	char londeg_check[9] = "00000000"; // longitude degrees check buffer
	char lonmin_check[7] = "000000"; // longitude minutes check buffer
	int londeg_c = 0; // longitude degrees check variable
	int lonmin_c = 0; // longitude minutes check variable
	int cnt = 0; // index counter for lonmin_check[]
	burn_flag = 1;
	int lon_flag = 0;
	int lat_flag = 0;

	// burn signal conditions
	int alt_check = 10000;
	int u_lon_check = 18935400;
	int l_lon_check = 17976343;

	// locate commas, and place occurrence of comma in gps string in corresponding no. of comma
	for (int i = 0; i < MAX_LEN; i++)
	{
		if (x > 14) x = 0;
		if (gps[i] == 44)
		{
			comma_cnt[x+1] = i;
			x++;
		} // end if

	} // end for

	/********************************time extraction*************************************/
	if (comma_cnt[2] != (comma_cnt[1] + 1))
	{
		// create time substring
		for (int i = comma_cnt[1]+1; i < comma_cnt[2]; i++)
		{
			time[t] = gps[i];
			t++;
		} // end for

		t = 0;

		// create hours, minutes and seconds substrings
		for (int i = 0; i < 2; i++) hours[i] = time[i];
		for (int i = 2; i < 4; i++) minutes[i-2] = time[i];
		for (int i = 4; i < 6; i++) seconds[i-4] = time[i];
	} // end if

	// append time values into their respective integers
	sscanf(hours,"%d",&g_hrs);
	sscanf(minutes,"%d", &g_mins);
	sscanf(seconds,"%d",&g_sec);

	/**********************************************************************************/

	/*****************************latitude extraction*********************************/
	if(comma_cnt[3] != (comma_cnt[2] + 1))
	{
		lat_flag =1;
		//create latitude substring
		for (int i = comma_cnt[2]+1; i < comma_cnt[3]; i++)
		{
			latitude[l_lat] = gps[i];
			l_lat++;
		} // end for

		l_lat = 0; // reset counter

		//create degrees and minutes substrings
		for (int i = 0; i < 2; i++) lat_deg[i] = latitude[i];
		for (int i = 2; i < 4 ; i++) lat_min[i-2] = latitude[i];
		for (int i = 5; i < 9; i++) lat_min[i-3] = latitude[i];

	} // end if

	if (gps[comma_cnt[3]+1] == 78) g_latdir = 43; // if North, direction +
	else if (gps[comma_cnt[3]+1] == 83) g_latdir = 45; // if South, direction -

	//append latitude values to their respective integer variables
	if (lat_flag) {
		sscanf(lat_min,"%d",&latmin);
		sscanf(lat_deg,"%d",&g_latdeg);
		g_latmin = latmin/0.6;
		lat_flag = 0;
	}

	/***********************************************************************************/

	/*****************************longitude extraction*********************************/

	if(comma_cnt[5] != (comma_cnt[4] + 1))
	{
		lon_flag = 1;
		// create longitude substring
		for (int i = comma_cnt[4]+1; i < comma_cnt[5]; i++)
		{
			longitude[l_lon] = gps[i];
			l_lon++;
		} // end for

		l_lon = 0; // reset counter

		//create degrees and minutes substrings
		for (int i = 0; i < 3; i++) lon_deg[i] = longitude[i];
		for (int i = 3; i < 5; i++) lon_min[i-3] = longitude[i];
		for (int i = 6; i < 10;i++) lon_min[i-4] = longitude[i];
	} // end if

	//direction
	if (gps[comma_cnt[5]+1] == 69) g_londir = 43; // if East, direction +
	else if (gps[comma_cnt[5]+1] == 87) g_londir = 45; // if West, direction -

	//append longitude values to their respective integer variables
	if (lon_flag)
	{
		sscanf(lon_deg,"%d", &g_londeg);
		sscanf(lon_min,"%d", &lonmin);
		g_lonmin = lonmin/0.6;
		lon_flag = 0;
	} //end if

	/***********************************************************************************/

	/*****************************altitude extraction**********************************/

	if(comma_cnt[10] != (comma_cnt[9] + 1))
	{
		// create altitude substring
		for (int i = comma_cnt[9] + 1; i < comma_cnt[10]; i++)
		{
			altitude[alt] = gps[i];
			alt++;
		} // end for

		alt = 0; // reset counter

		// separate altitude into whole and decimal parts
		int j = 0;

		while(altitude[j] != 46)
		{
			alt_w[j] = altitude[j];
			lcd_alt[j] = altitude[j];
			j++;
		} // end while

		lcd_alt[j] = 'm';
		j += 1;

		while (!(j > 9))
		{
			alt_dec[alt_dcnt] = altitude[j];
			alt_dcnt++;
			j++;
		} // end while

		j = 0;
		alt_dcnt = 0;

	} // end if

	//append altitude values into respective integer variables
	sscanf(alt_w,"%5d",&g_alt_w);
	sscanf(alt_dec,"%1d",&g_alt_dec);
	for(int i = 0; i < 7;i++) g_lcd_alt[i] = lcd_alt[i];


	/*********************************************************************************/


	/*********************fill variable for burn signal******************************/

	for (int i = 1; i < 3; i++) londeg_check[i-1] = longitude[i];
	for (int i = 3; i < 10; i++)
	{
		if (longitude[i] != 46)
		{
			lonmin_check[cnt] = longitude[i];
			cnt++;
		} // end if

	} // end for
	cnt = 0;
	sscanf(londeg_check,"%d",&londeg_c);
	sscanf(lonmin_check,"%d",&lonmin_c);
	g_loncheck = londeg_c + (lonmin_c / 0.6);

	/*******************************************************************************/

	/************************burn signal check**************************************/

	if ((g_alt_w > alt_check) && ((g_loncheck < l_lon_check) || (g_loncheck > u_lon_check)))
	{
		// if conditions are met, increment g_burn
		g_burn++;
	} // end else if
	else
	{
		// set g_burn to 0 if none of the conditions hold
		g_burn = 0;
	} // end else

	/******************************************************************************/

	parse_gps = 0;
	lcd_data_flag = 1;
	for (int i = 0; i < MAX_LEN; i++) gps[i] = ' '; // clear gps buffer

} // end process_gps

void get_time(void)
{
	if ((HAL_GetTick() - g_count) >= 1000)
	{
		g_count = HAL_GetTick();
		g_time++;

		if(g_time == 99999)
		{
			g_time = 0;
		} // end if

	} // end if

} // end get_time

void process_string(void)
{
	snprintf(g_txbuf,92,"%9s,%5d,%02d:%02d:%02d,%3d,%3d,%3d,%4d,%4d,%4d,%1c%2d.%06d,%1c%03d.%06d,%5d.%1d,%3d,%3.1lf\n",g_stdnum,g_time,g_hrs,g_mins,g_sec,g_tmp,g_hum,g_prs,g_acc1,g_acc2,g_acc3,g_latdir,g_latdeg,g_latmin,g_londir,g_londeg,g_lonmin,g_alt_w,g_alt_dec,(int)g_cur,g_vol);

} // end process_string

void print_string()
{
	if ((HAL_GetTick() - g_lasttick) >= 1000)
	{
		g_lasttick = HAL_GetTick();

		get_bme_data();
		get_acceleration_data();
		get_lcd_data();
		process_string();
		clear_display(); //clear LCD display
		send_str(g_lcd_data); // send string to lcd
		HAL_UART_Transmit(&huart1, (uint8_t*)g_txbuf,91, 1000);

	} // end if

} // end printString

void initialise(void)
{
	get_string();
	if (start_checksum) checksum();
	if (parse_gps) process_gps();
	burn_signal();
	sample_voltage();
	sample_current();
	get_time();
	if(get_vol) get_voltage();
	if(get_cur) get_current();
	print_string();

} // end initialise
