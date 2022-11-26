import { Client } from "@prisma/client";
import { Router,Request,Response } from "express";
import prismaClient from "../../lib/prisma-client";
import { ClientCreateEntry, ClientUpdateEntry } from "./client.types";

const ClientRouter = Router();

ClientRouter.get("/all",async (req:Request, res: Response) => {
    const clients:Client[] = await prismaClient.client.findMany();
    res.status(200).json(clients);
})
ClientRouter.post("/new_client",async (req:Request, res:Response) => {
    const clientEntry:ClientCreateEntry = req.body;
    const clientCheck: Client | null = await prismaClient.client.findUnique({where:{
         nom_complet: clientEntry.nom_complet
     }})
     if (clientCheck) return res.json({error: "Client already exists"});
    await prismaClient.client.create({data:clientEntry})
    .then((response) => res.status(200).json({message:`${response.nom_complet} has been added successfully`}))
    .catch((reason)=> res.json({error: "Please Verify your fields"}))
})
ClientRouter.put("/:id",async (req:Request, res:Response)  => {
    const {id} = req.params
    const clientEntry:ClientUpdateEntry = req.body;
    const clientCheck: Client | null = await prismaClient.client.findUnique({where:{id: parseInt(id)}})
    if (!clientCheck) return res.json({error: "Client doesn't exists"});
    await prismaClient.client.update({
        where: { id: Number(id) },
        data: {
            nom_complet:clientEntry.nom_complet,
            nbr_gifts:clientEntry.nbr_gifts,
            remise_default:clientEntry.remise_default,
        }
    })
    .then((client) => res.json({message:`${client.id} has been updated successfully`}))
    .catch((reason)=>res.json({error: reason}));
})
ClientRouter.delete("/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    await prismaClient.client.delete({where:{
        id:Number(id)
    }})
    .then((client)=> res.json({message: `${client.nom_complet} has been deleted successfully`}))
    .catch((reason)=> res.json({error: reason}));
})
export default ClientRouter