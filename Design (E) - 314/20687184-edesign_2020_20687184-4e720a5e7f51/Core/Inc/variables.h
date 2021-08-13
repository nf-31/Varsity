/*
 * This header file declarations for all the global variables to be used in the project
 *
 */

#ifndef INC_VARIABLES_H_
#define INC_VARIABLES_H_

// includes
#include "main.h"
#include "stdbool.h"

// variables

extern uint8_t g_startbuf[11];
extern uint8_t g_playbackbuf[3][11];
extern uint8_t g_recordbuf[3][11];
extern uint8_t g_stopbuf[11];
extern int g_lastTick;


// STMCube generated variables
extern DAC_HandleTypeDef hdac;
extern DMA_HandleTypeDef hdma_dac1;
extern TIM_HandleTypeDef htim8;
extern TIM_HandleTypeDef htim3;
extern UART_HandleTypeDef huart2;
extern ADC_HandleTypeDef hadc2;
extern DMA_HandleTypeDef hdma_adc2;
extern DMA_HandleTypeDef hdma_usart2_tx;


// volatiles
extern volatile int rec_flag;
extern volatile int stop_flag;
extern volatile int one_flag;
extern volatile int two_flag;
extern volatile int three_flag;
extern volatile int rec_one_flag;
extern volatile int rec_two_flag;
extern volatile int rec_three_flag;
extern volatile int play_one_flag;
extern volatile int play_two_flag;
extern volatile int play_three_flag;

//interrupt flags
extern volatile int rec_trig;
extern volatile int stop_trig;
extern volatile int one_trig;
extern volatile int two_trig;
extern volatile int three_trig;

// buffers for sine wave generation
extern uint16_t dacbuffer[1024];

// variables for ADC
extern uint8_t recbuf[1024];
extern int8_t outputbuf[1024];
extern int32_t tempsample;
extern int32_t average;
extern int32_t accumulator;
extern int32_t numavg;
extern float smoothed_sample;

// variables for debouncing
extern volatile int button_now;
extern volatile int button_prev;
//extra variables
extern volatile int button_released;


#endif /* INC_VARIABLES_H_ */
