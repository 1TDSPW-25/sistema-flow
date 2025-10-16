type ModalProps = {
    mostrar: boolean;
    titulo: string;
    mensagem: string;
    onClose: () => void;
    acaoOpcional? : {texto: string; onClick: () => void};
};

export default function Modal({ mostrar, titulo, mensagem, onClose, acaoOpcional}: ModalProps) {
    if (!mostrar) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">{titulo} </h2>
            <p className="mb-4">{mensagem}</p>
            <div  className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Fechar</button>
                {acaoOpcional && (
                    <button onClick={acaoOpcional.onClick} className="px-4 py-2 bg-blue-600 text-white rounded">
                     {acaoOpcional.texto}
                    </button>
                )}  
            </div>
        </div>
        </div>
    );
}