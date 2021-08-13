# Author: Joubert Visagie 22983856
# Python script: Creates the tables from the cleaned csv file for the Enron database

import mysql.connector
import sys


def create_tables(mycursor):
    # The enron dataset tables
    mycursor.execute("CREATE TABLE user_table ("
                     "uid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(31) UNIQUE,"
                     "password VARCHAR(60), email VARCHAR(31) UNIQUE, avatar_path VARCHAR(127)"
                     ")")

    mycursor.execute("CREATE TABLE group_table ("
                     "gid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(31) UNIQUE"
                     ")")

    mycursor.execute("CREATE TABLE post_table ("
                     "pid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user INT(10) UNSIGNED,"
                     "gid INT(10) UNSIGNED, date_time DATETIME , geo_tag VARCHAR(127), body TEXT"
                     ")")

    mycursor.execute("CREATE TABLE comment_table ("
                     "cid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user INT(10) UNSIGNED,"
                     "post INT(10) UNSIGNED, date_time DATETIME, body TEXT"
                     ")")

    mycursor.execute("CREATE TABLE friends_table ("
                     "user INT(10) UNSIGNED, friend INT(10) UNSIGNED"
                     ")")

    mycursor.execute("CREATE TABLE category_table ("
                     "ctid INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, type VARCHAR(31)"
                     ")")

    mycursor.execute("CREATE TABLE post_category_table ("
                     "post INT(10) UNSIGNED, category INT(10) UNSIGNED"
                     ")")

    mycursor.execute("CREATE TABLE member_table ("
                     "gid INT(10) UNSIGNED, user INT(10) UNSIGNED, is_admin BOOLEAN"
                     ")")

    print("SUCCESSFULLY CREATED DATABASE!")


def output_commands():
    print("To run this script: $ python3 dbscript (argument)")
    print("Possible argument:")
    print("create - to create the tables for the database")
    print("delete - to drop the tables in the database")
    print("An empty argument will test the database connection")


def drop_tables(mycursor):
    mycursor.execute("DROP TABLE user_table;")
    mycursor.execute("DROP TABLE group_table;")
    mycursor.execute("DROP TABLE post_table;")
    mycursor.execute("DROP TABLE comment_table;")
    mycursor.execute("DROP TABLE friends_table;")
    mycursor.execute("DROP TABLE category_table;")
    mycursor.execute("DROP TABLE post_category_table;")
    mycursor.execute("DROP TABLE member_table;")
    print("DELETED ALL TABLES")


def main():
    mydb = mysql.connector.connect(
        host="localhost",
        user="social_admin",
        password="!QWErty123",
        database="social_db"
    )

    mycursor = mydb.cursor()

    if len(sys.argv) == 2:
        if sys.argv[1] == 'create':
            create_tables(mycursor)
        elif sys.argv[1] == 'delete':
            drop_tables(mycursor)
    else:
        print("Connection: " + str((mydb.connection_id, mydb.server_host, mydb.database, mydb.user)))

    output_commands()


if __name__ == "__main__":
    main()
