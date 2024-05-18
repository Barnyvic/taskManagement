# Task Management API

Welcome to the Task Management API documentation. This API allows users to manage tasks efficiently. Below are the details for setting up and using the API.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Auth Endpoints](#auth-endpoints)
    - [Login User](#login-user)
    - [Sign Up User](#sign-up-user)
  - [User Endpoints](#user-endpoints)
    - [Update User](#update-user)
  - [Task Endpoints](#task-endpoints)
    - [Create Task](#create-task)
    - [Get All Tasks](#get-all-tasks)
    - [Get A Task](#get-a-task)
    - [Update Task](#update-task)
    - [Delete Task](#delete-task)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hinata-Akiro/taskManagement
   cd taskManagement
   run yarn on your terminal to install the dependencies

### Environment configuration

  ```plaintext
  DATABASE_UR 
  JWT_SECRET
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   yarn run start:dev - to start  the application
    ```
2. **The API will be available at:**
    ```bash
    [localhost](http://localhost:3000)
    [localhost](http://localhost:3000/api/v1)
    ```
3. **Swagger Doc:**
   ```bash
     http://localhost:3000/api/docs
   ```


## API Endpoints

### Auth Endpoints

### Sign Up User

**Endpoint:** `/auth/signup`

**Method:** `POST`

**Description:** create a new user.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

**Responses:**

```plaintext
200: User created successfully.
400: Email already in use.
```
```json
{
  "error": false,
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
     "_id": "66488c9c39f6cfb3fecf4c1f",
    "firstName": "Victor",
    "lastName": "Barny",
    "email": "john.doe@example.com",
    "password": "$2b$10$EPnFSJL4c3pnlFoECMA01ONMJKWrR7htwscZU7iQi8kas20/udqTu",
    "createdAt": "2024-05-18T11:10:20.929Z",
    "updatedAt": "2024-05-18T11:24:17.431Z",
    "__v": 0,
    "id": "66488c9c39f6cfb3fecf4c1f"
  }
}
```

### Login User

**Endpoint:** `/auth/login`

**Method:** `POST`

**Description:** Log in a user.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Responses:**

```plaintext
200: Login successful.
400: User not found pls signup.
400: Invalid password...
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDg4YzljMzlmNmNmYjNmZWNmNGMxZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTYwMzA5NzYsImV4cCI6MTcxODYyMjk3Nn0.1fsXI8op9CYGaGhnIkZEvnGcgGO5m2eLaXokicbWCPw",
    "fullName": "Doe Victor"
  }
}
```

### User Endpoints

### Update User

**Endpoint:** `/users/update-user`

**Method:** `PUT`

**Description:** update a user.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

**Responses:**

```plaintext
200: User updated successfully..
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "User updated successfully.",
  "data": {
     "_id": "66488c9c39f6cfb3fecf4c1f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "$2b$10$EPnFSJL4c3pnlFoECMA01ONMJKWrR7htwscZU7iQi8kas20/udqTu",
    "createdAt": "2024-05-18T11:10:20.929Z",
    "updatedAt": "2024-05-18T11:24:17.431Z",
    "__v": 0,
    "id": "66488c9c39f6cfb3fecf4c1f"
  }
}
```
## Task Endpoints

### Description
  ```plaintext
  This API provides WebSocket and RestAPI endpoints for managing tasks. Users can create task using WebSocket, update, delete, and retrieve tasks using RestApi and WebSocket. Each task is associated with a user.
  ```
- **Connection**: Establish a connection to the WebSocket server.
- **Disconnection**: Disconnect from the WebSocket server.

**The API will be available at:**
    ```bash
    [localhost](http://localhost:3000)
    ```


### Task Events Sent to the WebSocket server

- `createTask`: Create a new task.

### Task Events Emitted by WebSocket Server
- `taskCreated`: listen for Created task event.
- `error`: listen to error events


## Event Details

### Create Task

- **Description**: Creates a new task.
- **Payload**:
  ```json
  {
    "userId": "60c72b2f4f1a2c1a1c8d5e8b",
    "createTaskData": {
      "title": "Finish report",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-05-31"
    }
  }
  ```
- **Response**:
   ```json
  {
   "error": false,
    "statusCode": 201,
    "message": "Task created successfully.",
    "data": {
        "title": "started report",
        "description": "Complete the annual report by Friday",
        "status": "pending",
        "priority": "medium",
        "dueDate": "2024-05-31T00:00:00.000Z",
        "user": "60c72b2f4f1a2c1a1c8d5e8b",
        "_id": "6648c7ded387259ecc9914ed",
        "createdAt": "2024-05-18T15:23:10.960Z",
        "updatedAt": "2024-05-18T15:23:10.960Z",
        "__v": 0
    },
  }
  ```


### Get All Tasks

**Endpoint:** `/tasks`

**Method:** `Get`

**Description:** Get all tasks

**Request Query:**

```json

  "skip": "1",
  "limit": "10",
  "sort": "asc",
  "status": "pending"

```

**Responses:**

```plaintext
200: Tasks retrieved successfully.
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "Tasks retrieved successfully.",
  "data": [
    {
      "_id": "6648bde2558b1fcf62d9d6df",
      "title": "Finish report",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T14:40:34.215Z",
      "updatedAt": "2024-05-18T14:40:34.215Z",
      "__v": 0
    },
    {
      "_id": "6648c6027f8db350dafcb4ba",
      "title": "started report",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T15:15:14.130Z",
      "updatedAt": "2024-05-18T15:15:14.130Z",
      "__v": 0
    },
    {
      "_id": "6648c7ded387259ecc9914ed",
      "title": "started report",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T15:23:10.960Z",
      "updatedAt": "2024-05-18T15:23:10.960Z",
      "__v": 0
    }
  ]
}
```

### Get A Task

**Endpoint:** `/tasks/:id`

**Method:** `Get`

**Description:** Get a task by id

**Request Param:**

```json

  "id": "6648bde2558b1fcf62d9d6df"

```

**Responses:**

```plaintext
200: Tasks retrieved successfully.
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "Tasks retrieved successfully.",
  "data": {
      {
      "_id": "6648bde2558b1fcf62d9d6df",
      "title": "Finish report",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T14:40:34.215Z",
      "updatedAt": "2024-05-18T14:40:34.215Z",
      "__v": 0
    },
  }
}
```
  

### Update Task

**Endpoint:** `/tasks/:id`

**Method:** `UPDATE`

**Description:** Update a task by id

**Request Body:**

```json
{
 "title": "Finish",
  "description": "Complete",
  "priority": "low",

}

```

**Request Param:**

```json

  "id": "6648bde2558b1fcf62d9d6df"

```

**Responses:**

```plaintext
200: Tasks retrieved successfully.
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "Tasks retrieved successfully.",
  "data": {
      {
      "_id": "6648bde2558b1fcf62d9d6df",
      "title": "Finish",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "low",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T14:40:34.215Z",
      "updatedAt": "2024-05-18T14:40:34.215Z",
      "__v": 0
    },
  }
}
```
  


### Delete Task

**Endpoint:** `/tasks/:id`

**Method:** `Delete`

**Description:** delete a task by id


**Request Param:**

```json

  "id": "6648bde2558b1fcf62d9d6df"

```

**Responses:**

```plaintext
200: Tasks deleted successfully.
```
```json
{
  "error": false,
  "statusCode": 200,
  "message": "Tasks  deleted successfully.",
  "data": {
      {
      "_id": "6648bde2558b1fcf62d9d6df",
      "title": "Finish",
      "description": "Complete the annual report by Friday",
      "status": "pending",
      "priority": "low",
      "dueDate": "2024-05-31T00:00:00.000Z",
      "user": "60c72b2f4f1a2c1a1c8d5e8b",
      "createdAt": "2024-05-18T14:40:34.215Z",
      "updatedAt": "2024-05-18T14:40:34.215Z",
      "__v": 0
    },
  }
}
```


## Contributing

```plaintext
BARNY VICTOR
```