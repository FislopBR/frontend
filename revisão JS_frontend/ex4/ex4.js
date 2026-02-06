

const dataHoje = new Date();
const dataEvento = new Date(2026, 1, 29);

const diferencaMs = dataEvento - dataHoje;

const msParaUmDia = 24 * 60 * 60 * 1000;
const diferencaDias = diferencaMs / msParaUmDia;

const diasFaltando = Math.ceil(diferencaDias);

console.log(`Faltam ${diasFaltando} dias para o seu compromisso!`);
