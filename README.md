# Grocery API

### Route: POST /register
Description: To create a new user accoumnt

#### Payload
```
    {
        "email": "<string>",
        "password": "<string>"
    }
```

#### Response
```
    {
        "status": 201,
        "message": "Registration Successful",
        "data": {
            user_id: "<user-id>"
        }
    }
```
#### SQL Code
```
    INSERT INTO tbl_users (email, password) 
    VALUES ('<EMAIL>', '<PASSWORD>')
```

### Route: POST /login
Description: To authenticate user

#### Payload
```
    {
        "email": "<string>",
        "password": "<string>"
    }
```

#### Response
```
    {
        "status": 200,
        "message": "Login Successful",
        "data": {
            "user_id": "<user-id>",
            "token": "<token>"
        }
    }
```

#### SQL Code
```
    SELECT INTO tbl_users
    WHERE email = "<email>"
    AND password = "<password>"
```

### Route: GET /groceries

Description: To retrieve all the groceries associated with a specific user

#### Response
```
    {
        "status": 200,
        "message": "",
        "data": [
            {
                "title": "<grocery-title>",
                "created_at: "<date-created>"
            },
            ...
        ]
    }
```
#### SQL Code
```
    SELECT title, created_at FROM tbl_groceries
    WHERE user_id = '<user-id>'
```

### Route: DELETE /groceries/:id

Description: Delete a specific grocery item from the database. The id is passed in as a parameter to identify which item should be deleted.

#### Payload
```
    {
        "grocery_id": "<id>"
    }
```

#### Response
```
    {
        "status": 200,
        "message": "Deletion successful",
        "data": null
    }
```

#### SQL Code
```
    DELETE FROM tbl_groceries WHERE grocery_id = <id>
```
