# E-Commerce (Express + Typescript Production ready with authentication and authorization) API Documentation

Welcome to the E-Commerce API! This API allows you to perform operations related to authentication, users, products, and orders. Below you will find a comprehensive guide to using the available endpoints.

## Authentication

- **Register**
  - **POST** `/auth/register`
  - Registers a new user.
- **Login**
  - **POST** `/auth/login`
  - Authenticates a user.

## Users

- **Get All Users**
  - **GET** `/users`
  - Requires authentication.
  - Retrieves a list of users.
- **Get User by ID**
  - **GET** `/users/:id`
  - Requires authentication and ownership.
  - Retrieves a specific user by ID.
- **Create User**
  - **POST** `/users`
  - Creates a new user.
- **Update User**
  - **PUT** `/users/:id`
  - Requires authentication and admin or ownership.
  - Updates user details.
- **Delete User**
  - **DELETE** `/users/:id`
  - Requires authentication and admin or ownership.
  - Deletes a user.

## Products

- **Get All Products**
  - **GET** `/products`
  - Requires authentication.
  - Retrieves a list of products.
- **Get Product by ID**
  - **GET** `/products/:id`
  - Requires authentication.
  - Retrieves a specific product by ID.
- **Create Product**
  - **POST** `/products`
  - Requires authentication and admin rights.
  - Creates a new product.
- **Update Product**
  - **PUT** `/products/:id`
  - Requires authentication and admin rights.
  - Updates product details.
- **Delete Product**
  - **DELETE** `/products/:id`
  - Requires authentication and admin rights.
  - Deletes a product.

## Orders

- **Get All Orders**
  - **GET** `/orders`
  - Requires authentication.
  - Retrieves a list of orders.
- **Get Order by ID**
  - **GET** `/orders/:id`
  - Requires authentication.
  - Retrieves a specific order by ID.
- **Create Order**
  - **POST** `/orders`
  - Requires authentication.
  - Creates a new order and updates product quantity.
- **Delete Order**
  - **DELETE** `/orders/:id`
  - Requires authentication and admin rights.
  - Deletes an order and updates product quantity.

Please ensure you are authorized to perform operations, especially for actions that require admin rights or ownership.






The provided code defines several middleware functions for an Express.js application, primarily for authentication and authorization purposes, as well as for managing product quantities in an e-commerce context. Here's a breakdown of each middleware function:

1. `isAdminOrOwner`: Checks if the current user is either the owner of the resource (based on ID comparison) or an admin. If the user is not the owner, it delegates to the `isAdmin` middleware to check for admin rights.

2. `isAdmin`: Verifies if the current user has admin privileges by comparing the user's email with an admin email stored in the environment variables. If the user is not an admin, it responds with an error.

3. `isOwner`: Similar to `isAdminOrOwner`, but strictly checks if the current user is the owner of the resource without delegating to `isAdmin`. It responds with an error if the user is not the owner.

4. `isAuthenticated`: Checks if the user is authenticated by looking for a session token in the cookies, retrieving the user associated with the session token, and attaching the user's information to the request object. It responds with an error if authentication fails.

5. `updateDiffProductQty`: Intended to be used when an order is placed. It decreases the quantity of each product in the order. It iterates over the products in the request body, finds each product in the database, decreases its quantity by the amount specified in the order, and saves the updated product document.

6. `updateAddProductQty`: The inverse of `updateDiffProductQty`. It's likely intended to be used when an order is canceled or returned. It increases the quantity of each product in the order by the specified amount and saves the updated product document.

Each middleware function uses try-catch blocks to handle exceptions and responds with appropriate HTTP status codes and error messages in case of failure. The `isAdmin`, `isOwner`, and `isAuthenticated` middlewares are crucial for securing the application by ensuring that only authorized users can access or modify resources.