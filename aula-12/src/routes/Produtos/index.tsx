import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProdutoType } from "../../types/produto";
import { CiEdit as Editar } from "react-icons/ci";

export default function Produtos(){
    const [produtos,setProdutos] = useState<ProdutoType[]>([]);
    useEffect(()=>{
        try {
            const fetchData = async ()=>{
                const response = await fetch("http://localhost:3001/produtos");
                const data = await response.json();
                console.log(data);
                setProdutos(data);
            }

            fetchData();

        } catch (error) {
            console.error(error);
        }   
    },[]);

    return(
        <main>
            <h1>Produtos</h1>
            <table className="tblProdutos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PRODUTO</th>
                        <th>PREÇO-R$</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                 {produtos.map((produto,indice)=>(
                    <tr key={indice}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.preco}</td>
                        <td><Link to={`/editar/produto/${produto.id}`}><Editar/></Link></td>
                    </tr>
                 ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>


        </main>
    );
}