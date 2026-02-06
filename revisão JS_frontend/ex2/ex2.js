function calcularGastos() {
    const salario = parseFloat(document.getElementById('salario').value);
    const aluguel = parseFloat(document.getElementById('aluguel').value) || 0;
    const alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
    const lazer = parseFloat(document.getElementById('lazer').value) || 0;
    const resultado = document.getElementById('resultado');

    if (isNaN(salario)) {
        resultado.textContent = 'Erro: Informe um valor válido para o salário.';
        return;
    }

    const totalDespesas = aluguel + alimentacao + lazer;
    const saldo = salario - totalDespesas;

    let mensagem;
    if (saldo > 0) {
        mensagem = 'Saldo Positivo';
    } else if (saldo === 0) {
        mensagem = 'No Limite';
    } else {
        mensagem = 'Saldo Negativo';
    }

    resultado.textContent = `Salário: R$ ${salario.toFixed(2)} | Despesas: R$ ${totalDespesas.toFixed(2)} | Saldo: R$ ${saldo.toFixed(2)} — ${mensagem}`;
}
