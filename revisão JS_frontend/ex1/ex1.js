function verificarTarefaePrioridade() {
    
    const tarefa = document.getElementById("tarefa").value;
    const hora = parseInt(document.getElementById("hora").value);
    const prioridade = parseInt(document.getElementById("prioridade").value);
    const resultadoDiv = document.getElementById("resultado");

    if (!tarefa || tarefa.trim() === "") {
        resultadoDiv.textContent = "Erro: Digite uma tarefa";
        return;
    }

    if (isNaN(hora) || hora < 0 || hora > 23) {
        resultadoDiv.textContent = "Erro: Horário Inválido (0-23)";
        return;
    }

    if (isNaN(prioridade) || prioridade < 1 || prioridade > 10) {
        resultadoDiv.textContent = "Erro: Nível de Prioridade Inválida (1-10)";
        return;
    }

    let turno;
    if (hora >= 0 && hora <= 11) {
        turno = "Manhã";
    } else if (hora >= 12 && hora <= 17) {
        turno = "Tarde";
    } else {
        turno = "Noite";
    }

    let classificacao;
    if (prioridade > 8 && (turno === "Manhã" || turno === "Tarde")) {
        classificacao = "TAREFA CRÍTICA/URGENTE";
    } else if (prioridade >= 7 && prioridade < 9 && (turno === "Manhã" || turno === "Tarde")) {
        classificacao = "TAREFA IMPORTANTE";
    } else if (turno === "Noite") {
        classificacao = "TAREFA NÃO IMPORTANTE";
    } else {
        classificacao = "TAREFA NORMAL";
    }

    resultadoDiv.textContent = `Tarefa: "${tarefa}" | Turno: ${turno} | Classificação: ${classificacao}`;
} 