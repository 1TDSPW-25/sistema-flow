import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CadProdutos() {

const navigate = useNavigate();

const {register, handleSubmit, formState:{errors}} = useForm({
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
                            <input type="text" id="idNome" className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("nome", {required: true, maxLength: 200})} />
                        </div>
                        <div>
                            <label htmlFor="idPreco" className="font-bold block">R$: </label>
                            <input type="number" id="idPreco" className="border-2 rounded-[5px] bg-amber-50 p-1 mb-5 w-90" {...register("preco", {required: true})}/>
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
