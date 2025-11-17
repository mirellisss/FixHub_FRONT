import React, { useState, useMemo } from "react";

const DEFAULT_FAQS = [
  {
    id: 1,
    question: "Como faço para criar um ticket pelo FixHub?",
    answer:
      "Crie uma conta, na tela inicial você encontrará a opção de criar um novo ticket. Preencha os detalhes do serviço que você precisa e envie sua solicitação.",
  },
  {
    id: 2,
    question: "Como vizualizar meus tickets realizados?",
    answer:
    "Na sua conta, acesse a seção 'Seus Tickets' para ver uma lista completa dos tickets que você criou, incluindo status e detalhes de cada um.",
  },
  {
    id: 3,
    question: "Posso acompanhar o andamento do meu ticket?",
    answer:
    "Sim, você pode acompanhar o status do seu ticket na seção 'Seus Tickets'. Lá, você verá atualizações em tempo real sobre o progresso do serviço solicitado.",
  },
  {
    id: 4,
    question: "Onde posso conferir sobre a privacidade dos meus dados?",
    answer:
    "A privacidade dos seus dados é muito importante para nós. Você pode conferir nossa política de privacidade no menu lateral em 'Política de Privacidade'.",
  },
  {
    id: 5,
    question: "Posso cancelar um ticket depois de enviá-lo?",
    answer:
      "Sim, você pode cancelar o pedido antes que o serviço seja confirmado pelo profissional (apenas quando o status do ticket estiver como 'Pendente'). Acesse 'Seus Tickets', selecione o ticket que deseja cancelar e clique no icone de lixeira.",
  },
  {
    id: 6,
    question: "Como posso editar minhas informações pessoais?",
    answer:
      "No menu lateral da sua conta, clique em 'Informações da Conta'. Lá, você poderá atualizar seus dados pessoais, como nome, e-mail, telefone e avatar.",
  },
  {
    id: 7,
    question: "Posso fazer a compra de passagens pela plataforma FixHub?",
    answer:
    "Nós não nos responsabilizamos pela compra de passagens, mas no menu lateral você encontra uma seção chamada 'Passagens', onde disponibilizamos links para sites confiáveis de compra de passagens aéreas e terrestres.",   
  },
  {
    id: 8,
    question: "Esqueci minha senha. O que devo fazer?",
    answer:
      "Na tela de login, clique em 'Esqueci minha senha' e siga as instruções enviadas para o seu e-mail cadastrado para redefinir o acesso.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState(null);
  const [category, setCategory] = useState("Geral");
  const [search, setSearch] = useState("");
  const [mostrarContato, setMostrarContato] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(DEFAULT_FAQS.map((f) => f.category)));
    return ["Geral", ...cats];
  }, []);

  const filtered = useMemo(() => {
    return DEFAULT_FAQS.filter((f) => {
      const matchesCategory =
        category === "Geral" ? true : f.category === category;
      const matchesSearch =
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function handleClick(e) {
    e.preventDefault();
    setMostrarContato((prev) => !prev);
  }

  return (
    <main className="faq-page">
      <header className="faq-header">
        <h1>Perguntas Frequentes</h1>
        <p>Encontre respostas rápidas sobre o uso do FixHub.</p>
      </header>

      <section className="faq-search">
        <input
          type="text"
          placeholder="Pesquisar pergunta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </section>

      <section className="faq-controls">
        <div className="faq-cats" role="tablist" aria-label="Categorias">
          {categories.map((c) => (
            <button
              key={c}
              className={`cat-btn ${c === category ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="faq-list" aria-live="polite">
        {filtered.length === 0 ? (
          <div className="no-results">
            Nenhuma pergunta encontrada. Tente outra palavra ou entre em contato.
          </div>
        ) : (
          filtered.map((f) => (
            <article className="faq-item" key={f.id}>
              <button
                className="faq-question"
                aria-expanded={openId === f.id}
                onClick={() => toggle(f.id)}
              >
                <span>{f.question}</span>
                <span className="chev">{openId === f.id ? "−" : "+"}</span>
              </button>
              {openId === f.id && (
                <div className="faq-answer">
                  <p>{f.answer}</p>
                </div>
              )}
            </article>
          ))
        )}
      </section>

      <footer
        className="faq-footer"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <p>
          Não encontrou o que procura?{" "}
          <a href="/contato" onClick={handleClick}>
            Fale com o suporte
          </a>.
        </p>

        {mostrarContato && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "10px",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
          >
            <p>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:suporte@empresa.com" style={{ color: "#2563eb" }}>
                suporte@empresa.com
              </a>
            </p>
            <p>
              📞 <strong>Telefone:</strong>{" "}
              <a href="tel:+5511999999999" style={{ color: "#2563eb" }}>
                (11) 99999-9999
              </a>
            </p>
          </div>
        )}
      </footer>

      <style>{`
        .faq-page { max-width: 900px; margin: 32px auto; padding: 0 16px; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #1f2937; }
        .faq-header h1 { margin: 0 0 6px; font-size: 28px; }
        .faq-header p { margin: 0 0 18px; color: #4b5563; }

        /* 🔍 Estilo da barra de pesquisa */
        .faq-search { margin-bottom: 18px; }
        .search-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 999px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        .faq-controls { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; }
        .faq-cats { display:flex; gap:8px; flex-wrap:wrap; }
        .cat-btn { background:#f3f4f6; border: none; padding:6px 10px; border-radius:999px; cursor:pointer; color:#111827; }
        .cat-btn.active { background:#2563eb; color:white; }

        .faq-item { border-top:1px solid #e5e7eb; padding:12px 0; }
        .faq-question { width:100%; text-align:left; background:none; border:none; padding:0; display:flex; justify-content:space-between; align-items:center; font-size:16px; cursor:pointer; }
        .faq-question .chev { font-weight:700; margin-left:12px; }
        .faq-answer { margin-top:10px; color:#374151; }

        .no-results { padding:20px; text-align:center; color:#6b7280; }

        .faq-footer { margin-top:22px; color:#4b5563; }
        .faq-footer a { color:#2563eb; text-decoration:none; }
      `}</style>
    </main>
  );
}
