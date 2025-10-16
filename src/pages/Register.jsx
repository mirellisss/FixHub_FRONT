import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';

// Regex que permite: Letras (maiúsculas/minúsculas), Letras com acentos e espaços em branco.
const NAME_REGEX = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
// Regex que permite APENAS dígitos (0-9).
const PHONE_REGEX = /^\d*$/; 

export default function Register() {
  const [mensagem, setMensagem] = useState('');
  
  // 1. ESTADOS PARA TODOS OS CAMPOS
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const navigate = useNavigate();

  // Função para controle do campo NOME (só letras)
  const handleNameChange = (event) => {
    const value = event.target.value;
    if (value === '' || NAME_REGEX.test(value)) {
      setNome(value);
    }
  };

  // Função para controle do campo TELEFONE (só números)
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    if (value === '' || PHONE_REGEX.test(value)) {
        setTelefone(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    setMensagem(''); // Limpa mensagens anteriores

    // --- 1. VERIFICAÇÃO DE CAMPOS VAZIOS ---
    if (!nome.trim() || !dataNascimento || !email.trim() || !telefone.trim() || !senha || !confirmarSenha) {
        setMensagem('⚠️ Por favor, preencha todos os campos obrigatórios.');
        return; 
    }

    // --- 2. VALIDAÇÃO DE FORMATO (Nome e Telefone) ---
    if (!NAME_REGEX.test(nome.trim())) {
        setMensagem('⚠️ O nome completo deve conter apenas letras e espaços.');
        return; 
    }

    const numeroLimpo = telefone.replace(/\D/g, ''); 
    if (numeroLimpo.length < 10) { 
        setMensagem('⚠️ O telefone deve ter no mínimo 10 dígitos.');
        return; 
    }
    
    // --- 3. VALIDAÇÃO DE SENHA ---
    if (senha !== confirmarSenha) {
        setMensagem('⚠️ As senhas digitadas não são iguais.');
        return;
    }
    
    // Se chegou até aqui, todas as validações de input passaram!

    // ------------------------------------
    // Lógica de Cadastro (chamada à API, etc.)
    // ------------------------------------
    
    // Simulação de Sucesso no cadastro
    setMensagem('🎉 Usuário cadastrado com sucesso! Redirecionando...');

    setTimeout(() => {
      navigate('/'); 
    }, 2500);
  };

  return (
    <div className="py-6">
      <FormCard title="Tela Cadastro">
        <div className="text-center">
          <img src="/logo_fixhub.png" className="mx-auto w-24" alt="logo" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-2">
          
          {/* Mensagem de Feedback/Erro */}
          {mensagem && (
            <div className={`text-sm p-3 rounded-lg font-medium text-center ${mensagem.startsWith('🎉') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mensagem}
            </div>
          )}

          {/* CAMPO NOME (só letras) */}
          <div>
            <label className="label">Nome completo</label>
            <input 
                className="input" 
                placeholder="Nome completo" 
                value={nome}
                onChange={handleNameChange}
                maxLength={100}
            />
          </div>
          
          {/* CAMPO DATA NASCIMENTO */}
          <div>
            <label className="label">Data nascimento</label>
            <input 
                className="input" 
                type="date" 
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          {/* CAMPO E-MAIL */}
          <div>
            <label className="label">E-mail</label>
            <input 
                className="input" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" // Ajuda na validação nativa e teclado móvel
            />
          </div>
          
          {/* CAMPO TELEFONE (só números) */}
          <div>
            <label className="label">Telefone</label>
            <input 
                className="input" 
                placeholder="(99) 99999-9999" 
                value={telefone}
                onChange={handlePhoneChange}
                type="tel" 
                inputMode="numeric"
                maxLength={15}
            />
          </div>
          
          {/* CAMPO SENHA */}
          <div>
            <label className="label">Senha</label>
            <input 
                className="input" 
                placeholder="Senha" 
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          
          {/* CAMPO CONFIRMAR SENHA */}
          <div>
            <label className="label">Confirmar senha</label>
            <input 
                className="input" 
                placeholder="Confirmar senha" 
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              className="text-sm text-slate-600 hover:underline"
              type="button" 
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
            <button className="btn-primary" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  )
}