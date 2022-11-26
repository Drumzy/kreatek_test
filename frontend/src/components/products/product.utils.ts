export interface Produit{
    id: number;
    libelle:string;
    prix_ttc:number;
    en_stock:boolean;
    is_gift:boolean;
}

export async function getProducts(){
  const response = await fetch("http://localhost:5500/api/v1/products/all");
  const Products: Produit[] | any = response.json();
  return Products;
};