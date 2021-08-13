/*
 * accelerometer.c
 *
 *  Created on: May 11, 2019
 *      Author: user
 */

#include "main.h"
#include "variables.h"
#include "lis2dh12_reg.h"
#include "accelerometer.h"
#include "bme_sensor.h"
#include <string.h>


lis2dh12_ctx_t dev_acc;
axis3bit16_t acceleration_data;
lis2dh12_reg_t reg;

void get_acceleration_data(void)
{
	int acc_x = 0;
	int acc_y = 0;
	int acc_z = 0;

	dev_acc.write_reg = platform_write;
	dev_acc.read_reg = platform_read;
	dev_acc.handle = &hi2c1;

	lis2dh12_xl_data_ready_get(&dev_acc, &reg.byte);

	memset(acceleration_data.u8bit, 0x00, 3*sizeof(int16_t));


	lis2dh12_acceleration_raw_get(&dev_acc, acceleration_data.u8bit);


	acceleration[0] = lis2dh12_from_fs2_hr_to_mg(acceleration_data.i16bit[0]);
	acceleration[1] = lis2dh12_from_fs2_hr_to_mg(acceleration_data.i16bit[1]);
	acceleration[2] = lis2dh12_from_fs2_hr_to_mg(acceleration_data.i16bit[2]);

	acc_x = -(int) acceleration[0];
	acc_y = (int) acceleration[1];
	acc_z = (int) acceleration[2];

	/*****************clamping of acceleration values***************************/
	if (acc_x >= 999) acc_x = 999;
	if (acc_x <= -999) acc_x = -999;
	if (acc_y >= 999) acc_y = 999;
	if (acc_y <= -999) acc_y = -999;
	if (acc_z >= 999) acc_z = 999;
	if (acc_x <= -999) acc_z = -999;
	/**************************************************************************/

	//fill global variables
	g_acc1 = acc_x;
	g_acc2 = acc_y;
	g_acc3 = acc_z;

} // end get_acceleration_data

int32_t platform_read(void *handle, uint8_t reg, uint8_t *bufp, uint16_t len)
{
	reg |= 0x80;
	HAL_I2C_Mem_Read(handle, LIS2DH12_I2C_ADD_H, reg, I2C_MEMADD_SIZE_8BIT, bufp, len, 100);
	return 0;

} // end platform_read

int32_t platform_write(void *handle, uint8_t reg, uint8_t *bufp, uint16_t len)
{
	reg |= 0x80;
	HAL_I2C_Mem_Write(handle, LIS2DH12_I2C_ADD_H, reg,I2C_MEMADD_SIZE_8BIT, bufp, len, 100);
	return 0;

} // end platform_write

void accelerometer_init(void)
{
	//Initialize mems driver interface
	dev_acc.write_reg = platform_write;
	dev_acc.read_reg = platform_read;
	dev_acc.handle = &hi2c1;


	lis2dh12_block_data_update_set(&dev_acc, PROPERTY_ENABLE); //Enable block data update
	lis2dh12_data_rate_set(&dev_acc, LIS2DH12_ODR_1Hz); //Set output data rate to 1Hz
	lis2dh12_full_scale_set(&dev_acc, LIS2DH12_2g); // Set full scale to 2g
	lis2dh12_temperature_meas_set(&dev_acc, LIS2DH12_TEMP_ENABLE); // Enable temperature sensor
	lis2dh12_operating_mode_set(&dev_acc, LIS2DH12_HR_12bit); // Set device in continuous mode with 12 bit resolution

} // end accelerometer_init
