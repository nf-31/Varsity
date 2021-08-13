/*
 * bme_sensor.h
 *
 *  Created on: 10 May 2019
 *      Author: 20687184
 */

#ifndef BME_SENSOR_H_
#define BME_SENSOR_H_

void bme_init(void);
void user_delay(uint32_t period);
int8_t user_i2c_read(uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len);
int8_t user_i2c_write(uint8_t dev_id, uint8_t reg_addr, uint8_t *reg_data, uint16_t len);
int8_t stream_sensor_data_normal_mode(struct bme280_dev *dev);
void get_bme_data(void);


#endif /* BME_SENSOR_H_ */
