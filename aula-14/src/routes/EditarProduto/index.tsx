import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProdutoType } from "../../types/produto";
import { useForm } from "react-hook-form";
const URL_API = import.meta.env.VITE_API_URL_BASE;

export default function EditarProduto() {

    //Adicionando título à página
    useEffect(() => {
      document.title = 'Editar Produto';
    }, []);
        
    //Recebendo o id da URL, que é enviado pelo componente Link da ListagemProdutos.
    const { id } = useParams<string>();
    //Criando um navegador para redirecionar o usuário após a edição do produto.
    const navigate = useNavigate();

    const {reset,register,handleSubmit,formState:{errors}} = useForm<ProdutoType>({
        mode: "onChange"
    });

    //Controlando o estado do produto
    useEffect(() => {
        const fetchProduto = async () => {
            const response = await fetch(`${URL_API}/${id}`);
            const data:ProdutoType = await response.json();
            reset(data);
        };

        fetchProduto();
    }, [id, reset]);


    const onSubmit = (data:ProdutoType) => {
        // Lógica para enviar os dados atualizados para o servidor
        const atualizaProduto = async () => {
            await fetch(`${URL_API}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            alert('Produto atualizado com sucesso!');
            // Redirecionar para a página de listagem de produtos após a atualização
            navigate('/produtos');
        }
        atualizaProduto();
    }

    return (
        <main>
            <div className="w-[50vw] h-[50vh] p-7 bg-amber-500 my-10 mx-auto border-2 rounded-2xl">
                <form className="w-full h-full">
                    <fieldset>
                        <legend className="text-center block w-full font-bold">Produtos</legend>
                        <div>
                            <label htmlFor="idNome" className="font-bold block">Produto : </label>
                            <input type="text" id="idNome"  className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("nome",{required:true})}/>
                        </div>
                        <div> 
                            <label htmlFor="idPreco" className="font-bold block">R$: </label>
                            <input type="number" id="idPreco" step={0.01} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("preco",{required:true, valueAsNumber:true})}/>
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