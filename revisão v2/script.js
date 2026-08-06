// Dataset Inicial exigido pelas especificações
const sensoresIniciais = [
  { id: 1, nome: "Sensor Galpão A", tipo: "Temperatura", valor: 24.5, unidade: "°C", status: "normal" },
  { id: 2, nome: "Sensor Estufa 02", tipo: "Umidade", valor: 88.0, unidade: "%", status: "critico" },
  { id: 3, nome: "Sensor Compressor", tipo: "Pressão", valor: 6.2, unidade: "bar", status: "normal" },
  { id: 4, nome: "Sensor Câmara Fria", tipo: "Temperatura", valor: -2.1, unidade: "°C", status: "normal" },
  { id: 5, nome: "Sensor Almoxarifado", tipo: "Umidade", valor: 45.5, unidade: "%", status: "normal" },
  { id: 6, nome: "Sensor Caldeira", tipo: "Temperatura", valor: 98.4, unidade: "°C", status: "critico" }
];

// Ícones ilustrativos por tipo de sensor
const iconesPorTipo = {
  "Temperatura": "🌡️",
  "Umidade": "💧",
  "Pressão": "⏲️"
};

// Seleção de elementos do DOM
const gridSensores = document.getElementById("grid-sensores");
const selectTipo = document.getElementById("select-tipo");
const btnAtualizar = document.getElementById("btn-atualizar");
const timestampAtualizacao = document.getElementById("timestamp-atualizacao");

/**
 * Atualiza o rodapé com o horário atual formatado (HH:MM:SS)
 */
function atualizarRodapeHorario() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  
  timestampAtualizacao.textContent = `${horas}:${minutos}:${segundos}`;
}

/**
 * Renderiza dinamicamente os cards de sensores no container principal
 * @param {Array} listaSensores 
 */
function renderizarDashboard(listaSensores) {
  // Limpa o container principal
  gridSensores.innerHTML = "";

  if (listaSensores.length === 0) {
    gridSensores.innerHTML = "<p>Nenhum sensor encontrado para este tipo.</p>";
    return;
  }

  listaSensores.forEach(sensor => {
    // Regra de Negócio Visual: destaca status "critico" ou temperatura > 35°C
    const eCritico = sensor.status === "critico" || (sensor.tipo === "Temperatura" && sensor.valor > 35);
    const classeAlerta = eCritico ? "card-alerta" : "";
    const icone = iconesPorTipo[sensor.tipo] || "📊";

    const cardHTML = `
      <article class="card-sensor ${classeAlerta}" data-id="${sensor.id}">
        <div class="card-topo">
          <span class="card-icone">${icone}</span>
          <span class="card-tipo">${sensor.tipo}</span>
        </div>
        <div class="card-corpo">
          <h2 class="card-nome">${sensor.nome}</h2>
          <div class="card-valor">
            ${sensor.valor.toFixed(1)} <span class="card-unidade">${sensor.unidade}</span>
          </div>
        </div>
        <div class="card-rodape">
          <span class="badge-status ${eCritico ? 'critico' : 'normal'}">
            ${eCritico ? '⚠️ Crítico' : '✓ Normal'}
          </span>
          <button class="btn-historico" onclick="alert('Exibindo histórico do ${sensor.nome}')">Histórico</button>
        </div>
      </article>
    `;

    gridSensores.insertAdjacentHTML("beforeend", cardHTML);
  });

  // Atualiza timestamp a cada renderização
  atualizarRodapeHorario();
}

/**
 * Aplica o filtro de sensores usando o método .filter()
 */
function aplicarFiltro() {
  const tipoSelecionado = selectTipo.value;
  
  if (tipoSelecionado === "Todos") {
    renderizarDashboard(sensoresIniciais);
  } else {
    const listaFiltrada = sensoresIniciais.filter(sensor => sensor.tipo === tipoSelecionado);
    renderizarDashboard(listaFiltrada);
  }
}

/**
 * Simula a alteração dos valores dos sensores com Math.random()
 */
function simularAtualizacaoDados() {
  sensoresIniciais.forEach(sensor => {
    // Gera variação aleatória entre -1.5 e +1.5
    const variacao = (Math.random() * 3 - 1.5);
    sensor.valor = parseFloat((sensor.valor + variacao).toFixed(1));

    // Atualiza status dinamicamente conforme novo valor
    if (sensor.tipo === "Temperatura") {
      sensor.status = (sensor.valor > 35 || sensor.valor < 0) ? "critico" : "normal";
    } else if (sensor.tipo === "Umidade") {
      sensor.status = (sensor.valor > 80 || sensor.valor < 20) ? "critico" : "normal";
    }
  });

  // Re-aplica o filtro ativo para atualizar a visualização
  aplicarFiltro();
}

// Event Listeners
selectTipo.addEventListener("change", aplicarFiltro);
btnAtualizar.addEventListener("click", simularAtualizacaoDados);

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderizarDashboard(sensoresIniciais);
  
  // Atualização automática a cada 30 segundos via setInterval
  setInterval(simularAtualizacaoDados, 30000);
});