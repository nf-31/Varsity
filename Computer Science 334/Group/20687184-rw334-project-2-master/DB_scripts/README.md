Information about the DB and scripts:

Dependencies:
	In your virtual env, isntall these:
	- pandas($ pip install pandas)
	- mysql.connector($ pip install mysql-connector-python)

Installing MySQL:
	https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04


Creating the database:
	Some links to look at:
	https://dev.mysql.com/doc/refman/8.0/en/creating-database.html
	https://matomo.org/faq/how-to-install/faq_23484/
	
	To to create a database:
	  Start MySQL as the root user($ sudo mysql -u root -p) or another admin user with rights to 
	  create databases and users, and run the following commands:
	- CREATE DATABASE enron_db;
	- CREATE USER 'enron_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY '!QWErty123';
	- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON enron_db.* TO 'enron_admin'@'localhost';
	
	This set of commands should create the environment and yet to be populated database
	needed to have a local database for the enron dataset.

Running the cleaning script on the raw data:
	- Have the emails.csv file in this directory.
	- Run the cleaning script using the command:
	  $ python3 clean.py
	- This should create a cleaned csv file called parsed_second_pass.csv
	
Populating the database:
	- Have the parsed_second_pass.csv in this directory.
	- Run the cleaning script using the command:
	  $ python3 createdb.py
	- This should populate your local enron_db database in MySQL

Populating the database with the backup:
	- The database must already be created.
	- Restoring the database will only create the tables and populate them.
	- The backup file is located at https://stellenbosch-my.sharepoint.com/:u:/g/personal/22983856_sun_ac_za/Ed068R2OGoVDtLnEP7dPXecBQ5MxJRY0xCYDjI4w5MoNuA?e=BVX1Bu by people in Stellenbosch Univeristy.
	- In the command line run:
	  $ sudo mysql -u root -p enron_db < enron_backup.sql
	  This might take a few minutes.
	- Reference to backup infromation: https://phoenixnap.com/kb/how-to-backup-restore-a-mysql-database

