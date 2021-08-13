# Author: Joubert Visagie 22983856
# Python script: Creates the tables from the cleaned csv file for the Enron database

import mysql.connector
import pandas as pd
import numpy as np
import re


def add_employees(mycursor, df):
    employee_info = df[['filename', 'first_name', 'last_name', 'email_address']]
    sql = "INSERT INTO employeeList (firstname, lastname, email_address) VALUES (%s, %s, %s)"
    employee_info = employee_info.drop_duplicates(subset='email_address', keep="first")
    df.drop(df.index[df['email_address'] == 'no.address@enron.com'], inplace=True)
    employee_list = []
    for emp in employee_info.values:
        email = emp[3]
        if len(email) <= 31:
            employee_list.append((emp[1].capitalize(), emp[2].capitalize(), email))
    mycursor.executemany(sql, employee_list)
    print("Employee list added successfully!")


def add_recipient(mycursor, mid, rtype, recipients):
    if not recipients:
        return

    list = recipients.split(",")
    sql = "INSERT INTO recipientInfo (mid, rtype, rvalue) VALUES (%s, %s, %s)"
    for person in list:
        if len(person) <= 127:
            mycursor.execute(sql, (mid, rtype, person))


def add_reference(mycursor, mid, ref):
    if not ref:
        return

    sql = "INSERT INTO referenceInfo (mid, reference) VALUES (%s, %s)"
    mycursor.execute(sql, (mid, ref))


def add_messages(mycursor, df):
    for row in df.values:
        # mid is a value incremented in the db with insertion, but it will match the message number in the csv
        mid = int(row[0])

        message_id = row[6]
        folder = row[8]
        email = row[4]
        subject = row[7]
        # Body too large for TEXT used LONGTEXT
        body = row[12]
        date = pd.to_datetime(row[5]).to_pydatetime().strftime('%Y-%m-%d %H:%M:%S')
        sql = "INSERT INTO message (sender, date, message_id, subject, body, folder) VALUES (%s, %s, %s, %s, %s, %s)"
        mycursor.execute(sql, (email, date, message_id, subject, body, folder))

        add_recipient(mycursor, mid, "TO", row[9])
        add_recipient(mycursor, mid, "CC", row[10])
        add_recipient(mycursor, mid, "BCC", row[11])

        # Reference too large for TEXT used LONGTEXT
        add_reference(mycursor, mid, row[13])
    return 0


def create_tables(mycursor):
    # The enron dataset tables
    mycursor.execute("CREATE TABLE employeeList ("
                     "eid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(31), lastname VARCHAR(31),"
                     "email_address VARCHAR(31)"
                     ")")

    mycursor.execute("CREATE TABLE message ("
                     "mid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, sender VARCHAR(127), date DATETIME,"
                     "message_id VARCHAR(127), subject TEXT, body LONGTEXT, folder VARCHAR(127)"
                     ")")

    mycursor.execute("CREATE TABLE recipientInfo ("
                     "rid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, mid INT(10) UNSIGNED,"
                     " rtype ENUM('TO', 'CC', 'BCC'), rvalue VARCHAR(127)"
                     ")")

    mycursor.execute("CREATE TABLE referenceInfo ("
                     "rfid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, mid INT(10) UNSIGNED, reference LONGTEXT"
                     ")")

    # The authentication table
    mycursor.execute("CREATE TABLE userList ("
                     "uid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(31) UNIQUE,"
                     "password VARCHAR(31), token VARCHAR(1000)"
                     ")")


def main():
    mydb = mysql.connector.connect(
        host="localhost",
        user="enron_admin",
        password="!QWErty123",
        database="enron_db"
    )

    mycursor = mydb.cursor()

    create_tables(mycursor)

    df = pd.read_csv('parsed_second_pass.csv')
    print("Full DF read in")
    df = df.replace(np.nan, '', regex=True)
    add_employees(mycursor, df)
    df = None

    chunks = pd.read_csv('parsed_second_pass.csv', chunksize=5000)
    print("Chunks read in")

    for df in chunks:
        df = df.replace(np.nan, '', regex=True)
        add_messages(mycursor, df)
        mydb.commit()
        df.info()
        print("-------- Chunk complete --------")
    print("SUCCESS!!!")


if __name__ == "__main__":
    main()
