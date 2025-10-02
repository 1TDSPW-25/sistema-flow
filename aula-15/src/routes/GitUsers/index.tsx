import { useEffect, useState } from "react"
import type { GitUserTipo } from "../../types/gitUserTipo";
import Card from "../../components/Card/Card";

export default function GitUsers() {

    const [usuarios, setUsuarios] = useState<GitUserTipo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.github.com/users");
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchData();
    }, []);
    

  return (
    <main>
        
        <h1>Lista de Usuários</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
        {usuarios.map((usuario) => (
            <div key={usuario.id}>
                <Card usuario={usuario}/>
            </div>
        ))}
        </div>

    </main>
  )
}
