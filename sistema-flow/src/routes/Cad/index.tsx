// src/routes/Cad/index.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Vamos criar este arquivo para o estilo

// Renomeando a função para 'Cad' para corresponder ao nome da pasta/rota
export function Cad() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [avatar, setAvatar] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const novoUsuario = { nome, nomeUser, email, senha, avatar };

        try {
            // A URL aponta para o seu json-server, que deve estar rodando
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                navigate('/login'); // Redireciona para a rota de login
            } else {
                alert('Erro ao realizar o cadastro.');
            }
        } catch (error) {
            console.error('Falha na requisição:', error);
            alert('Não foi possível conectar ao servidor.');
        }
    }

    return (
        <div className="cadastro-container">
            <h1>Formulário de Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="nomeUser">Nome de Usuário</label>
                    <input type="text" id="nomeUser" value={nomeUser} onChange={e => setNomeUser(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">URL do Avatar</label>
                    <input type="text" id="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}