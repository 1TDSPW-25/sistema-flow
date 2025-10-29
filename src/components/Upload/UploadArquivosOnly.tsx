import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";

const UploadArquivosOnly: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setMessage("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Por favor, selecione um arquivo.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      setMessage("Enviando...");

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,

      });

      if (!response.ok) {
        throw new Error("Falha no upload. Status: " + response.status);
      }

      const result = await response.json();

      setMessage(`Upload completo! URL do arquivo: ${result.url}`);
      setSelectedFile(null); 
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Erro no upload: ${error.message}`);
      } else {
        setMessage("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Upload de Arquivo
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <label
            htmlFor="file-input"
            className="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Clique para escolher um arquivo
          </label>
          <input
            id="file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFile && <p className="text-sm text-gray-500 mt-2">Arquivo selecionado: {selectedFile.name}</p>}
        </div>
        <button type="submit" disabled={!selectedFile} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
          Enviar
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UploadArquivosOnly;