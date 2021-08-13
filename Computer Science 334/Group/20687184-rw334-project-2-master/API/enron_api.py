# Author: Joubert Visagie 22983856, Noah Foroma 20687184
# This is a draft for the api between the web application and the database

from flask import Flask, json, jsonify, request
from employee_queries import query
from db import *
from user_queries import createUser, insertAuthenticationToken, deleteAuthenticationToken, verifyCredentials, \
    checkAuthenticationToken

api = Flask(__name__)
api.config['JSON_SORT_KEYS'] = False


# /api/login?username=somevalue&password=anothervalue
@api.route("/api/login", methods=['GET'])
def check_login():
    username = request.args.get('username')
    password = request.args.get('password')

    verify = verifyCredentials(session, UserList, username, password)

    if verify:
        token = request.args.get('token')
        success = insertAuthenticationToken(session, UserList, username, token)
        result = {'valid_user': success}
    else:
        result = {'valid_user': verify}
    return jsonify(result), 200


# /api/logout?usermame=?????
@api.route("/api/logout", methods=['PATCH'])
def logout():
    username = request.form['username']
    result = deleteAuthenticationToken(session, UserList, username)
    if result:
        return "Success", 201
    else:
        return "Failed", 409


# /api/token?username=?????&token=??????   should it be token=?????
@api.route("/api/token", methods=['GET'])
def check_token():
    username = request.args.get('username')
    token = request.args.get('token')
    verifyToken = checkAuthenticationToken(session, UserList, username, token)
    result = {'token_valid': verifyToken}
    return jsonify(result), 200


@api.route("/api/users", methods=['POST'])
def insert_user():
    username = request.form["username"]
    password = request.form["password"]
    user = createUser(session, UserList, username, password)
    if user:
        return "Created", 201
    else:
        return "Not created", 409

# /api/enron/users?searchterm=????&firstdate=????&lastdate=?????


@api.route("/api/enron/users", methods=['GET'])
def get_user_info():
    searchterm = request.args.get('searchterm')
    firstdate = request.args.get('firstdate')
    lastdate = request.args.get('lastdate')
    result = query(session, EmployeeList, Message,
                   RecipientInfo, searchterm, firstdate, lastdate)

    return jsonify(result), 200


@api.teardown_appcontext
def end_session(error):
    close_session()


if __name__ == "__main__":
    api.run(port=14000, debug=True)
