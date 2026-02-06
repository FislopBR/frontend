const celsiusInput = document.getElementById('celsius');
const convertBtn = document.getElementById('convert');
const resultadoEl = document.getElementById('resultado');

function converter() {
	const c = parseFloat(celsiusInput.value);
	if (Number.isNaN(c)) {
		resultadoEl.textContent = 'Informe um valor numérico em Celsius.';
		return;
	}
	const f = c * 1.8 + 32;
	resultadoEl.textContent = `Resultado: ${f.toFixed(1)} °F`;

	if (f > 80) {
		document.body.classList.add('quente');
		document.body.classList.remove('frio');
	} else {
		document.body.classList.add('frio');
		document.body.classList.remove('quente');
	}
}

convertBtn.addEventListener('click', converter);

