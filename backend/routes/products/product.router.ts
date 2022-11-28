import { Produit } from "@prisma/client";
import { Request, Response, Router } from "express";
import prismaClient from "../../lib/prisma-client";
import { ProductEntry, ProductUpdateEntry } from "./product.types";
const ProductsRouter = Router();

ProductsRouter.get("/all", async (req: Request, res: Response) =>{
    const Products:Produit[] = await prismaClient.produit.findMany({});

    res.status(200).json(Products);
})

ProductsRouter.post("/new_product", async (req: Request, res:Response) =>{
    const productEntry:ProductEntry = req.body;
    console.log(productEntry)
    const productCheck: Produit | null = await prismaClient.produit.findUnique({where:{
         libelle: productEntry.libelle
     }})
     if (productCheck) return res.json({error: "Product already exists"});
    await prismaClient.produit.create({data:{libelle:productEntry.libelle,prix_ttc:Number(productEntry.prix_ttc),en_stock:productEntry.en_stock,is_gift:productEntry.is_gift}})
    .then((response) => res.status(200).json({message:`${response.libelle} has been added successfully`}))
    .catch((reason)=> res.json({error: `Please Verify your fields `}))
})
ProductsRouter.put("/:id", async (req: Request, res: Response) =>{
    const {id} = req.params
    const productEntry:ProductUpdateEntry = req.body;
    const productCheck: Produit | null = await prismaClient.produit.findUnique({where:{id: parseInt(id)}})
    if (!productCheck) return res.json({error: "Product doesn't exists"});
    await prismaClient.produit.update({
        where: { id: Number(id) },
        data: {
            libelle:productEntry.libelle,
            prix_ttc:productEntry.prix_ttc,
            en_stock:productEntry.en_stock,
            is_gift:productEntry.is_gift
        }
    })
    .then((product) => res.json({message:`${product.id} has been updated successfully`}))
    .catch((reason)=>res.json({error: reason}));

})
ProductsRouter.delete("/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    await prismaClient.produit.delete({where:{
        id:Number(id)
    }})
    .then((product)=> res.json({message: `${product.libelle} has been deleted successfully`}))
    .catch((reason)=> res.json({error: reason}));
})
export default ProductsRouter;