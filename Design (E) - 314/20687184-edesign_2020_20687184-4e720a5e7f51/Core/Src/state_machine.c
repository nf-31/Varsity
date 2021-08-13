/*
 * state_machine.c
 *
 * This source file contains all the code relevant to the implementation of a state machine for the project.
 */

#include "state_machine.h"

void states(void)
{
	if (rec_flag == 1) activeState = RecordState;
	if (stop_flag == 1) activeState = StopState;
	if (one_flag || two_flag || three_flag) activeState = PlayState;


} // end states


void stateMachine(void)
{

	switch (activeState)
	{
	case RecordState: {
		HAL_GPIO_WritePin(GPIOB,GPIO_PIN_14,GPIO_PIN_SET);

		switch (activeRecordState)
		{
		case RecordIdle: {
			if(rec_one_flag)
			{
				activeRecordState = RecordOne;
				HAL_UART_Transmit(&huart2,g_recordbuf[0],10, 1000);
			}
			if(rec_two_flag) {
				activeRecordState = RecordTwo;
				HAL_UART_Transmit(&huart2,g_recordbuf[1],10, 1000);
			}
			if(rec_three_flag){
				activeRecordState = RecordThree;
				HAL_UART_Transmit(&huart2,g_recordbuf[2],10, 1000);
			}
			break;
		} // end case RecordIdle
		case RecordOne: {
			// if record button pressed and held, and button one pressed and released, do the following:
			rec_one_flag = 0; // reset flag
			HAL_TIM_Base_Start_IT(&htim3); // trigger interrupt to toggle LED <1>
			//HAL_ADC_Start_DMA(&hadc2,(uint32_t*)recbuf,1024);
			if (activeState == StopState) break;
			break;
		} // end case RecordOne
		case RecordTwo: {
			// if record button pressed and held, and button two pressed and released, do the following:
			rec_two_flag = 0;
			HAL_TIM_Base_Start_IT(&htim3);
			if(activeState == StopState) break;
			break;
		} // end case RecordTwo
		case RecordThree: {
			rec_three_flag = 0;
			HAL_TIM_Base_Start_IT(&htim3);
			if(activeState == StopState) break;
			break;
		} // end case RecordThree

		} // end nested switch

		break;
	} // end case RecordState
	case StopState: {
		stop_flag = 0;
		resetLEDs();
		HAL_TIM_Base_Stop_IT(&htim3);
		HAL_UART_Transmit(&huart2,g_stopbuf,10, 1000);
		HAL_ADC_Stop_DMA(&hadc2);
		HAL_DAC_Stop_DMA(&hdac,DAC_CHANNEL_1); // stop DAC peripheral
		resetFlags();
		activeState = IdleState;
		break;
	} // end case StopState
	case PlayState: {
		switch (activePlayState)
		{
		case PlayIdle: {
			if (one_flag){
				activePlayState = PlayOne;
				HAL_UART_Transmit(&huart2,g_playbackbuf[0],10, 1000);
			}
			if (two_flag) {
				activePlayState = PlayTwo;
				HAL_UART_Transmit(&huart2,g_playbackbuf[1],10, 1000);
			}
			if(three_flag) {
				activePlayState = PlayThree;
				HAL_UART_Transmit(&huart2,g_playbackbuf[2],10, 1000);
			}
			break;
		} // end case PlayIdle
		case PlayOne: {
			one_flag = 0;


			HAL_TIM_Base_Start_IT(&htim3);
			if(activeState == StopState) break; // check for stop condition

			break;
		} // end case PlayOne
		case PlayTwo: {
			two_flag = 0;
			HAL_TIM_Base_Start_IT(&htim3);
			if(activeState == StopState) break;

			break;
		} // end case PlayTwo
		case PlayThree: {
			three_flag = 0;
			HAL_TIM_Base_Start_IT(&htim3);
			if(activeState == StopState) break;
			break;
		} // end case PlayThree
		} // end nested switch
		break;
	} // end case PlayState
	case IdleState: {
		HAL_GPIO_WritePin(GPIOB,GPIO_PIN_14,GPIO_PIN_RESET);
		resetStates();
		break;
	} // end case IdleState
	} // end switch

} // end stateMachine

void resetFlags()
{ // this function resets all the flags used to determine states.
	rec_flag = 0;
	stop_flag = 0;
	one_flag = 0;
	two_flag = 0;
	three_flag = 0;
} // end resetFlags

void resetStates()
{
	activeState = IdleState;
	activeRecordState = RecordIdle;
	activePlayState = PlayIdle;
}

void checkStop()
{ // this function checks that the stop button has been pressed and released, and puts the state machine into the Stop state
	if (stop_flag == 1)
	{
		activeState = StopState;
		activeRecordState = RecordIdle;
		activePlayState = PlayIdle;
	} // end if
} // end checkStop
