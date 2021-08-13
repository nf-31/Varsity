# Author : Noah Foroma 20687184
# This script contains the database and session initialisation, as well as session termination.

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import scoped_session, sessionmaker 
from sqlalchemy import create_engine



Base = automap_base() 

# engine, has tables corresponding to those in database
engine = create_engine('mysql+mysqlconnector://enron_admin:!QWErty123@localhost/enron_db', echo = None)

# Create Session
Session = scoped_session(sessionmaker(bind=engine))
session = Session()

# reflect tables
Base.prepare(engine, reflect=True)

# mapped classes that represent each table in the database.
EmployeeList = Base.classes.employeeList
Message = Base.classes.message 
RecipientInfo = Base.classes.recipientInfo  
UserList = Base.classes.userList

def close_session():
    '''
    End the initiated session
    '''
    Session.remove()