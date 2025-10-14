import React, { useState } from 'react'
import FormCard from '../components/FormCard'

export default function ReportCreate() {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [otherCategory, setOtherCategory] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const locations = ["Térreo", "Primeiro andar"]
  const areas = ["Área externa", "Área interna"]
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
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const categoriaFinal = selectedCategory === "Outros" ? otherCategory : selectedCategory

    const reportData = {
      selectedLocation,
      selectedArea,
      selectedCategory: categoriaFinal,
      description,
      image
    }
    console.log("Enviando dados:", reportData)
    alert("Report enviado com sucesso!")
  }

  const renderSelect = (label, options, placeholder, value, onChange, disabled) => (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">{label}</label>
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
                <label className="block font-medium text-sm mb-1">Descreva Outros</label>
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
              <label className="block font-medium text-sm mb-1">Descrição</label>
              <textarea
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                rows="4"
                placeholder="Descreva o problema"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Upload de Imagem */}
            <div>
              <label className="block font-medium text-sm mb-2">Foto do problema</label>
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
