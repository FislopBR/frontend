const agendaHorarios = [8, 12, 25, 15, -2, 20];

const outputEl = document.getElementById('output');

for (let i = 0; i < agendaHorarios.length; i++) {
	const h = agendaHorarios[i];
	let msg;
	if (h >= 0 && h <= 23) {
		msg = `Compromisso agendado para as ${h}h.`;
	} else {
		msg = `Atenção: O horário ${h}h é inválido!`;
	}
	console.log(msg);
	if (outputEl) {
		const p = document.createElement('p');
		p.textContent = msg;
		outputEl.appendChild(p);
	}
}

