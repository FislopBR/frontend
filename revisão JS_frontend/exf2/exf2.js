function atualizarCartao() {
    // Captura os valores dos inputs
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;

    // Atualiza o conteúdo do cartão com innerText
    document.getElementById('cartao-nome').innerText = nome || 'Nome aqui';
    document.getElementById('cartao-cargo').innerText = cargo || 'Cargo aqui';
}

function mudarCor(cor) {
    // Atualiza a cor de fundo do cartão
    document.getElementById('cartao').style.backgroundColor = cor;
}

// Inicializa o cartão com a cor padrão ao carregar a página
window.addEventListener('load', function() {
    atualizarCartao();
    mudarCor('#007bff');
});
