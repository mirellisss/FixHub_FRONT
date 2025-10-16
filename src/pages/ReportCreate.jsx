import React, { useState } from 'react';
import FormCard from '../components/FormCard';
import { useNavigate } from 'react-router-dom';

export default function ReportCreate() {
  const navigate = useNavigate();

  // Estados dos campos
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Estado para a mensagem de feedback/erro
  const [mensagem, setMensagem] = useState('');

  const locations = ["Térreo", "Primeiro andar"];
  const areas = ["Área externa", "Área interna"];
  const categories = [
    "Área de Embarque/Desembarque",
    "Banheiro Feminino",
    "Banheiro Masculino",
    "Bilheteria",
    "Catraca",
    "Elevador",
    "Escada Rolante",
    "Estacionamento",
    "Praça de Alimentação",
    "Outros"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setMensagem(''); // Limpa mensagens anteriores
    
    // --- 1. VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS ---
    
    // Validar Local
    if (!selectedLocation) {
        setMensagem('⚠️ Por favor, selecione o Local.');
        return;
    }

    // Validar Área (depende do Local)
    if (!selectedArea) {
        setMensagem('⚠️ Por favor, selecione a Área.');
        return;
    }

    // Validar Categoria (depende da Área)
    if (!selectedCategory) {
        setMensagem('⚠️ Por favor, selecione a Categoria.');
        return;
    }
    
    // Validar "Outros" (se Categoria for "Outros")
    if (selectedCategory === "Outros" && !otherCategory.trim()) {
        setMensagem('⚠️ Por favor, descreva a categoria "Outros".');
        return;
    }
    
    // Validar Descrição
    if (!description.trim()) {
        setMensagem('⚠️ A Descrição do problema é obrigatória.');
        return;
    }

    // Se chegou até aqui, todas as validações de campos obrigatórios passaram!
    
    const categoriaFinal = selectedCategory === "Outros" ? otherCategory : selectedCategory;

    const reportData = {
      selectedLocation,
      selectedArea,
      selectedCategory: categoriaFinal,
      description,
      image // Imagem é opcional e passa sem validação
    };
    
    // ------------------------------------
    // Lógica de Envio (chamada à API, etc.)
    // ------------------------------------

    // Simulação do envio
    console.log("Enviando dados:", reportData);
    
    setMensagem('🎉 Report enviado com sucesso! Redirecionando...');

    setTimeout(() => {
        // 3. Use navigate() para redirecionar após a lógica de envio
        navigate('/reports'); 
    }, 1500); // Redireciona após 1.5s para exibir a mensagem de sucesso
  };

  // Função auxiliar para renderizar selects
  const renderSelect = (label, options, placeholder, value, onChange, disabled) => (
    <div className="mb-4">
      {/* Adicionado o asterisco para indicar campo obrigatório */}
      <label className="block font-medium text-sm mb-1">{label} <span className="text-red-500">*</span></label>
      <select
        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 disabled:bg-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="py-6">
      <div className="app-screen">
        <FormCard title="Criar Report">
          <form onSubmit={handleSubmit} className="space-y-4"> 

            {/* Mensagem de Feedback/Erro */}
            {mensagem && (
                <div className={`text-sm p-3 rounded-lg font-medium text-center ${mensagem.startsWith('🎉') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensagem}
                </div>
            )}

            {/* Selects encadeados */}
            {renderSelect("Local", locations, "Selecione um local", selectedLocation, setSelectedLocation, false)}
            
            {selectedLocation &&
              renderSelect("Área", areas, "Selecione uma área", selectedArea, setSelectedArea, false)
            }
            
            {selectedArea &&
              renderSelect("Categoria", categories, "Selecione uma categoria", selectedCategory, setSelectedCategory, false)
            }

            {/* Campo "Outros" */}
            {selectedCategory === "Outros" && (
              <div className="mb-4">
                <label className="block font-medium text-sm mb-1">Descreva Outros <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  placeholder="Descreva a categoria"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                />
              </div>
            )}

            {/* Descrição */}
            <div>
              <label className="block font-medium text-sm mb-1">Descrição <span className="text-red-500">*</span></label>
              <textarea
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                rows="4"
                placeholder="Descreva o problema"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Upload de Imagem (Opcional) */}
            <div>
              <label className="block font-medium text-sm mb-2"> Adicione uma Imagem (Opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
              {preview && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Pré-visualização:</p>
                  <img src={preview} alt="Pré-visualização" className="max-h-40 rounded-lg shadow-md" />
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="reset"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setSelectedLocation("")
                  setSelectedArea("")
                  setSelectedCategory("")
                  setOtherCategory("")
                  setDescription("")
                  setImage(null)
                  setPreview(null)
                  setMensagem('') // Limpa a mensagem ao resetar
                }}
              >
                Limpar
              </button>
              <button
                type="submit" 
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
              >
                Enviar
              </button>
            </div>

          </form>
        </FormCard>
      </div>
    </div>
  )
}