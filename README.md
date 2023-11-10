# Grocery API

### Endpoint: POST /auth/register
Description: To create a new user account

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
---

### Endpoint: POST /auth/login
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
            "token": "<access-token>"
        }
    }
```

#### SQL Code
```
    SELECT user_id FROM tbl_users
    WHERE email = "<email>"
    AND password = "<password>"
```
---

### Endpoint: GET /groceries

Description: To retrieve all the groceries associated with a specific user

#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Response
```
    {
        "status": 200,
        "message": "OK",
        "data": [
            {
                "grocery_id": "<grocery-id>",
                "title": "<grocery-title>",
                "description": "<grocery-descrition",
                "created_at: "<date-created>"
            },
            {
                "grocery_id": "<grocery-id>",
                "title": "<grocery-title>",
                "description": "<grocery-descrition",
                "created_at: "<date-created>"
            },
            ...
        ]
    }
```

#### SQL Code
```
    SELECT title, description, created_at FROM tbl_groceries
    WHERE user_id = '<user-id>'
```
---
### Endpoint: POST /groceries
Description: To create new grocery.


#### Payload
```
{
    "title": "<string>",
    "description": "<string>"
}
```
#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Response
```
{
    "status": 201,
    "message": "created",
    data: {
        grocery_id: "<grocery-id>"
    }
}
```

#### SQL Code
```
INSERT INTO tbl_groceries (title, description, user_id)
VALUES ("<grocery-title>", "<grocery-description>", "<user-id>")
```
---
### Endpoint: GET /groceries/:grocery_id

Description: Get a specific grocery from the database.

#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Params
- grocery_id
    - Data type: string
    - Description: to identify which grocery should be retrieved.

#### Response
```
    {
        "status": 200,
        "message": "OK",
        "data": {
                "grocery_id": "<grocery-id>",
                "title": "<grocery-title>",
                "description": "<grocery-descrition",
                "created_at: "<date-created>"
            }

    }

```
#### SQL Code
```
SELECT grocery_id, title, description, created_at FROM tbl_groceries 
WHERE grocery_id = <grocery_id>;
```
---


### Endpoint: PATCH /groceries/:grocery_id

Description: Update a specific grocery from the database.

#### Payload
```
{
    "title": "<grocery-title>",
    "description": "<grocery-description>"
}
```

#### Params
- grocery_id
    - Data type: string
    - Description: to identify which item should be updated.


#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Response
```
{
    "status": 200,
    "message": "Update successful",
    "data": {
        "grocery_id": "<id>"
    }
}
```

#### SQL Code
```
UPDATE tbl_groceries 
SET title = "<new-title>", description = "<new-description>"
WHERE grocery_id = "<grocery_id>"
```
---

### Endpoint: DELETE /groceries/:grocery_id

Description: Delete a specific grocery item from the database. 
The id is passed in as a parameter to identify which item should be deleted.

> **Note**: Deleting a grocery will delete all its items

#### Headers
```
Authorization: Bearer <your-access-token>
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
___

### Endpoint: GET /groceries/:grocery_id/items
Description: Retrieves only the items from a specific grocery from the database.

#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Params
- grocery_id
    - Data type: string
    - Description: To identify which grocery items should be retrieved.

#### Response
```
    {
        "status": 200,
        "message": "",
        "data": [
            {
                "item_id": "<item-id>",
                "name": "<item-name>",
                "qty": <item-quantity>,
                "price": <item-price>,
                "created_at": <date-when-item-created>
            },
            {
                "item_id": "<item-id>",
                "name": "<item-name>",
                "qty": <item-quantity>,
                "price": <item-price>,
                "created_at": <date-when-item-created>
            },
            ...
        ]
    }

```

#### SQL Code
```
SELECT item_id, name, qty, price, created_at FROM tbl_grocery_item
WHERE grocery_id = <grocery_id>;
```
---
### Endpoint: GET /groceries/:grocery_id/items/:item_id

Description: To retrieve a specific grocery item from the database.

#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Params
- grocery_id
    - Data type: string
    - Description: To identify which grocery we get the item from.
- item_id
    - Data type: string
    - Description: To identify which item should be retrieved

#### Response
```
{
    "status": 200,
    "message": "",
    "data": {
        "item_id": "<item-id>",
        "name": "<item-name>",
        "qty": <item-quantity>,
        "price": <item-price>,
        "created_at": <date-when-item-created>
    },
}
```

#### SQL Code
```
SELECT item_id, name, qty, price, created_at FROM tbl_grocery_items
WHERE grocery_id = "<grocery_id>" AND item_id = "<item_id>"
```

---
### Endpoint: POST /groceries/:grocery_id/items

Description: To create new grocery item. The grocery_id is passed in as a parameter to identify which grocery should the item be inserted.

#### Payload
```
{
    "name": "<item-name>",
    "qty": "<item-quantity>",
    "price": "<item-price>"
}
```


#### Headers
```
Authorization: Bearer <your-access-token>
```
#### Params
- grocery_id
    - Data type: string
    - Description: to identify which grocery should the item be inserted.


#### Response
```
{
   "status": 201,
    "message": "created",
    "data": {
        item_id: "<item-id>"
    } 
}
```

#### SQL Code
```
INSERT INTO tbl_grocery_items (name, qty, price, grocery_id)
VALUES ("<item-name>", "<item-quantity>", "<item-price>", "<grocery_id>")
```
---


### Endpoint: PATCH /groceries/:grocery_id/items/:item_id
Description: Updates a specific grocery item from the database.

#### Payload
```
{
    "name": "<item-name>",
    "qty": "<item-quantity>",
    "price": "<item-price>"
}
```

#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Params
- grocery_id
    - Data type: string
    - Description: To identify where the grocery item is from
- item_id
    - Data type: string
    - Description: To identify which grocery item should be updated


#### Response
```
{
   "status": 200,
    "message": "",
    "data": {
        item_id: "<item-id>"
    } 
}
```

#### SQL Code
```
UPDATE tbl_grocery_items 
SET name = "<item-name>", qty = "<item-quantity>", price = "<item-price>"
WHERE grocery_id = "<grocery_id>" AND item_id = "<item_id>"
```

---
### Endpoint: DELETE /groceries/:grocery_id/items/:item_id

Description: Deletes a specific grocery item from the database. The item_id is passed in as a parameter to identify which item should be deleted.


#### Headers
```
Authorization: Bearer <your-access-token>
```

#### Params
- grocery_id
    - Data type: string
    - Description: To identify where the grocery item is from
- item_id
    - Data type: string
    - Description: To identify which grocery item should be deleted


#### Response
```
{
    "status": 200,
    "message": "Deleted",
    "data": null
}
```

#### SQL Code
```
DELETE tbl_grocery_items 
WHERE grocery_id = "<grocery_id>" 
AND item_id = "<item_id>"
```