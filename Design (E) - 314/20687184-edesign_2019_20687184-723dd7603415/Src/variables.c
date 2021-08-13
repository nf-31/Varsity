/*
 * variables.c
 *
 *  Created on: 16 Feb 2019
 *      Author: 20687184
 *
 *      This source file contains all global variables to be used in the project.
 */

//includes
#include "main.h"
#include <stdint.h>
#include "variables.h"
#include "bme280.h"
#include "bme280_defs.h"




char g_txbuf[250]; //buffer containing string to be output
char g_rxbuf[250]; // buffer to store relevant characters to be processed for output
char g_tempbuf[250]; // buffer to temporarily store characters received via uart
char gps[MAX_LEN]; //gps string
char cs[3]; // array to contain checksum from string
uint8_t inchar; // variable to receive uart message
int g_lasttick = 0;
int g_count = 0;
const char* g_stdnum = "$20687184";// student number
int g_time = 0; // time since processor startup (seconds);
char* g_tod; // time of day from gps
int g_hrs = 0; // hours as received by gps string
int g_mins = 0; // minutes as received by gps string
int g_sec = 0; // seconds as received by gps string
int g_tmp = 0; // temperature
int g_hum = 0; // humidity
int g_prs = 0; // atmospheric pressure
int g_acc1 = 0; // linear acceleration 1
int g_acc2 = 0; // linear acceleration 2
int g_acc3 = 0; // linear acceleration 3
int g_latdeg = 0; // latitude degrees as received by gps string
int g_latmin = 0;  // latitude degrees as received by gps string
char g_latdir = 32; // latitude direction as received by gps string
int g_londeg = 0; // longitude degrees as received by gps string
int g_lonmin = 0; // longitude minutes as received by gps string
char g_londir = 32; // longitude direction as received by gps string
int g_altcheck = 0; // variable to store altitude in burn signal evaluation
int g_loncheck = 0; // variable to store longitude in burn signal evaluation
int g_alt_w = 0; // whole part of altitude as received by gps string
int g_alt_dec = 0; // decimal part of altitude as received by gps string
double g_cur = 0; //supply current
double g_vol = 0; // supply voltage
uint8_t chk; // calculated checksum
int g_burn = 0;  // variable to store amount of times valid messages received for burn signal evaluation
int g_cnt = 0; // counter for burn signal length
int g_tim_cnt = 0;
double g_voltage[100]; //sampled voltage buffer
int vol_len = 0; //g_voltage index counter
int g_vol_cnt1 = 0; // time counter for sample_voltage
int g_vol_cnt2 = 0; // time counter for get_voltage
double g_current[100]; // sampled current buffer
int cur_len = 0; // g_current index counter
int g_cur_cnt1 = 0; //time counter for sample_current
int g_cur_cnt2 = 0; // time counter for get_current
char g_lcd_data[17]; // string containing data to be displayed on lcd
char g_lcd_alt[7]; // string containing altitude to be shown on lcd
struct bme280_dev dev;
struct bme280_data comp_data;
float acceleration[3];


// STM32CubeMX defined variables

UART_HandleTypeDef huart1;
ADC_HandleTypeDef hadc1;
ADC_HandleTypeDef hadc2;
I2C_HandleTypeDef hi2c1;


//volatiles

volatile int char_received = 0; //flag to indicate whether a character has been received
volatile int temp_len = 0;  //length of temporary buffer
volatile int chk_flag = 0; // flag to indicate that string is indeed GGA standard
volatile int parse_gps = 0; // flag to signify parsing of gps string
volatile int start_checksum = 0; // flag to start calculation of checksum
volatile int burn_flag = 0; //flag to indicate that evaluation for burn signal must begin
volatile int vol_flag = 0; //flag to signify sampling of voltage over adc
volatile int get_vol = 0; // flag to indicate that voltage should be calculated
volatile int cur_flag = 0; // flag to signify sampling of current over adc
volatile int get_cur = 0; // flag to indicate that current should be calculated
volatile int lcd_data_flag = 0; //flag to indicate that data to be shown on lcd must be obtained
volatile int start_burn = 0; //flag to indicate that burn signal must begin
volatile int end_burn = 0; // flag to indicate that burn signal must end
volatile int lcd_b = 0; // show whether burn signal on or off on lcd



