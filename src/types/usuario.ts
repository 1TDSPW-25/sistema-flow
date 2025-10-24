export type UsuarioType = {
    id?: number;
    nome: string;
    nomeUser: string;
    email: string;
    senha: string;
    artigosSalvos?: Array<{ url: string, nomeArtigo: string }>
};
