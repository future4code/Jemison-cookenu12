import express from "express"
import cors from 'cors'
import { ping } from "./endpoints/ping"
import { createClient } from "./endpoints/createClient"
import { getAllClients } from "./endpoints/allClients"
import { getAllProducts } from "./endpoints/allProducts"
import { createOrder } from "./endpoints/createOrder"

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

app.get("/ping", ping);

app.post("/client", createClient)

app.get("/clients", getAllClients)

app.get("/products", getAllProducts)

app.post("/order", createOrder)