# Author: Noah Foroma 20687184
# This script contains the queries necessary to obtain the information as required by the specifications

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine, func, and_, update
from sqlalchemy.sql import exists

def deleteAuthenticationToken(session, UserList, username):
    '''
    Removes the authentication token assigned to user in database.

    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representation of ORM equivalent of userList table

    TokenList : class
        Class representation of ORM equivalent of tokenList table

    username : str
        The username of the user logging out

    Returns
    -------
    result : bool
        True if deletion successful, False otherwise
    '''

    result = False
    # check whether authentication token has not already been deleted or does not exist
    try:
        checkDeleted = checkAuthenticationToken(session, UserList, username, None)
        if checkDeleted:
            raise ValueError("Authentication token does not exist!")
    except ValueError as ve:
        print(ve)
        return result

    session.execute(update(UserList).where(UserList.username == username).values(token = None))
    session.commit()
    result = True
    return result


def insertAuthenticationToken(session, UserList, username, token):
    '''
    Inserts authentication token created for user into table.

    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representation of ORM equivalent of userList table

    username : str
        The username of the user logging in

    token : str
        The generated token for the user

    Returns
    -------
    result : bool
        True if successful, False otherwise
    '''
    result = False

    # check whether authentication token already exists or if another authentication token has been assigned
    try:
        checkExists = checkAuthenticationToken(session, UserList, username, token)
        if checkExists:
            raise ValueError("Authentication token already exists!")
    except ValueError as ve:
        print(ve)
        return result

    try:
        checkOtherExists = session.query(session.query(UserList).filter(UserList.username == username, UserList.token != None).exists()).scalar()
        if checkOtherExists:
            raise ValueError("Other authentication token already assigned.")
    except ValueError as ve:
        print(ve)
        return result


    session.execute(update(UserList).where(UserList.username == username).values(token = token))
    session.commit()
    result = True
    return result


def createUser(session, UserList, username, password):
    '''
    Inserts newly created user into database.

    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representation of ORM equivalent of userList table

    username : str
        The username of the user creating account

    password : str
        The password of the user creating account

    Returns
    -------
    result : bool
        True if successful, False if fails
    '''

    result = False

    # check if user already exists
    try:
        check = checkUserInDatabase(session, UserList, username)
        if check:
            raise ValueError("User already exists!")
    except ValueError as ve:
        print(ve)
        return result

    # Add username and password to table
    user = UserList(username = username, password = password)
    session.add(user)
    session.commit()
    result = True

    return result



def checkAuthenticationToken(session, UserList, username, token):
    '''
    Checks authentication token and ensure it is valid.

    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representation of ORM equivalent of userList table

    username : str
        The username of the user

    token : str
        The token assigned to the user

    Returns
    -------
    valid : bool
        True if token is valid, False otherwise
    '''
    valid = session.query(session.query(UserList).filter(UserList.username == username, UserList.token == token).exists()).scalar()
    return valid

def verifyCredentials(session, UserList, username, password):
    '''
    Verifies that user credentials are correct.
    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representation of ORM equivalent of userList table

    username : str
        The username of the user attempting a login

    password : str
        The password of the user attempting a login

    Returns
    -------
    valid : bool
        True if credentials valid, false otherwise
    '''

    valid = False

    # Validate that user exists. If they do, proceeed to confirm password
    try:
        checkUser = checkUserInDatabase(session, UserList, username)
        if not checkUser:
            raise ValueError("User does not exist!")
    except ValueError as ve:
        print(ve)
        return valid

    try:

        checkPassword = session.query(session.query(UserList).filter(UserList.password == password).exists()).scalar()
        if not checkPassword:
            raise ValueError("Password incorrect!")
    except ValueError as ve:
        print(ve)
        return valid

    if checkUser and checkPassword:
        valid = True

    return valid

def checkUserInDatabase(session, UserList, username):
    '''
    Checks whether user exists in database

    Parameters
    ----------
    session : obj
        Handle to database

    UserList : class
        Class representing ORM equivalent of table userList

    Returns
    -------
    result : bool
        True if user exists, False otherwise
    '''
    result = session.query(session.query(UserList).filter(UserList.username == username).exists()).scalar()
    return result
