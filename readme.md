# Basic Express

Authentication Project:

- Express
- Joi
- Fs
- Sequelize
- dotenv
- multer
- nodemailer

---

## URL

_Server_

```
http://localhost:3000/api
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful endpoints

### POST /register

> Create user

_Request Header_

```
not needed
```

_Request Body_

```
{
        "fullName":"<name>",
        "phoneNumber": "<phoneNumber>",
        "email": "<email>",
        "password": "<password>"
}
```

_Response (201)_

```
{
    "data": {
        <data_spesific>
    },
    "message": "User Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"fullName\" is not allowed to be empty"
}
```

_Response (400 - Email already exist)_

```
{
    "message": "User with email <email> already exist..."
}
```

---

### POST /login

> Login API

_Request Header_

```
not needed
```

_Request Body_

```
{
        "email": "<email>",
        "password": "<password>"
}
```

_Response (200)_

```
{
    "data": <token>,
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (400 - Incorrect Password)_

```
{
    "message": "Incorrect Password"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

---

### POST /forgot-password

> Forgot Password API

_Request Header_

```
not needed
```

_Request Body_

```
{
        "email": "<email>",
}
```

_Response (200)_

```
{
    "data": <token>,
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

---

### POST /reset-password/:id

> Reset Password API

_Request Params_

```
<token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "newPassword": "<newPassword>",
        "confirmPassword": "<confirmPassword>",
}
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"newPassword\" is not allowed to be empty"
}
```

---

### GET /brand

> Get all brands include phones

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /brand/:id

> Get brand by ID include phones

_Request Authorization_

```
<bearer_token>
```

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": {<data_spesific>}

    "status": "Success"

}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Brand Not Found..."
}
```

---

### POST /brand/create

> Create Brand

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>"
}
```

_Response (201)_

```
{
    "data": {<data_specific>},
    "message": "Brand Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (400 - Name Already Exist)_

```
{
    "message": "Brand with name <name> already exist..."
}
```

---

### PUT /brand/:id

> Edit Brand

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
    "name": "<name>",
}
```

_Response (200)_

```
{
    "message": "Brand Updated..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Brand Not Found"
}
```

---

### DELETE /brand/:id

> Delete Brand by id

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Brand have been deleted"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Brand Not Found"
}
```

---

### GET /phone

> Get all phone

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### GET /phone/:id

> Get specific phone

_Request Authorization_

```
<bearer_token>
```

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": {<data_spesific>}

    "status": "Success"

}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Phone Not Found..."
}
```

---

### GET /phone/brand/:id

> Get phone group with brand id

_Request Authorization_

```
<bearer_token>
```

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>]

    "status": "Success"

}
```

_Response (404 - Data Not Found)_

```
{
    "message": "Brand Not Found..."
}
```

---

### POST /phone/create

> Create phone

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>",
        "brandID": <brandID>,
        "spesification": "<spesification>",
        "image": <upload_image>,
        "price": <price>,
        "quantity": <quantity>,
}
```

_Response (201)_

```
{
    "data": {<data_specific>},
    "message": "Phone Created..."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (400 - Name Already Exist)_

```
{
    "message": "Phone with name <name> already exist..."
}
```

---

### PUT /phone/:id

> Edit Phone

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "name": "<name>",
        "brandID": <brandID>,
        "spesification": "<spesification>",
        "image": <upload_image>,
        "price": <price>,
        "quantity": <quantity>,
}
```

_Response (200)_

```
{
    "message": "Phone updated successfully."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Phone with ID <id> not found."
}
```

---

### DELETE /phone/:id

> Delete Phone by id

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Phone have been deleted"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Phone Not Found"
}
```

---

### GET /transaction

> Get transaction group by id user token

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [<data_spesific>],

    "status": "Success"

}
```

---

### POST /transaction/create

> Create transaction

_Request Authorization_

```
<bearer_token>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
        "phoneIDs": <phoneIDs>,
        "qtys": <qtys>,
}
```

_Response (201)_

```
{
    "message": "Transaction created successfully."
}
```

_Response (400 - Validation Failed)_

```
{
    "message": "\"phoneIDs\" is not allowed to be empty"
}
```

_Response (400 - Some phone don't have qty to make transaction)_

```
{
    "message": "Phone IDs and quantities must have the same number of elements.."
}
```

_Response (404 - Phone id not found)_

```
{
    "message": "Phone not found..."
}
```

_Response (404 - Phone don't have any quantity)_

```
{
    "message": "<phone_name> sold out..."
}
```

---
