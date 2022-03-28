
# Storefront API

A backend API for an online store to present the store's products and make it available online for purchase. Clients can register without charges, choose the products they like, add them into a cart, and make orders. 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

POSTGRES_HOST=localhost  
POSTGRES_USERNAME=storefront_app  
POSTGRES_PASSWORD=Idontkn0w!  
POSTGRES_DB=storefront_db  
POSTGRES_DB_TEST=storefront_db_test  
ENV=dev  
HOST=127.0.0.1  
PORT=3000  
SALT=forgive  
SALT_ROUNDS=10  
JWT_SECRET=whynot?!  

## Database Connection

#### PostgreSQL database engine configured to run on port 5432.

#### Connect to the database as ***postgres***, and run the following commands to create and configure the required databases for development and tests.

##### Create database for the API project development

```sql
  CREATE DATABASE storefront_db;
```

##### Create database for the API project tests

```sql
  CREATE DATABASE storefront_db_test;
```

##### Create database User and grants it the required privileges

```sql
  CREATE USER storefront_app WITH PASSWORD 'Idontkn0w!';
  GRANT ALL PRIVILEGES ON DATABASE storefront_db TO storefront_app;
  GRANT ALL PRIVILEGES ON DATABASE storefront_db_TEST TO storefront_app;
```
## Installation

Install nd0067-c2 with npm

```bash
  git clone https://github.com/emadunan/nd0067-c2.git
```

Go to the project directory

```bash
  cd nd0067-c2
```

Install dependencies

```bash
  npm install
```

Run database migration for dev environment

```bash
  npm run migrate:up
```

Run lints

```bash
  npm run lint:f
```

##### Create a .env file in the project root directory, copy the Environment variables mentioned in the previous section and past them in the .env file.

Build the project

```bash
  npm run build
```

Run automated tests

```bash
  npm run test
```

Start the server

```bash
  npm run start
```


## API Reference

#### Create new user

```http
  POST /users
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `firstname` | `string` | Firstname of user to create, from the request body, **Required** |
| `lastname`  | `string` | Lastname of user to create, from the request body, **Required** |
| `password`  | `string` | Password of user to create, from the request body, **Required** |

###### Body payload (ex):
```JSON
{
    "firstname": "emad",
    "lastname": "younan",
    "password": "passw0rd"
}
```
***

#### Authenticate user

```http
  POST /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | Id of user to authenticate, from the request params, **Required**|
| `password`| `string` | Password of user to authenticate, from the request body, **Required**|

###### Body payload (ex):
```JSON
{
    "password": "passw0rd"
}
```
***

#### Get user

```http
  GET /users/${id} [token required]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | Id of user to fetch, from the request params, **Required** |

***

#### Get all users

```http
  GET /users [token required]
```
***

#### Create a new product

```http
  POST /products [token required]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | Name of product to create, from the request body, **Required** |
| `price`   | `number` | Price of product to create, from the request body, **Required** |


###### Body payload (ex):
```JSON
{
    "name": "book",
    "price": 12
}
```
***

#### Get product

```http
  GET /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | Id of product to fetch, from the request params, **Required** |

***

#### Get all products

```http
  GET /products [token required]
```
***

#### Create a new order for user

```http
  POST /users/${userId}/orders [token required]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | Id of a user to make an order, from the request params, **Required** |
| `products`| `array of products` | An array of products to include in an order, from the request body, **Required** |

###### Body payload (ex):
```JSON
{
    "products": [
        {
            "productId": 1,
            "quantity": 12
        },
        {
            "productId": 2,
            "quantity": 3
        }
    ]
}
```
***

#### Get all orders for a user

```http
  GET /users/${userId}/orders/${status} [token required]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `number` | Id of a user to make an order, from the request params, **Required** |
| `status`  | `string` | Status of the order (active-complete), from the request params, **Required** |

***

### CLEAN UP

After finishing with project if you want to destroy the database schema
```bash
  npm run migrate:down
```


## Authors

- [@emadunan](https://github.com/emadunan)

