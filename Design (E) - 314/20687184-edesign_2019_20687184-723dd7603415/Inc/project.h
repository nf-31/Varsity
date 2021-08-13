/*
 * project.h
 *
 *  Created on: 16 Feb 2019
 *      Author: 20687184
 *
 * This header file contains all function prototypes and global definitions
 */

#ifndef PROJECT_H_
#define PROJECT_H_

//functions
void initialise(void);//contains calls to all functions and is placed in while loop
void create_string(); // obtain string from uart input
void get_string();
void process_string(void); // concatenate string to be output
void printString(); // print out student number
void get_time(void); //time since processor startup
void checksum(void);
void process_gps(void);
void burn_signal(void);
void get_voltage(void);
void sample_voltage(void);
void sample_current(void);
void get_current(void);
void get_lcd_data(void);




#endif /* PROJECT_H_ */
