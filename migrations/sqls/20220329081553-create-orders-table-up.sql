CREATE TABLE orders (
     id SERIAL PRIMARY key,
     status VARCHAR(10),
     user_id integer REFERENCES users(id) ON DELETE CASCADE
);