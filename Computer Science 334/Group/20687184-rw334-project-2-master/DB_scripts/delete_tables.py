# Author: Joubert Visagie 22983856
# Python script: Drops the created tables in the Enron database

import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="enron_admin",
    password="!QWErty123",
    database="enron_db"
)

mycursor = mydb.cursor()

mycursor.execute("DROP TABLE employeeList;")
mycursor.execute("DROP TABLE message;")
mycursor.execute("DROP TABLE recipientInfo;")
mycursor.execute("DROP TABLE referenceInfo;")
mycursor.execute("DROP TABLE userList;")
#mycursor.execute("DROP TABLE tokenList;")
