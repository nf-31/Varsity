/*
 * This source file contains all the global variables to be used in the project
 */

#include "variables.h"

// global variables
uint8_t g_startbuf[11] = {127,128,50,48,54,56,55,49,56,52};
uint8_t g_stopbuf[11] = {127,128,83,116,111,112,95,95,95,95};
uint8_t g_recordbuf[3][11] =
{
		{127,128,82,101,99,111,114,100,95,49},
		{127,128,82,101,99,111,114,100,95,50},
		{127,128,82,101,99,111,114,100,95,51}
};
uint8_t g_playbackbuf[3][11] =
{
		{127,128,80,108,97,121,95,95,95,49},
		{127,128,80,108,97,121,95,95,95,50},
		{127,128,80,108,97,121,95,95,95,51}
};

int g_lastTick = 0;

// buffers for sine wave generation
uint16_t dacbuffer[1024];


// variables for ADC


// STM32 CubeMX defined variables
DAC_HandleTypeDef hdac;
DMA_HandleTypeDef hdma_dac1;
TIM_HandleTypeDef htim8;
TIM_HandleTypeDef htim3;
UART_HandleTypeDef huart2;
ADC_HandleTypeDef hadc2;
DMA_HandleTypeDef hdma_adc2;
DMA_HandleTypeDef hdma_usart2_tx;




// volatiles
volatile int stop_flag = 0;// flag to check that stop button released
volatile int one_flag = 0; // flag to check that button one pressed
volatile int two_flag = 0; // flag to check that button two pressed
volatile int three_flag = 0; // flag to check that button three pressed
volatile int rec_flag = 0; // flag to set record state of state machine
volatile int rec_one_flag = 0; // flag to update record state to record to slot one
volatile int rec_two_flag = 0; // flag to update record state to record to slot two
volatile int rec_three_flag = 0; // flag to update record state to record to slot three
volatile int play_one_flag = 0;
volatile int play_two_flag = 0;
volatile int play_three_flag = 0;


// interrupt flags, each one corresponds to either of the record, stop, one, two, or three buttons being pressed.
volatile int rec_trig = 0;
volatile int stop_trig = 0;
volatile int one_trig = 0;
volatile int two_trig = 0;
volatile int three_trig = 0;


//some test variables for debouncing
volatile int button_now = 0;
volatile int button_prev = 0;
volatile int button_released = 0;
volatile int one_debounce = 0;
