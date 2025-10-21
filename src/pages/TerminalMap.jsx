import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TerminalMap.css';

// --- DADOS INICIAIS E CONSTANTES ---
const initialPanel = {
  title: 'Clique em um setor para mais detalhes',
  text: 'Use este mapa esquemático para se orientar nos três pavimentos principais do Terminal.',
};

// --- TASKS_PI (detalhes gerais e administrativos) ---
export const TASKS_PI = [
  {
    id: 'politica-privacidade',
    name: 'Política de Privacidade',
    detail:
      'Sobre a exclusão da conta: ao apagar a conta, os dados pessoais não são imediatamente removidos do sistema, sendo mantidos conforme a política de retenção da plataforma.',
  },
  {
    id: 'esqueceu-senha',
    name: 'Tela de Esqueceu a Senha',
    detail:
      'Implementar a tela de recuperação de senha, permitindo que o usuário redefina seu acesso.',
  },
  {
    id: 'achados-perdidos',
    name: 'Achados e Perdidos',
    detail: `Funciona na Administração do terminal, atendimento – 08:00 às 12:00 e 13:00 às 17:00 (segunda a sexta-feira).
Telefone: (19) 3731-2930 opção 05.
Você também pode procurar seu pertence online.`,
  },
  {
    id: 'sanitarios',
    name: 'Sanitários e Banhos',
    detail: `O terminal possui 08 pontos de sanitários, sendo:
04 comuns – 02 no mezanino e 02 no piso das plataformas.
04 adaptados para pessoas com deficiência física ou mobilidade reduzida – 02 no mezanino e 02 no piso das plataformas.
Banhos: Boxes instalados nos sanitários do piso mezanino. Preço: R$ 15,50 (banhos quentes).`,
  },
  {
    id: 'caixa-eletronico',
    name: 'Caixa Automático',
    detail: 'O terminal conta com serviço de Banco 24 Horas, disponível no saguão principal.',
  },
  {
    id: 'estacionamento',
    name: 'Estacionamento',
    detail: `Localizado no Terminal Rodoviário de Campinas, funcionamento 24 horas, com 307 vagas (12 para deficiente físico e 20 para idoso).
Tel.: (19) 3731-2930
Preços: Meia hora: R$ 6,90, 1h: R$ 12,45, 2h: R$ 17,74, 3h: R$ 23,03, 4h: R$ 28,32, 5h: R$ 33,61, 6h: R$ 38,90, 1 diária: R$ 43,79, Mensalista: R$ 211,61, Locatário: R$ 105,80, Cartão: R$ 30,00.
Para mensalistas e locatários, é necessário realizar um cadastro prévio de forma presencial na Administração (segunda a sexta, das 8h às 17h).
Formas de Pagamento: Dinheiro, Débito, PIX, Conectar Car, Veloe e Sem Parar.`,
  },
  {
    id: 'acessibilidade',
    name: 'Acessibilidade',
    detail: `O terminal dispõe de: 02 Cadeiras de rodas; 04 Sanitários exclusivos p/ deficientes; 04 Escadas rolantes (2 para o mezanino e 2 para as plataformas); 04 Elevadores (2 para o mezanino e 2 para as plataformas); 12 Vagas para deficiente e 20 para idosos no estacionamento; 01 Telefones públicos adaptados.
Serviço de auxílio gratuito a PCD, mobilidade reduzida e idosos. Possuímos piso tátil e sinalização em Braille.`,
  },
  {
    id: 'guarda-volumes',
    name: 'Guarda-volumes',
    detail:
      'Localizado próximo ao balcão de informações, com funcionamento 24 horas. Preços: R$ 9,30 por volume, período de 08 horas.',
  },
  {
    id: 'informacoes',
    name: 'Balcão de Informações',
    detail:
      'Localizado no saguão do mezanino, com funcionamento 24 horas. Informações por telefone através da Central de atendimento automática (URA) no telefone: (19) 3731-2930.',
  },
  {
    id: 'telefones-publicos',
    name: 'Telefones Públicos',
    detail: 'O terminal está provido de 12 aparelhos, sendo que deste total 01 para PCD.',
  },
  {
    id: 'tomadas',
    name: 'Tomadas e Carregadores',
    detail:
      'Dispositivos para Carregadores de Celulares e Laptops disponíveis nas áreas de espera.',
  },
  {
    id: 'encomendas',
    name: 'Despacho de Encomendas',
    detail: 'União Express: 0800 779 4990.',
  },
  {
    id: 'fiscalizacao',
    name: 'Órgãos Fiscalizadores',
    detail: `ANTT (Agência Nacional de Transportes Terrestres) - Localizada na entrada, Telefone: 0800-610300.
ARTESP (Agência Reguladora de Transporte do Estado de SP) - Localizada na entrada, Telefone: 0800-7278377.
EMDEC (Empresa Municipal de Desenvolvimento de Campinas) - Localizada na entrada, Telefone: (19) 3772-4067.`,
  },
];

// --- Dados mock dos setores ---
const sectorsData = {
  mezanino: [
    {
      id: 'almocoplaca',
      name: 'Praça de Alimentação',
      detail: 'Local com diversas opções de lanchonetes e restaurantes. Acesso por escadas e elevadores.',
      shops: "McDonald's, Subway, Lanchonete X, Restaurante Y",
    },
    {
      id: 'sanitarios',
      name: 'Sanitários / Banhos',
      detail: 'Sanitários e Banhos disponíveis.',
      shops: 'Não aplicável',
    },
    {
      id: 'servicosmezz',
      name: 'Serviços Diversos / Informações',
      detail: 'Área de conveniência, lojas de presentes e Balcão de Informações 24h.',
      shops: 'Banca de Jornais, Loja de Presentes, Salão de Beleza',
    },
  ],
  terreo: [
    {
      id: 'bilheterias',
      name: 'Bilheterias (Geral)',
      detail: 'Guichês de venda de passagens para diversas empresas de ônibus rodoviário.',
      shops: 'Viação Cometa, Viação 1001, Viação Expresso, Viação Catarinense',
    },
    {
      id: 'saguaoprinc',
      name: 'Saguão Principal / Caixas',
      detail: 'Área de espera, Caixas Eletrônicos (Banco 24h) e Guarda-volumes.',
      shops: 'Caixa 24 Horas, Guarda-volumes',
    },
    {
      id: 'acessoext',
      name: 'Acesso Externo / Estacionamento',
      detail: 'Saída principal para a rua, estacionamento e órgãos fiscalizadores (ANTT, ARTESP, EMDEC).',
      shops: 'Não aplicável',
    },
  ],
  plataformas: [
    {
      id: 'platformas-geral',
      name: 'Plataformas de Embarque',
      detail: 'Área das baias de ônibus para embarque de passageiros e sanitários.',
      shops: 'Não aplicável',
      extraClass: 'tm-plataformas-grande',
    },
    {
      id: 'desembarque',
      name: 'Desembarque / Táxi',
      detail: 'Área destinada à chegada dos ônibus e ponto de táxi.',
      shops: 'Não aplicável',
      extraClass: 'tm-desembarque',
    },
    {
      id: 'administracao',
      name: 'Administração / AP',
      detail: 'Setor de administração do terminal e Achados e Perdidos (Atendimento seg-sex).',
      shops: 'Não aplicável',
    },
  ],
};

// --- COMPONENTE PRINCIPAL ---
export default function TerminalMap({ compact = false }) {
  const [panel, setPanel] = useState(initialPanel);
  const [activeId, setActiveId] = useState(null);
  const [open, setOpen] = useState(!compact);
  const navigate = useNavigate();

  useEffect(() => {
    setPanel(initialPanel);
    setOpen(!compact);
  }, [compact]);

  // --- Função para clique em setor ---
  function handleClick(sector) {
    if (activeId === sector.id) {
      setActiveId(null);
      setPanel(initialPanel);
      return;
    }

    setActiveId(sector.id);

    // Busca detalhes no TASKS_PI se houver
    const taskDetail = TASKS_PI.find((t) => t.id === sector.id);

    setPanel({
      title: `Setor: ${sector.name}`,
      text: taskDetail ? taskDetail.detail : sector.detail,
      shopsHTML:
        !sector.shops || sector.shops === 'Não aplicável' || sector.shops.trim() === ''
          ? <p>Este setor é de uso operacional ou não possui lojas/serviços detalhados.</p>
          : (
            <div>
              <h4>Lojas e Serviços Encontrados:</h4>
              <ul className="tm-shops-list">
                {sector.shops.split(',').map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ),
    });
  }

  // --- Render ---
  const renderFloor = (floorName, sectors) => (
    <>
      <h2 className="tm-andar">{floorName}</h2>
      <div className="tm-layout tm-piso">
        {sectors.map((s) => (
          <div
            key={s.id}
            className={`tm-setor ${s.extraClass ? s.extraClass : ''} ${
              activeId === s.id ? 'active' : ''
            }`}
            onClick={() => handleClick(s)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(s)}
            aria-pressed={activeId === s.id}
            aria-label={`Setor ${s.name}, clique para ver detalhes`}
          >
            {s.name}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="tm-container">
      {/* Botão Voltar */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          ← Voltar
        </button>
      </div>

      <h1>Terminal Rodoviário de Campinas (Dr. Ramos de Azevedo)</h1>

      {/* Painel de Detalhes */}
      <div id="detalhes-painel" className="tm-detalhes">
        <h3>{panel.title}</h3>
        <p>{panel.text}</p>
        {panel.shopsHTML && typeof panel.shopsHTML === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: panel.shopsHTML }} />
        ) : (
          panel.shopsHTML
        )}
      </div>

      {/* Renderiza os pisos */}
      {renderFloor('1. Mezanino (Piso Superior) - Alimentação e Lazer', sectorsData.mezanino)}
      {renderFloor('2. Térreo (Nível da Rua) - Bilheterias e Acessos', sectorsData.terreo)}
      {renderFloor('3. Piso das Plataformas (Subsolo) - Embarque', sectorsData.plataformas)}
    </div>
  );
}
