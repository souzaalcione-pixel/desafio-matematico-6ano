const perguntas = [
  { categoria: "Adição", texto: "Quanto é 248 + 137?", opcoes: ["375", "385", "395", "415"], correta: 1, explicacao: "248 + 137 = 385." },
  { categoria: "Subtração", texto: "Quanto é 600 − 275?", opcoes: ["325", "335", "425", "375"], correta: 0, explicacao: "600 − 275 = 325." },
  { categoria: "Multiplicação", texto: "Quanto é 8 × 7?", opcoes: ["54", "56", "64", "48"], correta: 1, explicacao: "8 grupos de 7 formam 56." },
  { categoria: "Divisão", texto: "Quanto é 72 ÷ 9?", opcoes: ["6", "7", "8", "9"], correta: 2, explicacao: "72 dividido em 9 partes iguais resulta em 8." },
  { categoria: "Frações", texto: "Qual fração representa a metade de uma pizza?", opcoes: ["1/3", "1/4", "2/3", "1/2"], correta: 3, explicacao: "A metade corresponde a 1 de 2 partes iguais: 1/2." },
  { categoria: "Números decimais", texto: "Quanto é 2,5 + 1,3?", opcoes: ["3,8", "3,5", "4,8", "2,8"], correta: 0, explicacao: "Somando os décimos: 2,5 + 1,3 = 3,8." },
  { categoria: "Geometria", texto: "Quantos lados tem um hexágono?", opcoes: ["5", "6", "7", "8"], correta: 1, explicacao: "O prefixo 'hexa' indica seis. Um hexágono tem 6 lados." },
  { categoria: "Medidas", texto: "Quantos centímetros há em 2 metros?", opcoes: ["20 cm", "200 cm", "2.000 cm", "120 cm"], correta: 1, explicacao: "1 metro tem 100 centímetros; 2 metros têm 200 centímetros." },
  { categoria: "Problema", texto: "Ana comprou 3 cadernos por R$ 8 cada. Quanto gastou?", opcoes: ["R$ 11", "R$ 16", "R$ 24", "R$ 32"], correta: 2, explicacao: "3 × 8 = 24. Ana gastou R$ 24." },
  { categoria: "Múltiplos", texto: "Qual destes números é múltiplo de 5?", opcoes: ["22", "31", "43", "45"], correta: 3, explicacao: "Os múltiplos de 5 terminam em 0 ou 5. Por isso, 45 é múltiplo de 5." }
];

const telas = {
  inicio: document.getElementById("inicio"),
  jogo: document.getElementById("jogo"),
  resultado: document.getElementById("resultado")
};
const nomeInput = document.getElementById("nome-jogador");
const contador = document.getElementById("contador");
const pontuacao = document.getElementById("pontuacao");
const categoria = document.getElementById("categoria");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const retorno = document.getElementById("retorno");
const botaoProxima = document.getElementById("botao-proxima");
const barra = document.getElementById("barra");
const progresso = document.getElementById("progresso");

let indice = 0;
let pontos = 0;
let respondida = false;
let nome = "";

function mostrarTela(tela) {
  Object.values(telas).forEach(elemento => elemento.classList.remove("ativa"));
  telas[tela].classList.add("ativa");
}

function iniciarJogo() {
  indice = 0;
  pontos = 0;
  nome = nomeInput.value.trim();
  pontuacao.textContent = pontos;
  mostrarTela("jogo");
  mostrarPergunta();
}

function mostrarPergunta() {
  respondida = false;
  const atual = perguntas[indice];
  contador.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  categoria.textContent = atual.categoria;
  pergunta.textContent = atual.texto;
  opcoes.innerHTML = "";
  retorno.textContent = "";
  retorno.className = "retorno";
  botaoProxima.classList.add("escondido");
  barra.style.width = `${(indice / perguntas.length) * 100}%`;
  progresso.setAttribute("aria-valuenow", indice);

  atual.opcoes.forEach((texto, numero) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.textContent = `${String.fromCharCode(65 + numero)}) ${texto}`;
    botao.type = "button";
    botao.addEventListener("click", () => verificarResposta(numero, botao));
    opcoes.appendChild(botao);
  });
}

function verificarResposta(escolha, botaoEscolhido) {
  if (respondida) return;
  respondida = true;
  const atual = perguntas[indice];
  const botoes = [...opcoes.querySelectorAll("button")];
  botoes.forEach((botao, numero) => {
    botao.disabled = true;
    if (numero === atual.correta) botao.classList.add("certa");
  });

  if (escolha === atual.correta) {
    pontos += 10;
    pontuacao.textContent = pontos;
    retorno.textContent = `Muito bem! 🎉 ${atual.explicacao}`;
    retorno.classList.add("correto");
  } else {
    botaoEscolhido.classList.add("errada");
    retorno.textContent = `Quase! 💪 ${atual.explicacao}`;
    retorno.classList.add("incorreto");
  }
  barra.style.width = `${((indice + 1) / perguntas.length) * 100}%`;
  progresso.setAttribute("aria-valuenow", indice + 1);
  botaoProxima.textContent = indice === perguntas.length - 1 ? "Ver resultado 🏆" : "Próxima pergunta ➜";
  botaoProxima.classList.remove("escondido");
}

function mostrarResultado() {
  document.getElementById("pontuacao-final").textContent = pontos;
  const saudacao = nome ? `${nome}, ` : "";
  let mensagem;
  if (pontos === 100) mensagem = `${saudacao}incrível! Você acertou todas as perguntas!`;
  else if (pontos >= 70) mensagem = `${saudacao}muito bom! Você está mandando bem em matemática.`;
  else if (pontos >= 40) mensagem = `${saudacao}bom esforço! Continue praticando para aprender ainda mais.`;
  else mensagem = `${saudacao}não desista! Cada tentativa é uma oportunidade de aprender.`;
  document.getElementById("mensagem-final").textContent = mensagem;
  document.getElementById("detalhes-final").textContent = `Você acertou ${pontos / 10} de ${perguntas.length} perguntas.`;
  mostrarTela("resultado");
}

document.getElementById("botao-comecar").addEventListener("click", iniciarJogo);
botaoProxima.addEventListener("click", () => {
  if (indice < perguntas.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});
document.getElementById("botao-reiniciar").addEventListener("click", iniciarJogo);
