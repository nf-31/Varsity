# Author: Noah Foroma 20687184
# This script contains the queries necessary to obtain the information as required by the specifications

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func, and_

def query(session, EmployeeList, Message, RecipientInfo, search_term, start_date, end_date):
    '''Returns results from employee query

    Parameters
    ----------
    session : obj
        Handle to database

    EmployeeList : class
        Class representing ORM equivalent of employeeList table

    Message : class
        Class representing ORM equivalent of message table


    RecipientInfo : class
        Class representing ORM equivalent of recipientInfo table

    search_term : str
        The search term containing employee first name and/or last name

    start_date : str
        The first date in the period stipulated by user for email count

    end_date : str
        The last date in the period stipulated by user for email count

    Returns
    -------
    results : list
        A list of dictionaries containing the necessary information from the database
    '''
    lastName = None
    if " " in search_term:
        # At most take the first two substrings in the search term
        term = search_term.split(" ")
        firstName, lastName = term[0:2]
        firstName.lower()
        lastName.lower()
    else:
        firstName = search_term.lower()

    results = []


    # Check that employee exists in database
    try:
        check = checkEmployeeInDatabase(session, firstName, EmployeeList,lastName)
        if not check:
            raise ValueError("Employee does not exist!")
    except ValueError as ve:
        return results

    if lastName is None:
        # logic for case when only firstName is provided
        same = countSameFirstName(session,firstName, EmployeeList)
        listOfFullNames = employeeFullName(session, firstName, EmployeeList)
        emails = getEmail(session, firstName, EmployeeList)

        for j in range(same):
            keys = ["firstName", "lastName", "email", "numEmailsSent", "mostContacted"]
            employeeData = dict.fromkeys(keys)
            (employeeData[keys[0]], employeeData[keys[1]]) = listOfFullNames[j] # populate first and last names
            email = emails[j][0]
            employeeData[keys[2]] = email
            if (start_date == "1979/12/31" or start_date == "1979-12-31") and (end_date == "2002/09/22" or end_date == "2002-09-22"):
                # Default case (i.e. over entire period)
                employeeData[keys[3]] = totalEmailsSent(session, email, Message)
            else:
                employeeData[keys[3]] = totalEmailsPeriod(session, email, Message, start_date, end_date)

            employeeData[keys[4]] = []
            for i in mostContacted(session, email, Message, RecipientInfo, EmployeeList):
                (first, last, email_address) = i
                employeeData[keys[4]].append(first + " " + last + ": " + email_address)

            results.append(employeeData)

    else:
        keys = ["firstName", "lastName", "email", "numEmailsSent", "mostContacted"]
        employeeData = dict.fromkeys(keys)

        employeeData[keys[0]] = firstName.capitalize()
        employeeData[keys[1]] = lastName.capitalize()
        email = getEmail(session, firstName, EmployeeList,lastName)
        employeeData[keys[2]] = email
        if (start_date == "1979/12/31" or start_date == "1979-12-31") and (end_date == "2002/09/22" or end_date == "2002-09-22"):
            # Default case (i.e. over entire period)
            employeeData[keys[3]] = totalEmailsSent(session, email, Message)
        else:
            employeeData[keys[3]] = totalEmailsPeriod(session, email, Message, start_date, end_date)

        employeeData[keys[4]] = []
        for i in mostContacted(session, email, Message, RecipientInfo, EmployeeList):
            (first, last, email_address) = i
            employeeData[keys[4]].append(first + " " + last + ": " + email_address)

        results.append(employeeData)

    return results


def countSameFirstName(session, firstName, EmployeeList):
    '''
    Returns the number of employees sharing the same first name in the organisation.

    Parameters
    ----------
    session : obj
        handle to database

    firstName : str
        Employee's first name

    EmployeeList : class
        Class representing ORM equivalent of employeeList table

    Returns
    -------
    count : int
        Number of employees sharing the same first name in the organisation
    '''
    count = 0
    count = session.query(EmployeeList.firstname).filter_by(firstname = firstName).count()
    return count

def employeeFullName(session, firstName, EmployeeList):
    '''
    Returns list containing the first name and last name of the employee

    Parameters
    ----------
    session : obj
        Handle to database

    firstName : str
        Employee's first name

    EmployeeList : class
        Class representing ORM equivalent of employeeList table

    Returns
    -------
    result : list
        A list of tuples containing the first name and last name of each employee sharing the same first name
    '''
    result = session.query(EmployeeList.firstname, EmployeeList.lastname).filter_by(firstname = firstName)
    return result.all()


def getEmail(session, firstName,EmployeeList, lastName = None):
    '''
    Returns the email address of the employee

    Parameters
    ----------
    session : obj
        Handle to database

    firstName : str
        First name of employee

    EmployeeList : class
        Class representing ORM equivalent of employeeList table

    lastName : str
        Last name of employee

    Returns
    -------
    list/str : list if lastName is None str otherwise
    '''
    if lastName is None:

        result = session.query(EmployeeList.email_address).filter_by(firstname = firstName)
        return result.all()
    else:
        result = session.query(EmployeeList.email_address).filter_by(firstname = firstName, lastname = lastName)
        return result.first()[0]


def totalEmailsSent(session, email, Message):
    '''
    Returns the total number of emails sent by an employee

    Parameters
    ----------
    session : obj
        Handle to database

    email : str
        Email address of employee

    Message : class
        Class representing ORM equivalent of message table

    Returns
    -------
    result : int
        Total number of emails sent by employee

    '''
    result = session.query(Message.sender).filter_by(sender = email).count()
    return result


def totalEmailsPeriod(session, email, Message, firstdate, lastdate):

    '''
    Returns the total number of emails sent by an employee within stipulated period.

    Parameters
    ----------
    session : obj
        Handle to database

    email : str
        Email address of employee

    Message : class
        Class representing ORM equivalent of message table

    firstdate : str
        Beginning of period

    lastdate : str
        End of period

    Returns
    -------
    result : int
        Total number of emails sent by employee

    '''

    result = session.query(Message.sender).filter_by(sender = email).filter(and_(Message.date >= firstdate, Message.date <= lastdate)).count()
    return result

def mostContacted(session, email, Message, RecipientInfo, EmployeeList):
    '''
    Returns the top 5 most contacted people by the employee (based on sent emails)

    session : obj
        Handle to database

    email : str
        Email address of employee

    Message : class
        Class representing ORM equivalent of table message

    RecipientInfo : class
        Class representing ORM equivalent of table recipientInfo

    EmployeeList : class
        Class representing ORM equivalent of table EmployeeList

    Returns
    -------
    result : list
        List of tuples containing the names and email addresses of the top 5 most contacted people by employee
    '''

    result = session.query(EmployeeList.firstname, EmployeeList.lastname, RecipientInfo.rvalue).join(Message, RecipientInfo.mid == Message.mid).\
    join(EmployeeList, RecipientInfo.rvalue == EmployeeList.email_address).filter(Message.sender == email).\
    group_by(RecipientInfo.rvalue, Message.sender, EmployeeList.firstname, EmployeeList.lastname).\
    order_by(func.count(RecipientInfo.rvalue).desc(), Message.sender).limit(5)
    return result.all()

def checkEmployeeInDatabase(session, firstName, EmployeeList, lastName = None):
    '''
    Checks if any employees exist with the give first name and/or surname

    Parameters
    ----------
    session : obj
        Handle to database

    firstName : str
        First name of employee

    EmployeeList : class
        Class representing ORM equivalent of employeeList table

    lastName : str
        Last name of employee

    Returns
    -------

    result : bool
        True if exists, False otherwise

    '''
    if lastName != None:
        result = result = session.query(session.query(EmployeeList).filter(EmployeeList.firstname == firstName, EmployeeList.lastname == lastName).exists()).scalar()
    else:
        result = session.query(session.query(EmployeeList).filter(EmployeeList.firstname == firstName).exists()).scalar()
    return result
