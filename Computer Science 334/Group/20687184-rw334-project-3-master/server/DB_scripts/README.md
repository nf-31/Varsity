Information about the DB and scripts:

Dependencies:
	In your virtual env, isntall these:
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
	- CREATE DATABASE social_db;
	- CREATE USER 'social_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY '!QWErty123';
	- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON social_db.* TO 'social_admin'@'localhost';
	
Adding the tables:
	Run the dbscipt.py script ($ python3 dbscript.py ) in the DB_scripts directory.
	With no parameters this script will test the database connection.
	If the connection is successful, then add the parameter 'create' to the script:
	$ python3 dbscript.py create
	to create the tables for the database.
	
	Script summary:
	To run this script: $ python3 dbscript (argument)
	Possible argument:
	    create - to create the tables for the database
	    delete - to drop the tables in the database
	An empty argument will test the database connection

This set of commands should create the database environment 
needed to have a local database for the social network.

