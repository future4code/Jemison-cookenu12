import { Request, Response } from "express";
import { connection } from "../database/connections";
import { TProduct } from "../models/Products";


export const createOrder = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        const delivery_date = req.body.delivery_date;
        const fk_client = req.body.fk_client;
        const products:TProduct [] = req.body.products

        if (!delivery_date || !products || !fk_client){
            throw new Error("Body inválido!")
        }

        await products.forEach(async product => {
        await connection("Case_Orders").insert({
            order_data:new Date().toISOString().slice(0,10),
            delivery_date,
            qty: product.qty,
            fk_client,
            fk_product: product.id
        })

        const getStock = await connection.select("qty_stock")
        .from("Case_Products")
        .where({id:product.id})

        const stockAtual = Number(getStock[0].qty_stock)

    })
        res.status(200).send("Pedido criado com sucesso!")

    }catch(error: any){
        res.status(errorCode).send({message: error.message})
    }
}