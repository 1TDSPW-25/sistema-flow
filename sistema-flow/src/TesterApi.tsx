import { useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function ApiTester() {
  useEffect(() => {
    (async () => {
      try {
        console.log('📡 Fazendo request para API...');
        const response = await fetch('http://localhost:3001/usuarios');
        const data: User[] = await response.json();
        console.log('🎯 Resposta da API:', data);
      } catch (error) {
        console.error('💥 Erro na requisição:', error);
      }
    })();
  }, []);

  return null; // Não renderiza nada na tela
}

export default ApiTester;