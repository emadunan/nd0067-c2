import supertest from "supertest";
import app from "../server";
import { OrderStore } from "../models/order";
import { Product, ProductStore } from "../models/product";
import { User, UserStore } from "../models/user";

// USER MODEL UNIT TESTS
describe("User model tests", () => {
    const store = new UserStore();

    describe("Index function", () => {
        it("Index function exists", () => {
            expect(store.index).toBeDefined();
        });

        it("Index function returns []", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    describe("Create function", () => {
        it("Create function exists", () => {
            expect(store.create).toBeDefined();
        });

        it("Create function creates new a user and returns it", async () => {
            const user: User = {
                firstname: "emad",
                lastname: "younan",
                password: "passw0rd",
            };

            const result = await store.create(user);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "passw0rd",
            });
        });
    });

    describe("Show function", () => {
        it("Show function exists", () => {
            expect(store.show).toBeDefined();
        });

        it("Show function returns user", async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "passw0rd",
            });
        });
    });

    describe("Update function", () => {
        it("Update function exists", () => {
            expect(store.update).toBeDefined();
        });

        it("Update function modify returns user", async () => {
            const result = await store.update(1, {
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });

            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });

        it("Update function ignore flasy values and returns user", async () => {
            const result = await store.update(1, {
                firstname: "",
                lastname: "",
                password: "",
            });

            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });
    });

    describe("Delete function", () => {
        it("Delete function exists", () => {
            expect(store.destroy).toBeDefined();
        });

        it("Delete function returns user", async () => {
            const result = await store.destroy(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });

        it("The created user has been already deleted", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });

        it("Create a new user after deletion and return it", async () => {
            const user: User = {
                firstname: "emad",
                lastname: "younan",
                password: "passw0rd",
            };

            const result = await store.create(user);
            expect(result).toEqual({
                id: 2,
                firstname: "emad",
                lastname: "younan",
                password: "passw0rd",
            });
        });
    });
});

// PRODUCT MODEL UNIT TESTS
describe("Product model tests", () => {
    const store = new ProductStore();

    describe("Index function", () => {
        it("Index function exists", () => {
            expect(store.index).toBeDefined();
        });

        it("Index function returns []", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    describe("Create function", () => {
        it("Create function exists", () => {
            expect(store.create).toBeDefined();
        });

        it("Create function creates new a product and returns it", async () => {
            const product: Product = {
                name: "book",
                price: 12,
            };

            const result = await store.create(product);
            expect(result).toEqual({
                id: 1,
                name: "book",
                price: 12,
            });
        });

        it("Create function creates another and returns it", async () => {
            const product: Product = {
                name: "laptop",
                price: 3000,
            };

            const result = await store.create(product);
            expect(result).toEqual({
                id: 2,
                name: "laptop",
                price: 3000,
            });
        });
    });

    describe("Show function", () => {
        it("Show function exists", () => {
            expect(store.show).toBeDefined();
        });

        it("Show function returns user", async () => {
            const result = await store.show(2);
            expect(result).toEqual({
                id: 2,
                name: "laptop",
                price: 3000,
            });
        });
    });
});

// ORDER MODEL UNIT TESTS
describe("Order model tests", () => {
    const store = new OrderStore();

    describe("Index function", () => {
        it("Index function exists", () => {
            expect(store.index).toBeDefined();
        });

        it("Index function returns []", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    describe("Create function", () => {
        it("Create function exists", () => {
            expect(store.create).toBeDefined();
        });

        it("Create function creates new a order and returns it", async () => {
            const result = await store.create(2);
            expect(result).toEqual({
                id: 1,
                status: "active",
                user_id: 2,
            });
        });

        it("Add products to created order", async () => {
            const result = await store.addProduct(2, 1, 1);
            expect(result).toEqual({
                id: 1,
                quantity: 2,
                order_id: 1,
                product_id: 1,
            });
        });
    });

    describe("Show function", () => {
        it("Show function exists", () => {
            expect(store.show).toBeDefined();
        });

        it("Show function returns order", async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                status: "active",
                user_id: 2,
            });
        });
    });

    describe("user_orders function", () => {
        it("user_orders function exists", () => {
            expect(store.user_orders).toBeDefined();
        });

        it("user_orders function returns array of orders", async () => {
            const result = await store.user_orders(2, "active");
            expect(result).toEqual([
                {
                    id: 1,
                    status: "active",
                    user_id: 2,
                },
            ]);
        });
    });

    describe("user_order_products function", () => {
        it("user_order_products function exists", () => {
            expect(store.user_order_products).toBeDefined();
        });

        it("user_order_products function returns array of orders including array of it's products", async () => {
            const result = await store.user_order_products(2, "active");
            expect(result).toEqual([
                {
                    id: 1,
                    status: "active",
                    products: [
                        {
                            name: "book",
                            price: 12,
                            quantity: 2,
                        },
                    ],
                },
            ]);
        });
    });
});

// API Endpoints tests
const request = supertest(app);

// User Endpoints Tests
describe("User Handler endpoint tests", () => {
    // GET /users Endpoint tests
    describe("GET /users Endpoint tests", () => {
        it("responds with status code 401 Unauthorized", async () => {
            const response = await request.get("/users");
            expect(response.status).toBe(401);
            expect(response.body).toEqual(
                "To access this endpoint you need a valid token!"
            );
        });

        it("responds with status code 200", async () => {
            const response = await request
                .get("/users")
                .set(
                    "Authorization",
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiZW1hZCIsImxhc3RuYW1lIjoieW91bmFuIiwiaWF0IjoxNjQ4Mjg4Nzc1fQ.F6isToWY0wccuMSi6HiIxD_a3C-AJnsspHw4JbBK9DY"
                );
            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                { id: 2, firstname: "emad", lastname: "younan" },
            ]);
        });
    });

    // GET /users/:id Endpoint tests
    describe("GET /users/2 Endpoint tests", () => {
        it("responds with status code 401 Unauthorized", async () => {
            const response = await request.get("/users/2");
            expect(response.status).toBe(401);
            expect(response.body).toEqual(
                "To access this endpoint you need a valid token!"
            );
        });

        it("responds with status code 200", async () => {
            const response = await request
                .get("/users/2")
                .set(
                    "Authorization",
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiZW1hZCIsImxhc3RuYW1lIjoieW91bmFuIiwiaWF0IjoxNjQ4Mjg4Nzc1fQ.F6isToWY0wccuMSi6HiIxD_a3C-AJnsspHw4JbBK9DY"
                );
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 2,
                firstname: "emad",
                lastname: "younan",
            });
        });
    });

    // POST /users Endpoint tests
    describe("POST /users Endpoint tests", () => {
        it("responds with status code 201 without token", async () => {
            const response = await request.post("/users").send({
                firstname: "haras",
                lastname: "jonah",
                password: "passw0rd",
            });
            expect(response.status).toBe(201);
            expect(response.body.user).toEqual({
                id: 3,
                firstname: "haras",
                lastname: "jonah",
            });
        });
    });

    // POST /users/:id Endpoint tests
    describe("POST /users/3 Endpoint tests", () => {
        it("responds with status code 200", async () => {
            const response = await request.post("/users/3").send({
                password: "passw0rd",
            });
            expect(response.status).toBe(200);
            expect(response.body.user).toEqual({
                id: 3,
                firstname: "haras",
                lastname: "jonah",
            });
        });
    });
});

// Product Endpoints Test
describe("Product Handler endpoint tests", () => {
    // GET /products Endpoint tests
    describe("GET /products Endpoint tests", () => {
        it("responds with payload and status code 200", async () => {
            const response = await request.get("/products");
            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                { id: 1, name: "book", price: 12 },
                { id: 2, name: "laptop", price: 3000 },
            ]);
        });
    });

    // GET /products/:id Endpoint tests
    describe("GET /products/:id Endpoint tests", () => {
        it("responds with payload and status code 200", async () => {
            const response = await request.get("/products/1");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, name: "book", price: 12 });
        });
    });

    // POST /products Endpoint tests
    describe("POST /products Endpoint tests", () => {
        it("responds with status code 401 Unauthorized", async () => {
            const response = await request.post("/products");
            expect(response.status).toBe(401);
            expect(response.body).toEqual(
                "To access this endpoint you need a valid token!"
            );
        });

        it("responds with status code 200", async () => {
            const response = await request
                .post("/products")
                .set(
                    "Authorization",
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiZW1hZCIsImxhc3RuYW1lIjoieW91bmFuIiwiaWF0IjoxNjQ4Mjg4Nzc1fQ.F6isToWY0wccuMSi6HiIxD_a3C-AJnsspHw4JbBK9DY"
                );
            expect(response.status).toBe(201);
        });
    });
});

// GET /users/:userId/orders/:status
// POST /users/:userId/orders

// Order Endpoints Tests
describe("Order Handler endpoint tests", () => {
    // POST /products Endpoint tests
    describe("POST /users/:userId/orders Endpoint tests", () => {
        it("responds with status code 401 Unauthorized", async () => {
            const response = await request.post("/users/2/orders");
            expect(response.status).toBe(401);
            expect(response.body).toEqual(
                "To access this endpoint you need a valid token!"
            );
        });

        it("responds with status code 200", async () => {
            const response = await request
                .post("/users/3/orders")
                .send({
                    products: [
                        {
                            productId: 1,
                            quantity: 2,
                        },
                        {
                            productId: 2,
                            quantity: 1,
                        },
                    ],
                })
                .set(
                    "Authorization",
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RuYW1lIjoiaGFyYXMiLCJsYXN0bmFtZSI6ImpvbmFoIiwiaWF0IjoxNjQ4MzE1Mzg2fQ.YX_f79XMTBtQS8XKxxN4fskrxaIY-LGPc_Xk04I9s5U"
                );
            expect(response.status).toBe(201);
        });
    });

    // GET /products Endpoint tests
    describe("GET /users/:userId/orders/:status Endpoint tests", () => {
        it("responds with payload and status code 200", async () => {
            const response = await request
                .get("/users/3/orders/active")
                .set(
                    "Authorization",
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RuYW1lIjoiaGFyYXMiLCJsYXN0bmFtZSI6ImpvbmFoIiwiaWF0IjoxNjQ4MzE1Mzg2fQ.YX_f79XMTBtQS8XKxxN4fskrxaIY-LGPc_Xk04I9s5U"
                );
            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    id: 2,
                    status: "active",
                    products: [
                        Object({ name: "book", price: 12, quantity: 2 }),
                    ],
                },
            ]);
        });
    });
});
