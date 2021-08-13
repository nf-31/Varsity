/*
 * bme_sensor.c
 *
 *  Created on: 10 May 2019
 *      Author: 20687184
 */

#include <stdint.h>
#include "bme280_defs.h"
#include "bme_sensor.h"
#include "bme280.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "main.h"
#include "variables.h"


int8_t stream_sensor_data_normal_mode(struct bme280_dev *dev)
{
	int8_t rslt;
	uint8_t settings_sel;

	/* Recommended mode of operation: Indoor navigation */
	dev->settings.osr_h = BME280_OVERSAMPLING_1X;
	dev->settings.osr_p = BME280_OVERSAMPLING_16X;
	dev->settings.osr_t = BME280_OVERSAMPLING_2X;
	dev->settings.filter = BME280_FILTER_COEFF_16;
	dev->settings.standby_time = BME280_STANDBY_TIME_62_5_MS;

	settings_sel = BME280_OSR_PRESS_SEL;
	settings_sel |= BME280_OSR_TEMP_SEL;
	settings_sel |= BME280_OSR_HUM_SEL;
	settings_sel |= BME280_STANDBY_SEL;
	settings_sel |= BME280_FILTER_SEL;
	rslt = bme280_set_sensor_settings(settings_sel, dev);
	rslt = bme280_set_sensor_mode(BME280_NORMAL_MODE, dev);


	return rslt;
}

void user_delay(uint32_t period)
{
	int tick = HAL_GetTick();
	while (HAL_GetTick() - tick <= period); // do nothing

}

int8_t user_i2c_read(uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len)
{
    int8_t rslt = 0; /* Return 0 for Success, non-zero for failure */

    dev_id = dev_id << 1;

    HAL_I2C_Master_Transmit(&hi2c1, dev_id, &reg_addr, 1, 25);
    HAL_I2C_Master_Receive(&hi2c1, dev_id, reg_data, len, 25);

    return rslt;
}

int8_t user_i2c_write(uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len)
{
	int8_t rslt = 0; /* Return 0 for Success, non-zero for failure */

	dev_id = dev_id << 1;

	uint8_t *buffer;
	buffer = malloc(len +1);
	buffer[0] = reg_addr;
	memcpy(buffer +1, reg_data, len);

	HAL_I2C_Master_Transmit(&hi2c1, dev_id, buffer, len+1, 25);
	free(buffer);

	return rslt;
}

void bme_init(void)
{

	dev.dev_id = BME280_I2C_ADDR_PRIM;
	dev.intf = BME280_I2C_INTF;
	dev.read = user_i2c_read;
	dev.write = user_i2c_write;
	dev.delay_ms = user_delay;

	bme280_init(&dev);
}

void get_bme_data(void)
{

	bme280_get_sensor_data(7, &comp_data, &dev); // get data

	int temp = (int)comp_data.temperature; // temperature in °C
	int humidity = (int) comp_data.humidity; // % relative humidity
	int pressure = (int) (comp_data.pressure / 1000); // pressure in kPa

	g_tmp = temp;
	g_hum = humidity;
	g_prs = pressure;
}
