import { connection } from "../database/connections";
import { Request, Response } from "express";

export const getAllClients = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        const clients = await connection.select('*').from("Case_Clients");
          
        res.status(200).send(clients)

    }catch(error: any){
        res.status(errorCode).send({message: error.message})
    }
}