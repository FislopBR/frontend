function limparNomeContato(nome) {
	if (!nome || typeof nome !== 'string') return '';
	// Remove espaços nas extremidades, colapsa espaços internos e retorna em Title Case
	const partes = nome.trim().split(/\s+/);
	return partes
		.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
		.join(' ');
}

function contarPalavras(nome) {
	if (!nome || typeof nome !== 'string') return 0;
	const trimmed = nome.trim();
	if (trimmed === '') return 0;
	// split por um ou mais espaços e retornar o tamanho
	return trimmed.split(/\s+/).length;
}

function formatarNome() {
	const input = document.getElementById('nome');
	const resultado = document.getElementById('resultado');
	if (!input || !resultado) return;

	const nome = input.value;
	if (!nome || nome.trim() === '') {
		resultado.textContent = 'Erro: informe um nome.';
		return;
	}

	const nomeFormatado = limparNomeContato(nome);
	const palavras = contarPalavras(nome);

	resultado.textContent = `${nomeFormatado} — ${palavras} palavra(s)`;
}

// Removido export compatível com Node — não necessário no navegador

