# Backend README

## Overview
This is the backend service for the UberClone application. It handles user management, authentication, and other backend functionalities.

## Project Structure
- `user.model.ts`: Defines the User model and schema.
- `user.routes.ts`: Contains the routes for user-related operations.
- `user.service.ts`: Implements the business logic for user operations.
- `user.controller.ts`: Handles the HTTP requests and responses for user operations.

## API Documentation

### User API

#### Create User
- **Endpoint**: `POST /users`
- **Description**: Creates a new user.
- **Request Payload**:
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
    - **Response**:
        - **Status Code**: `201 Created`
        - **Body**:
            ```json
            {
                "id": "user_id",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
            ```
    - **400 Bad Request**
        ```json
        {
          "success": false,
          "errors": [
            {
              "field": "email",
              "message": "Please provide a valid email"
            }
          ]
        }
        ```

    - **500 Internal Server Error**
        ```json
        {
          "error": "Error registering user"
        }
        ```

    - **11000 Duplicate Key Error**
        ```json
        {
          "error": "User already exists"
        }
        ```

## Setup
1. Clone the repository.
2. Install dependencies:
     ```sh
     npm install
     ```
3. Start the server:
     ```sh
     npm start
     ```

## License
This project is licensed under the MIT License.