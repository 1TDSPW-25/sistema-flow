import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ProdutoType } from "../../types/produto";
import { useEffect } from "react";

export default function CadProdutos() {

    useEffect(() => {
        document.title = "Cadastro de Produtos";
    }, []);
    
const navigate = useNavigate();

const {register, handleSubmit, formState:{errors}} = useForm<ProdutoType>({
    mode:"onChange"
});

const onSubmit =   handleSubmit(async (data) => {
    try {
        const response = await fetch("http://localhost:3001/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)           
        });
            
        if(!response.ok){
            throw new Error("Erro ao cadastrar produto");
        }else{
            const data = await response.json();
            console.log(data);
            alert("Produto cadastrado com sucesso!");
            navigate("/produtos");
        }

    } catch (error) {
        console.error(error);
    }
});

  return (
    <main>
        <h1>Cadastro de Produtos</h1>
            <div className="w-[50vw] h-[50vh] p-7 bg-amber-500 my-10 mx-auto border-2 rounded-2xl">
                <form  onSubmit={onSubmit} className="w-full h-full">
                    <fieldset>
                        <div>
                            <label htmlFor="idNome" className="font-bold block">Produto : </label>
                            <input type="text" id="idNome" className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("nome", 
                            {required:"Digite um nome válido!",
                             minLength:{value:3,message:"O nome deve ter mais de 3 caractéres!"},
                             maxLength:{value:100,message:"O nome deve ter menos de 100 caractéres!"}
                             })} aria-invalid={!!errors.nome} />
                            {errors.nome && <p role="alert" className="text-red-500">{errors.nome.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="idPreco" className="font-bold block">R$: </label>
                            <input type="number" id="idPreco" step={0.01} className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("preco", 
                                {required:"Digite um valor válido",
                                 min:{value:0.01,message:"Valores negativos não são aceitos!"}   
                                })} aria-invalid={!!errors.preco}/>
                                {errors.preco && <p role="alert" className="text-red-500">{errors.preco.message}</p>}
                        </div>
                        <div>
                            <button type="submit" className="bg-green-600 border-2 rounded-[5px] border-white w-40 h-15 my-2 mx-auto block hover:bg-amber-300 hover:text-white">Cadastrar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>
  )
}
