# Enron API

Ensure the API file is **ALWAYS** running when trying to query the API routes.

Dependencies: <br />
In your virtual environment, install sqlalchemy:
```bash
$ pip install sqlalchemy
```

<br />

**Note:**
* Refer to createdb.py for the code to create the userList table and run that in MySQL Workbench so you do not have to run the script again.
* Other than the "Enron employee info," the methods return `True` for a successful operation and `False` if the operation fails.

<br />


## Login

----
  User login to website.

<br />

  `GET` `/api/login`

<br />

### Parameters

<br />

| Name | Type | In |  Description|
|-----------|:-----------:|:-------:| :--------------: |
| `username` | string |  body| Username of user.  |
| `password` | string |body |Password of user.|


<br />

### Response
<br />


`Status: 200 OK`
<br />

`True`

OR

`Status : 200 OK`
<br />

`False`

<br />

### Code sample

  ```python
    user = {"username": username, "password": password}

    r = requests.get(
        url =  "http://127.0.0.1:14000/api/login",
        params = user
        )
  ```

  <br />

## Logout

----
  Logout of website and delete authentication token.

<br />

  `PATCH`  `/api/logout`

<br />

### Parameters

<br />

| Name | Type | In |  Description|
|-----------|:-----------:|:-------:| :--------------: |
| `username` | string |  body| Username of user.  |

<br />

### Response
<br />


`Status: 200 OK`
<br />

`True`

OR

`Status : 200 OK`
<br />

`False`

<br />

### Code sample

  ```python
    user = {"username": username}

    r = requests.patch(
        url =  "http://127.0.0.1:14000/api/logout",
        params = user
        )
  ```

<br />

## Validate token

----
  Check whether token assigned to user is valid.

<br />

  `GET` `/api/token`

<br />

### Parameters

<br />

| Name | Type | In |  Description|
|-----------|:-----------:|:-------:| :--------------: |
| `username` | string |  body| Username of user.  |
| `token` | string |body |Token assigned to user.|


<br />

### Response

<br />


`Status: 200 OK`
<br />

`True`

OR

`Status : 200 OK`
<br />

`False`

<br />

### Code sample

  ```python
    user = {"username": username, "token": token}

    r = requests.get(
        url =  "http://127.0.0.1:14000/api/token",
        params = user
        )
  ```

  <br />

## Create user

----
  Create user and insert into database.

<br />

  `POST` `/api/users`

<br />

### Parameters

<br />

| Name | Type | In |  Description|
|-----------|:-----------:|:-------:| :--------------: |
| `username` | string |  body| Username of user.  |
| `password` | string |body |Password of user.|


<br />

### Response

<br />


`Status: 200 OK`
<br />

`True`

OR

`Status : 200 OK`
<br />

`False`

<br />

### Code sample

  ```python
    user = {"username": username, "password": password}

    r = requests.post(
        url =  "http://127.0.0.1:14000/api/users",
        data = user
        )
  ```

  <br />

## Enron employee info

----
  Obtain information on Enron employee from database.

<br />

  `GET` `/api/enron/users`

<br />

### Parameters
<br />

| Name | Type | In |  Description|
|-----------|:-----------:|:-------:| :--------------: |
| `searchterm` | string |  body| The employee's name.  |
| `firstdate` | string |body |Beginning date of period for search.|
| `lastdate` | string |body |End date of period for search.|


<br />

### Response

<br />


`Status: 200 OK`
<br />

 `[[{'firstName': 'Phillip', 'lastName': 'Allen', 'email': 'phillip.allen@enron.com', 'numEmailsSent': 601, 'mostContacted': ['Keith Holst: keith.holst@enron.com', 'Mike Grigsby: mike.grigsby@enron.com', 'Ina Rangel: ina.rangel@enron.com', 'Frank Ermis: frank.ermis@enron.com', 'John Lavorato: john.lavorato@enron.com']}, {'firstName': 'Phillip', 'lastName': 'Love', 'email': 'phillip.love@enron.com', 'numEmailsSent': 888, 'mostContacted': ['Susan Bailey: susan.bailey@enron.com', 'Phillip Love: phillip.love@enron.com', 'Eric Bass: eric.bass@enron.com', 'Michael Walters: michael.walters@enron.com', 'Matthew Lenhart: matthew.lenhart@enron.com']}, {'firstName': 'Phillip', 'lastName': 'Taylor', 'email': 'phillip.taylor@enron.com', 'numEmailsSent': 5, 'mostContacted': ['Sally Beck: sally.beck@enron.com', 'Greg Piper: greg.piper@enron.com', 'Jeffrey Sherrick: jeffrey.sherrick@enron.com', 'Kerry Roper: kerry.roper@enron.com', 'Bob Butts: bob.butts@enron.com']}, {'firstName': 'Phillip', 'lastName': 'Platter', 'email': 'phillip.platter@enron.com', 'numEmailsSent': 117, 'mostContacted': ['Bruce Mills: bruce.mills@enron.com', 'Victor Guggenheim: victor.guggenheim@enron.com', 'Souad Mahmassani: souad.mahmassani@enron.com', 'Kam Keiser: kam.keiser@enron.com', 'Jason Wolfe: jason.wolfe@enron.com']}, {'firstName': 'Phillip', 'lastName': 'Villagomez', 'email': 'phillip.villagomez@enron.com', 'numEmailsSent': 1, 'mostContacted': []}, {'firstName': 'Phillip', 'lastName': 'Randle', 'email': 'phillip.randle@enron.com', 'numEmailsSent': 2, 'mostContacted': ['Tana Jones: tana.jones@enron.com', 'Walter Guidroz: walter.guidroz@enron.com']}]`

 <br />

OR

`Status : 200 OK`
<br />

`([], ValueError('Employee does not exist!',))`

<br />

### Code sample

  ```python
    user = {"searchterm": searchterm, "firstdate": firstdate, "lastdate": lastdate}

    r = requests.get(
        url =  "http://127.0.0.1:14000/api/enron/users",
        params = user
        )
  ```

  <br />
