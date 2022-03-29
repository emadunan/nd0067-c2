CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer REFERENCES orders(id) ON DELETE CASCADE,
    product_id integer REFERENCES products(id) ON DELETE CASCADE
);