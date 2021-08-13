/*
 * accelerometer.h
 *
 *  Created on: May 11, 2019
 *      Author: user
 */

#ifndef ACCELEROMETER_H_
#define ACCELEROMETER_H_




//functions
int32_t platform_write(void *handle, uint8_t reg, uint8_t *bufp, uint16_t len);
int32_t platform_read(void *handle, uint8_t reg, uint8_t *bufp, uint16_t len);
void accelerometer_init(void);
void get_acceleration_data(void);

//variables
extern lis2dh12_ctx_t dev_acc;
extern axis3bit16_t acceleration_data;
extern lis2dh12_reg_t reg;

#endif /* ACCELEROMETER_H_ */
