import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProdutoType } from "../../types/produto";

export default function EditarProduto() {

    const { id } = useParams<string>();

    const navigate = useNavigate();

    const [produto, setProduto] = useState<ProdutoType>({
        id: 0,
        nome: '',
        preco: 0
    });

    useEffect(() => {
        const fetchProduto = async () => {
            const response = await fetch(`http://localhost:3001/produtos/${id}`);
            const data:ProdutoType = await response.json();
            setProduto(data);
        };

        fetchProduto();
    }, [id]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar os dados atualizados para o servidor
        const atualizaProduto = async () => {
            await fetch(`http://localhost:3001/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });
            alert('Produto atualizado com sucesso!');
        }
        atualizaProduto();
        
        // Redirecionar para a página de listagem de produtos após a atualização
        navigate('/produtos');

    }


    return (
        <main>
            <div className="w-[50vw] h-[50vh] p-7 bg-amber-500 my-10 mx-auto border-2 rounded-2xl">
                <form onSubmit={handleSubmit} className="w-full h-full">
                    <fieldset>
                        <legend className="text-center block w-full font-bold">Produtos</legend>
                        <div>
                            <label htmlFor="idNome" className="font-bold block">Produto : </label>
                            <input type="text" name="nome" id="idNome" value={produto?.nome} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" onChange={(e) => setProduto({ ...produto, nome: e.target.value })}/>
                        </div>
                        <div>
                            <label htmlFor="idPreco" className="font-bold block">R$: </label>
                            <input type="number" name="preco" id="idPreco" value={produto?.preco} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" onChange={(e) => setProduto({ ...produto, preco: Number(e.target.value) })}/>
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