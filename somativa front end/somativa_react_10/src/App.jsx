import { useState, useEffect } from 'react';
import faviconCss from './img/favicon_css.png';
import './App.css';

function App() {
  // 1. ESTADOS DA APLICAÇÃO
  const [eventTitle, setEventTitle] = useState(""); // [cite: 16]
  const [eventType, setEventType] = useState("Palestra"); // [cite: 17]
  const [vagas, setVagas] = useState(10); // Novo: Estado para as vagas do formulário [cite: 246]
  const [eventList, setEventList] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("@eventpulse_data");
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
      console.error("Falha ao carregar eventos salvos:", error);
      return [];
    }
  }); // [cite: 18]
  const [filter, setFilter] = useState("Todos"); // [cite: 19]
  const [searchQuery, setSearchQuery] = useState(""); // Novo: Estado para a barra de pesquisa [cite: 244]
  const [isModalOpen, setIsModalOpen] = useState(false); // Novo: Estado para controlar o Modal de CSS [cite: 252]

  // Sincronizar alterações com o LocalStorage
  useEffect(() => {
    if (eventList.length > 0) {
      localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
    } else {
      localStorage.removeItem("@eventpulse_data");
    }
  }, [eventList]);

  // 3. FUNÇÕES DE MANIPULAÇÃO
  // Adicionar um novo evento (Corrigido erro de sintaxe na seta) [cite: 29]
  const addEvent = (e) => {
    e.preventDefault(); // [cite: 30]
    if (!eventTitle.trim()) return; // [cite: 31]

    // Objeto corrigido: as chaves terminavam cedo demais no código original [cite: 32, 33, 34]
    const newEvent = {
      id: crypto.randomUUID(), // [cite: 33]
      title: eventTitle, // [cite: 35]
      type: eventType, // [cite: 36]
      vagas: Number(vagas), // Nova propriedade de vagas (convertida para número) [cite: 246]
      status: "Agendado", // Status inicial padrão [cite: 37]
      date: new Date().toLocaleDateString() // [cite: 38]
    }; // [cite: 39]

    setEventList([newEvent, ...eventList]); // [cite: 40]
    setEventTitle(""); // [cite: 41]
  };

  // Rotacionar o status do evento (Corrigido o bloco if que estava vazio) [cite: 42, 45, 46]
  const toggleStatus = (id) => {
    setEventList(eventList.map(evt => { // [cite: 44]
      if (evt.id === id) { // [cite: 45]
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" : // [cite: 48]
                           evt.status === "Em Andamento" ? "Encerrado" : "Agendado"; // [cite: 49]
        return { ...evt, status: nextStatus }; // [cite: 50]
      }
      return evt; // [cite: 51]
    })); // [cite: 52]
  };

  // Remover Evento (Corrigido erro de sintaxe) [cite: 53]
  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id)); // [cite: 55]
  };

  // Nova Feature: Inscrever Aluno (Reduz as vagas) [cite: 247]
  const enrollStudent = (id) => {
    setEventList(eventList.map(evt => {
      // Diminui o número de vagas disponíveis em 1 a cada clique [cite: 247]
      if (evt.id === id && evt.vagas > 0) {
        return { ...evt, vagas: evt.vagas - 1 };
      }
      return evt;
    }));
  };

  // Nova Feature: Limpar Cronograma [cite: 249]
  const clearSchedule = () => {
    // Exibir um diálogo nativo do navegador validando a ação [cite: 250]
    if (window.confirm("Deseja realmente apagar todo o cronograma? Esta ação não pode ser desfeita.")) {
      setEventList([]); // Esvaziar o estado [cite: 250]
      localStorage.removeItem("@eventpulse_data"); // Apagar o localStorage [cite: 250]
    }
  };

  // 4. LÓGICA DE RENDERIZAÇÃO E FILTROS
  let processedEvents = eventList.filter(evt => { // [cite: 56]
    // Regra 1: Filtro pelas abas (Agendados, Em Andamento, Encerrados)
    let matchStatus = true;
    if (filter === "Agendados") matchStatus = evt.status === "Agendado"; // [cite: 57]
    if (filter === "Em Andamento") matchStatus = evt.status === "Em Andamento"; // [cite: 58]
    if (filter === "Encerrados") matchStatus = evt.status === "Encerrado"; // [cite: 59]

    // Regra 2: Filtro da Caixa de Pesquisa em tempo real [cite: 245]
    let matchSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  // Nova Feature: Destaque Cronológico de Workshops 
  // Força todos os itens do tipo "Workshop" a ficarem fixados no início da listagem 
  processedEvents.sort((a, b) => {
    if (a.type === "Workshop" && b.type !== "Workshop") return -1; // Coloca 'a' antes
    if (a.type !== "Workshop" && b.type === "Workshop") return 1;  // Coloca 'b' antes
    return 0; // Mantém a ordem original
  });

  // 5. ESTRUTURA VISUAL (JSX)
  return (
    <div className="app-container"> {/* [cite: 63] */}
      <header> {/* [cite: 64] */}
        <h1>EventPulse</h1> {/* [cite: 65] */}
        <p>Gestão de Eventos Acadêmicos</p> {/* [cite: 66] */}
        {/* Botão de Limpeza [cite: 249] */}
        <button className="clear-btn" onClick={clearSchedule}>Limpar Cronograma</button> 
      </header>

      <section className="form-section"> {/* [cite: 68] */}
        <form onSubmit={addEvent}> {/* [cite: 69] */}
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)} // Corrigido erro na arrow function [cite: 72]
            placeholder="Nome do evento ou atividade..."
          />
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
          </select>
          {/* Nova Feature: Input de Vagas */}
          <select value={vagas} onChange={(e) => setVagas(Number(e.target.value))}>
             <option value={10}>10 Vagas</option>
             <option value={30}>30 Vagas</option>
             <option value={50}>50 Vagas</option>
          </select>
          <button type="submit">Agendar</button>
        </form>
      </section>

      {/* Nova Feature: Filtro por Caixa de Pesquisa [cite: 244] */}
      <section className="search-section">
        <input 
          type="text" 
          placeholder="Pesquisar evento pelo título..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="filter-section">
        {['Todos', 'Agendados', 'Em Andamento', 'Encerrados'].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <main className="event-grid">
        {processedEvents.map(item => (
          <div
            key={item.id}
            className={`event-card ${item.type.toLowerCase()} ${item.status.toLowerCase().replace(" ", "-")}`} 
          >
            <div className="event-content">
              <h3>{item.title}</h3>
              <span className="event-tag">Tipo: {item.type}</span>
              <span className="status-badge">Status: {item.status}</span>
              <span className="vagas-badge">Vagas: {item.vagas}</span>
              <small>Registrado em: {item.date}</small>
            </div>
            
            <div className="event-actions"> {/* [cite: 107] */}
              <button onClick={() => toggleStatus(item.id)} className="status-btn"> {/* Corrigido [cite: 108] */}
                {item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento" ? "Encerrar" : "Reiniciar"} {/* [cite: 109, 110] */}
              </button>

              {/* Botão de inscrever/esgotado [cite: 247, 248] */}
              <button 
                onClick={() => enrollStudent(item.id)} 
                className="enroll-btn"
                disabled={item.vagas === 0} // Se chegar a 0, desabilite [cite: 248]
              >
                {item.vagas === 0 ? "Esgotado" : "Inscrever"} {/* Troque o texto do botão para "Esgotado" [cite: 248] */}
              </button>

              <button onClick={() => deleteEvent(item.id)} className="delete"> {/* Corrigido [cite: 112] */}
                Remover {/* [cite: 113] */}
              </button>
            </div>
          </div>
        ))}
      </main>

      <button className="floating-btn" type="button" title="CSS Favicon">
        <img src={faviconCss} alt="CSS favicon" />
      </button>
    </div>
  );
}

export default App; // [cite: 122]