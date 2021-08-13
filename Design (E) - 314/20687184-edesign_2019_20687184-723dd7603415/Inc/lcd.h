/*
 * lcd.h
 *
 *  Created on: Apr 20, 2019
 *      Author: 20687184
 *
 *      This header file contains definitions for functions to be used to communicate
 *      with the LCD, as well as macros that define whether a pin is high or low
 */

#ifndef LCD_H_
#define LCD_H_

#define RS_0 HAL_GPIO_WritePin(GPIOB,GPIO_PIN_5,GPIO_PIN_RESET);
#define RS_1 HAL_GPIO_WritePin(GPIOB,GPIO_PIN_5,GPIO_PIN_SET);
#define RNW_0 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_9,GPIO_PIN_RESET);
#define RNW_1 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_9,GPIO_PIN_SET);
#define DB4_0 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_11,GPIO_PIN_RESET);
#define DB4_1 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_11,GPIO_PIN_SET);
#define DB5_0 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_12,GPIO_PIN_RESET);
#define DB5_1 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_12,GPIO_PIN_SET);
#define DB6_0 HAL_GPIO_WritePin(GPIOC,GPIO_PIN_6,GPIO_PIN_RESET);
#define DB6_1 HAL_GPIO_WritePin(GPIOC,GPIO_PIN_6,GPIO_PIN_SET);
#define DB7_0 HAL_GPIO_WritePin(GPIOC,GPIO_PIN_8,GPIO_PIN_RESET);
#define DB7_1 HAL_GPIO_WritePin(GPIOC,GPIO_PIN_8,GPIO_PIN_SET);
#define E_0 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_10,GPIO_PIN_RESET);
#define E_1 HAL_GPIO_WritePin(GPIOA,GPIO_PIN_10,GPIO_PIN_SET);

void delay(int milliseconds);
void lcd_init(void); //initialise the lcd
void clear_display(void); //clear lcd display
void send_char(char c); //send character to lcd
void upper_nibble(int a, int b, int c, int d); //fill upper nibble of data
void lower_nibble(int a, int b, int c, int d); //fill lower nibble of data
void write_lcd(void); //RS_1 and RNW_0
void send_str(char str[]); //send string to lcd
void e_cycle(int time); // enable cylce
void next_line(void); // shift cursor to line 2 of lcd
void get_lcd_data(void);


#endif /* LCD_H_ */
