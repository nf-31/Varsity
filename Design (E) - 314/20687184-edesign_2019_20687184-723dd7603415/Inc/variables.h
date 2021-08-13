/*
 * variables.h
 *
 *  Created on: 16 Feb 2019
 *      Author: 20687184
 *
 *      Header file for global variables used in project
 */


#ifndef VARIABLES_H_
#define VARIABLES_H_

//constants
#define MAX_LEN 93

// extern variables
extern int g_lasttick;
extern int g_count;
extern const char* g_stdnum;
extern int g_time;
extern char* g_tod;
extern int g_hrs;
extern int g_mins;
extern int g_sec;
extern int g_tmp;
extern int g_hum;
extern int g_prs;
extern int g_acc1, g_acc2, g_acc3;
extern int g_latdeg;
extern int g_latmin;
extern char g_latdir;
extern int g_londeg;
extern int g_lonmin;
extern char g_londir;
extern int g_alt_w;
extern int g_alt_dec;
extern double g_cur;
extern double g_vol;
extern char g_txbuf[];
extern char g_rxbuf[];
extern char g_tempbuf[];
extern uint8_t inchar;
extern char gps[];
extern char cs[];
extern UART_HandleTypeDef huart1;
extern ADC_HandleTypeDef hadc1;
extern ADC_HandleTypeDef hadc2;
extern I2C_HandleTypeDef hi2c1;
extern uint8_t chk;
extern int g_loncheck;
extern int g_burn;
extern int g_cnt;
extern int g_tim_cnt;
extern double g_voltage[];
extern int g_vol_cnt1;
extern int vol_len;
extern int g_vol_cnt2;
extern double g_current[];
extern int cur_len;
extern int g_cur_cnt1;
extern int g_cur_cnt2;
extern char g_lcd_data[];
extern char g_lcd_alt[];
extern struct bme280_dev dev;
extern struct bme280_data comp_data;
extern float acceleration[];

//volatiles
extern volatile int char_received;
extern volatile int temp_len;
extern volatile int chk_flag;
extern volatile int parse_gps;
extern volatile int start_checksum;
extern volatile int burn_flag;
extern volatile int vol_flag;
extern volatile int get_vol;
extern volatile int get_cur;
extern volatile int cur_flag;
extern volatile int lcd_data_flag;
extern volatile int start_burn;
extern volatile int end_burn;
extern volatile int lcd_b;




#endif /* VARIABLES_H_ */
