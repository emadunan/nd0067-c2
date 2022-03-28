# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: GET /products
- Show: GET /products/${id}
- Create [token required]: GET /products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: GET /users
- Show [token required]: GET /users/${id}
- Create N[token required]: POST /users

#### Orders
- Current Order by user (args: user id)[token required]: GET /users/${userId}/orders/active
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: GET /users/${userId}/orders/complete

## Data Shapes
#### Product
-  id [SERIAL PRIMARY KEY]
- name [VARCHAR(50)]
- price [FLOAT]

#### User
- id [SERIAL PRIMARY KEY]
- firstName [VARCHAR(50)]
- lastName [VARCHAR(50)]
- password [VARCHAR(255)]

#### Orders
- id [SERIAL PRIMARY KEY]
- user_id [INTEGER]
- status  [VARCHAR(10)]

#### Order_products
- id [SERIAL PRIMARY KEY]
- quantity [INTEGER]
- order_id [INTEGER]
- product_id [INTEGER]
