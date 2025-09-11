import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProdutoType } from "../../types/produto";


type Parametro = {
    id:string;
}

export default function EditarProduto(){

    //Recuperando o ID que chega através da URI com destructuring
    const {id} = useParams<Parametro>();

    //Importando o useNavigate para realizar um redirect em caso de erro!!
    const navigate = useNavigate();

    const [produto, setProduto] = useState<ProdutoType>({
        id:0,
        nome:"",
        preco:0
    });

    useEffect(()=>{
        //Procurando o objeto na lista através do ID
        // const produto = listaProdutos.filter((p)=> p.id == Number(id));
        try {
            const fetchData = async ()=>{

                const response = await fetch("http://localhost:3001/produtos");
                const data:ProdutoType[] = await response.json();

                const produtoFind:ProdutoType | undefined = data.find((p)=> p.id == Number(id));
                if(!produtoFind){
                    return <><p>Produto não encontrado!</p></>
                }
                setProduto(produtoFind);
            }

            fetchData();

        } catch (error) {
            console.error(error);
            navigate("/erro");
        }
    },[id,navigate]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

        //Destructuring / desestruturação no target e pegar somente os campos name e value
        const {name, value} = e.target;

        //Utilizando os valores desestruturados eu preencho o useState através da função.
        setProduto({...produto,[name]:value})

    }

    return(
        <main>
            <div className="w-[50vw] h-[50vh] p-7 bg-amber-500 my-10 mx-auto border-2 rounded-2xl">
                <form>
                    <fieldset>
                        <legend className="text-center block w-full font-bold">Produtos</legend>
                        <div>
                            <label htmlFor="idNome" className="font-bold block">Produto : </label>
    <input type="text" name="nome" id="idNome" value={produto?.nome} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" onChange={(e)=> handleChange(e)}/>
                        </div>
                        <div>
                            <label htmlFor="idPreco" className="font-bold block">R$: </label>
                            <input type="number" name="preco" id="idPreco" value={produto?.preco} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" onChange={(e)=> handleChange(e)}/>
                        </div>
                        <div>
                            <button className="bg-green-600 border-2 rounded-[5px] border-white w-40 h-15 my-2 mx-auto block hover:bg-amber-300 hover:text-white">Editar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>
    );
}