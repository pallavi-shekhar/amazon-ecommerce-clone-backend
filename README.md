# Amazon Ecommerce Clone Backend
Amazon Ecommerce Clone Backend using Node.js, Express.js, MongoDB, Typescript with architecture layers - Router, Controller and Model

<p align="center">
    <img alt="Amazon Ecommerce Clone Backend" src="https://raw.githubusercontent.com/pallavi-shekhar/amazon-ecommerce-clone-backend/main/assets/amazon-e-commerce-clone-backend.png" />
</p>

## Why this project?
I am Pallavi, and I have created this project for my learning purpose. I aimed to learn and make a highly modular backend project with a scalable architecture. So, I decided to build this Amazon Ecommerce Clone Backend. I took the AfterAcademy project as a reference to create this project.

## Highlights of the project
* Node.js
* Express
* MongoDB
* Mongoose
* Typescript
* Async/await for the promises
* Architecture Layers: Router, Controller and Model
* Error handling
* JWT Authentication
* Docker

## Architecture Layers: Router, Controller and Model
<p align="center">
    <img alt="Architecture Layer" src="https://raw.githubusercontent.com/pallavi-shekhar/amazon-ecommerce-clone-backend/main/assets/architecture-layer.png" />
</p>

## Amazon Ecommerce Clone Backend Features
* Login/SignUp using email and password
* Add address of User for Delivery
* Add Product and Product categories 
* Add Product to Cart and Place order
* Role Based Authorization. Ex - Admin can add product categories. Seller can add products and approve role update for others like adding the role Seller or ADMIN 
* Admin can approve for role update. Ex - ADMIN can update roles for others like adding the role Seller or ADMIN 

## Public API Flow of Amazon Ecommerce Clone Backend
<p align="center">
     <img alt="Public Api Flow" src="https://raw.githubusercontent.com/pallavi-shekhar/amazon-ecommerce-clone-backend/main/assets/public-api-flow.png" />
</p>

## Private API Flow of Amazon Ecommerce Clone Backend
<p align="center">
     <img alt="Private Api Flow" src="https://raw.githubusercontent.com/pallavi-shekhar/amazon-ecommerce-clone-backend/main/assets/private-authorized-api-flow.png" />
</p>

## API documentation of Amazon Ecommerce Clone Backend
<a href="https://documenter.getpostman.com/view/6307230/Uz5NjDBW" target="_blank">
    <img alt="button-view-api-docs" src="https://raw.githubusercontent.com/pallavi-shekhar/amazon-ecommerce-clone-backend/main/assets/button-view-api-docs.png" width="200" height="60"/>
</a>

## Packages used in this project
* Express: It is a Node.js web application framework that provides a robust set of features to develop web and mobile appliactions. It also allows to setup middlewares to respond to HTTP requests.
* JWT: JSON Web Token is an open standard used to securely transfer information between two parties - client and server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that claims cannot be altered after the token is issued.
* JOI: Joi is an object schema description language and validator for JavaScript objects. Joi allows you to create blueprints or schemas for JavaScript objects to ensure validation of key information. It also allows you to create your validations with a simple and clear object syntax.
* Many more packages

## How to build and run this project

 * Build and run Amazon E-Commerece Clone Backend without Docker
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Install MongoDB on your local.
    * Install node.js and npm on your local machine.
    * From the root of the project execute in terminal `npm install`.
    * *Use the latest version of node on the local machine if the build fails*.
    * Create users in MongoDB and seed the data taking reference from the **/init-mongo.js**
    * Change the `DB_HOST` to `localhost` in **.env** and **tests/.env.test** files.
    * Execute `npm start` and you will be able to access the API from http://localhost:3000
    * To run the tests execute `npm test`.


* Build and run Amazon Ecommerce Clone Backend using Docker Compose 
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up -d` in terminal from the repo directory.
    * You will be able to access the api from http://localhost:3000
    * *If having any issue* then make sure 3000 port is not occupied else provide a different port in **.env** file.
    * *If having any issue* then make sure 27017 port is not occupied else provide a different port in **.env** file.
    * Run The Tests
      * Install node.js and npm on your local machine.
      * From the root of the project execute in terminal `npm install`.
      * *Use the latest version of node on the local machine if the build fails*.
      * To run the tests execute `npm test`.

  
## This backend project has following folders:
* core: This conatains the classes which is shared across the project like ApiError.ts, ApiResponse.ts.
* database: This contains the models and repositories classes which interact with mongo database.
* middlewares: This consists of middlewares used. Ex - authentication.ts is used for authenticating each private request.
* routes: This consists of various routes of the project. Ex - login.ts, signup.ts.
* controllers: This consists of various controllers, corresponding to routes. Ex - login.controller.ts, tweet.controller.ts.

 ```
.
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── init-mongo.js
├── keys
│   ├── private.pem
│   └── public.pem
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config.ts
│   ├── controllers
│   │   ├── access
│   │   │   ├── login.controller.ts
│   │   │   ├── signup.controller.ts
│   │   │   └── token.controller.ts
│   │   ├── address
│   │   │   └── address.controller.ts
│   │   ├── aggregate-order
│   │   │   └── aggregate-order.controller.ts
│   │   ├── cart
│   │   │   └── cart.controller.ts
│   │   ├── category
│   │   │   └── category.controller.ts
│   │   ├── order
│   │   │   └── order.controller.ts
│   │   ├── product
│   │   │   └── product.controller.ts
│   │   └── role-request
│   │       └── role-request.controller.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── JWT.ts
│   │   └── authUtils.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── model
│   │   │   ├── Address.ts
│   │   │   ├── AggregateOrder.ts
│   │   │   ├── ApiKey.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Category.ts
│   │   │   ├── Order.ts
│   │   │   ├── Product.ts
│   │   │   ├── ProductMedia.ts
│   │   │   ├── RequestRole.ts
│   │   │   ├── Role.ts
│   │   │   └── User.ts
│   │   └── repository
│   │       ├── AddressRepo.ts
│   │       ├── AgrregateOrderRepo.ts
│   │       ├── ApiKeyRepo.ts
│   │       ├── CartRepo.ts
│   │       ├── CategoryRepo.ts
│   │       ├── OrderRepo.ts
│   │       ├── ProductMediaRepo.ts
│   │       ├── ProductRepo.ts
│   │       ├── RequestRoleRepo.ts
│   │       ├── RoleRepo.ts
│   │       └── UserRepo.ts
│   ├── middlewares
│   │   ├── apiKey.ts
│   │   ├── asyncHandler.ts
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   ├── role.ts
│   │   ├── schema.ts
│   │   └── validator.ts
│   ├── routes
│   │   └── v1
│   │       ├── access
│   │       │   ├── login.ts
│   │       │   ├── schema.ts
│   │       │   ├── signup.ts
│   │       │   └── token.ts
│   │       ├── address
│   │       │   ├── address.ts
│   │       │   └── schema.ts
│   │       ├── aggregate-order
│   │       │   ├── aggregate-order.ts
│   │       │   └── schema.ts
│   │       ├── cart
│   │       │   ├── cart.ts
│   │       │   └── schema.ts
│   │       ├── category
│   │       │   ├── category.ts
│   │       │   └── schema.ts
│   │       ├── index.ts
│   │       ├── order
│   │       │   ├── order.ts
│   │       │   └── schema.ts
│   │       ├── product
│   │       │   ├── product.ts
│   │       │   └── schema.ts
│   │       └── role-request
│   │           ├── role-request.ts
│   │           └── schema.ts
│   ├── server.ts
│   └── types
│       └── app-request.d.ts
└── tsconfig.json
 ```
 
 ## API Call Code Flow

 * Signup
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/signup.ts → schema.ts → /middlewares/validator.ts → /controllers/aceess/signup.controller.ts → asyncHandler.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /core/ApiResponses.ts`
 * Login
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/login.ts → schema.ts → /middlewares/validator.ts → /controllers/aceess/login.controller.ts → asyncHandler.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /core/ApiResponses.ts`
  * Cart
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/cart.ts → /middlewares/authentication.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /core/authUtils.ts → /core/JWT.ts → /core/authUtils.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /controllers/cart/cart.controller.ts → asyncHandler.ts → database/repository/CartRepo.ts → /database/model/Cart.ts  → database/repository/OrderRepo.ts → /database/model/Order.ts  → /core/ApiResponses.ts`
  * Products
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/product.ts → /middlewares/authentication.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /core/authUtils.ts → /core/JWT.ts → /core/authUtils.ts → /database/repository/UserRepo.ts → /database/model/User.ts → schema.ts → /middlewares/validator.ts → /controllers/product/product.controller.ts → asyncHandler.ts → database/repository/ProductRepo.ts → /database/model/Product.ts  → /core/ApiResponses.ts`
 
 ## API request and response
* Signup
    * Method and Headers
    ```
    POST /v1/signup/basic HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name": "Test Admin",
        "email":"test_admin@gmail.com",
        "password":"123456789",
        "dateOfBirth": "2017-06-10"
    }
    ```
    * Response Body: 200
    ```json
    {
        "statusCode": "10000",
        "message": "Signup Successful",
        "data": {
            "user": {
                "_id": "62a4de4d82247f653afa4333",
                "name": "Test",
                "email": "test@gmail.com",
                "roles": [
                    "62a162bd9ff56b2825792804"
                ],
                "address": []
            },
            "tokens": {
                "accessToken": "<access_token>",
                "refreshToken": "<refresh_token>"
                }
            }
    }
    ```
* Get Order
    * Method and Headers
    ```
    POST /v1/aggregate-order/id/62a4e78082247f653afa43ad HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    Authorization: Bearer <access_token> 
    ```
    * Response Body: 200
    ```json
    {
        "statusCode": "10000",
        "message": "Order for a user retrieved successfully",
        "data": [
            {
                "_id": "62a4e78082247f653afa43ad",
                "orders": [
                    {
                        "_id": "62a4e78082247f653afa43aa",
                        "user": "62a4de4d82247f653afa4333",
                        "orderedPrice": 900,
                        "productPrice": 1000,
                        "product": "62a1beb79114261b5cf1f174"
                    },
                    {
                        "_id": "62a4e78082247f653afa43ab",
                        "user": "62a4de4d82247f653afa4333",
                        "orderedPrice": 1600,
                        "productPrice": 2000,
                        "product": "62a1bdf79114261b5cf1f169"
                    }
                ],
                "user": "62a4de4d82247f653afa4333"
            }
        ]
    }
    ```

### License

```
   Copyright (C) 2022 Pallavi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```