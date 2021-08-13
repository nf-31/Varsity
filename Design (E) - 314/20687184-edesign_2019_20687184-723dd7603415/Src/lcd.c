/*
 * lcd.c
 *
 *  Created on: 19 Apr 2019
 *      Author: 20687184
 *
 *	Contains all the functions to be used in communicating with LCD
 */

// includes
#include "lcd.h"
#include "project.h"
#include "main.h"
#include "variables.h"
#include <stdio.h>


void get_lcd_data(void)
{
	char alt[7];
	int temp = g_tmp;
	char burn = 32; // variable that indicates whether burn signal activated on lcd


	if (lcd_data_flag)
	{
		for(int i = 0; i < 7; i++) alt[i] = g_lcd_alt[i];
	} // fill altitude buffer for lcd
	else if (lcd_data_flag == 0)
	{
		alt[0] = '0';
		alt[1] = 'm';
	}

	if (lcd_b == 0) burn = 32;
	else if (lcd_b) burn = 66;

	snprintf(g_lcd_data,17,"%-6s%4c%5dC",alt,burn,temp);
	lcd_data_flag = 0;
} // end get_lcd_data

void send_char(char c)
{
	switch (c){

	case '0':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,0,0,0);
		e_cycle(1);
	break;

	case '1':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,0,0,0);
		e_cycle(1);
	break;

	case '2':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,1,0,0);
		e_cycle(1);
	break;

	case '3':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,1,0,0);
		e_cycle(1);
	break;

	case '4':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,0,1,0);
		e_cycle(1);
	break;

	case '5':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,0,1,0);
		e_cycle(1);
	break;

	case '6':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,1,1,0);
		e_cycle(1);
	break;

	case '7':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,1,1,0);
		e_cycle(1);
	break;

	case '8':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,0,0,1);
		e_cycle(1);
	break;

	case '9':
		write_lcd();
		upper_nibble(1,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,0,0,1);
		e_cycle(1);
	break;

	case 'M':
	case 'm':
		write_lcd();
		upper_nibble(0,1,1,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,0,1,1);
		e_cycle(1);
	break;

	case 'B':
	case 'b':
		write_lcd();
		upper_nibble(0,0,1,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,1,0,0);
		e_cycle(1);
	break;

	case 'C':
	case 'c':
		write_lcd();
		upper_nibble(0,0,1,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,1,0,0);
		e_cycle(1);
	break;

	case ' ':
		write_lcd();
		upper_nibble(0,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(0,0,0,0);
		e_cycle(1);
	break;

	case '-':
		write_lcd();
		upper_nibble(0,1,0,0);
		e_cycle(1);

		write_lcd();
		lower_nibble(1,0,1,1);
		e_cycle(1);

	} // end switch

} // end send_char

void send_str(char str[])
{
	for(int i = 0; i < 8; i++)
	{
		send_char(str[i]);
	}
	next_line();
	for(int i = 8; i < 16; i++)
		{
			send_char(str[i]);
		}

} // end send_str

void e_cycle(int time)


{
	//delay(time); //delay for instruction to be ready
	E_0; // write_lcd instruction
	delay(time); //delay for instruction to be written
	E_1; //set enable high

}

void delay (int milliseconds)
{
	int tick = HAL_GetTick();
	while (HAL_GetTick() - tick <= milliseconds); // do nothing

} // end function delay

void write_lcd(void)
{
	RS_1;
	RNW_0;
}

void upper_nibble(int a, int b, int c, int d)
{
	//integers a,b,c, and d represent DB4,DB5,DB6, and DB7 respectively
	// their values will determine whether they get set to 1 or 0

	if (a == 0) DB4_0;
	if (a == 1) DB4_1;

	if (b == 0) DB5_0;
	if (b == 1) DB5_1;

	if (c == 0) DB6_0;
	if (c == 1) DB6_1;

	if (d == 0) DB7_0;
	if (d == 1) DB7_1;

} // end function upper_nibble

void lower_nibble (int a, int b, int c, int d)
{
	//integers a,b,c, and d represent DB4,DB5,DB6, and DB7 respectively
		// their values will determine whether they get set to 1 or 0

		if (a == 0) DB4_0;
		if (a == 1) DB4_1;

		if (b == 0) DB5_0;
		if (b == 1) DB5_1;

		if (c == 0) DB6_0;
		if (c == 1) DB6_1;

		if (d == 0) DB7_0;
		if (d == 1) DB7_1;
} // end function lower_nibble

void lcd_init(void)
{

/************Send 8 bit command three times**********************/
    delay(20);
	E_1;
	DB4_1;
	DB5_1;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;

	//first time
	delay(5);
	E_0; //write_lcd
	delay(5);
	E_1;

	//second time
	delay(5);
	E_0; //write_lcd
	delay(5);
	E_1;

	//third time
	delay(5);
	E_0; //write_lcd
	delay(5);
	E_1;

	delay(5); // wait five milliseconds
/*****************************************************************/
	//1
	DB4_0;
	DB5_1;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2); //delay for instruction to be ready
	E_0; // write_lcd instruction
	delay(2); //delay for instruction to be written
	E_1; //set enable high again

	//2
	DB4_0;
	DB5_1;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//3
	DB4_0;
	DB5_1;
	DB6_1;
	DB7_1;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//4
	DB4_0;
	DB5_0;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//5
	DB4_0;
	DB5_0;
	DB6_0;
	DB7_1;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//6
	DB4_0;
	DB5_0;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//7
	DB4_1;
	DB5_0;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//8
	DB4_0;
	DB5_0;
	DB6_0;
	DB7_0;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

	//9
	DB4_0;
	DB5_1;
	DB6_1;
	DB7_1;
	RNW_0;
	RS_0;
	delay(2);
	E_0;
	delay(2);
	E_1;

} // end function lcd_init

void next_line(void)
{
	RS_0;
	RNW_0;
	upper_nibble(0,0,1,1);
	e_cycle(1);

	RS_0;
	RNW_0;
	lower_nibble(0,0,0,0);
	e_cycle(1);
} // end function next_line

void clear_display(void)
{
	E_1;
	//upper nibble
	RS_0;
	RNW_0;
	DB4_0;
	DB5_0;
	DB6_0;
	DB7_0;
	delay(2);
	E_0; //write
	delay(2);
	E_1;

	//lower nibble
	RS_0;
	RNW_0;
	DB4_1;
	DB5_0;
	DB6_0;
	DB7_0;
	delay(2);
	E_0; //write
	delay(2);
	E_1;

} // end function clear display
