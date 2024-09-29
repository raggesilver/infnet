/**
 * Classe que representa um jogador.
 */
class Jogador {
  /**
   * Cria um novo jogador.
   * @param {string} nome - O nome do jogador.
   * @param {string} posicao - A posição do jogador.
   */
  constructor(nome, posicao) {
    this.nome = nome;
    this.posicao = posicao;
  }
}

/**
 * Classe que representa um técnico.
 */
class Tecnico {
  /**
   * Cria um novo técnico.
   * @param {string} nome - O nome do técnico.
   * @param {number} experiencia - Anos de experiência do técnico.
   */
  constructor(nome, experiencia) {
    this.nome = nome;
    this.experiencia = experiencia; // em anos
  }
}

/**
 * Classe que representa um time.
 */
class Time {
  /**
   * Cria um novo time.
   * @param {string} nome - O nome do time.
   * @param {Tecnico} tecnico - O técnico do time.
   */
  constructor(nome, tecnico) {
    /** @type {string} */
    this.nome = nome;
    /** @type {Tecnico} */
    this.tecnico = tecnico; // Um para um
    /** @type {Jogador[]} */
    this.jogadores = []; // Um para muitos
  }

  /**
   * Adiciona um jogador ao time.
   * @param {Jogador} jogador - O jogador a ser adicionado.
   */
  adicionarJogador(jogador) {
    this.jogadores.push(jogador);
  }

  /**
   * Remove um jogador específico do time.
   * @param {string} nomeJogador - O nome do jogador a ser removido.
   */
  removerJogador(nomeJogador) {
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.nome !== nomeJogador,
    );
  }

  /**
   * Altera o nome do time.
   * @param {string} novoNome - O novo nome do time.
   */
  alterarNome(novoNome) {
    this.nome = novoNome;
  }
}

/** @type {Time[]} */
// Coleção externa de times
const times = [];

/**
 * Cria um novo time e o adiciona à coleção de times.
 * @param {string} nomeTime - O nome do time.
 * @param {string} nomeTecnico - O nome do técnico.
 * @param {number} experienciaTecnico - Anos de experiência do técnico.
 * @returns {Time} - O time criado.
 */
function criarTime(nomeTime, nomeTecnico, experienciaTecnico) {
  const tecnico = new Tecnico(nomeTecnico, experienciaTecnico);
  const time = new Time(nomeTime, tecnico);
  times.push(time);
  return time;
}

/**
 * Exibe todos os times cadastrados.
 */
function exibirTimes() {
  times.forEach((time) => {
    console.log(`Time: ${time.nome}`);
    console.log(
      `Técnico: ${time.tecnico.nome} (${time.tecnico.experiencia} anos de experiência)`,
    );
    console.log("Jogadores:");
    time.jogadores.forEach((jogador) => {
      console.log(`- ${jogador.nome} (${jogador.posicao})`);
    });
    console.log("----------------------------");
  });
}

/**
 * Função para cadastrar times e jogadores através de interação com o usuário.
 */
function cadastrarTimes() {
  /** @type {boolean} */
  let continuar = true;

  while (continuar) {
    // Entrada de dados do time
    /** @type {string} */
    const nomeTime = prompt("Nome do Time:");
    /** @type {string} */
    const nomeTecnico = prompt("Nome do Técnico:");
    /** @type {number} */
    const experienciaTecnico = parseInt(
      prompt("Anos de experiência do Técnico:"),
    );
    const time = criarTime(nomeTime, nomeTecnico, experienciaTecnico);

    /** @type {boolean} */
    let adicionarJogadores = true;
    while (adicionarJogadores) {
      // Entrada de dados do jogador
      /** @type {string} */
      const nomeJogador = prompt("Nome do Jogador:");
      /** @type {string} */
      const posicaoJogador = prompt("Posição do Jogador:");
      const jogador = new Jogador(nomeJogador, posicaoJogador);
      time.adicionarJogador(jogador);

      adicionarJogadores = confirm(
        "Deseja adicionar mais jogadores a este time?",
      );
    }

    continuar = confirm("Deseja cadastrar mais times?");
  }
}

/**
 * Gera um relatório detalhado dos times, técnicos e jogadores.
 */
function gerarRelatorioDetalhado() {
  times.forEach((time) => {
    /** @type {string} */
    const detalhesJogadores = time.jogadores
      .map((jogador) => {
        return `Jogador: ${jogador.nome.toUpperCase()} - Posição: ${jogador.posicao.toLowerCase()}`;
      })
      .join("\n");

    /** @type {string} */
    const relatorio = `
Time: ${time.nome}
Técnico: ${time.tecnico.nome} (${time.tecnico.experiencia} anos de experiência)
Jogadores:
${detalhesJogadores}
----------------------------
`;

    console.log(relatorio);
  });
}

/**
 * Calcula e exibe a média de experiência dos técnicos.
 */
function calcularMediaExperienciaTecnicos() {
  /** @type {number} */
  const totalExperiencia = times.reduce(
    (total, time) => total + time.tecnico.experiencia,
    0,
  );
  /** @type {number} */
  const mediaExperiencia = totalExperiencia / times.length;
  console.log(
    `Média de experiência dos técnicos: ${Math.round(mediaExperiencia)} anos`,
  );
}

/**
 * Retorna uma coleção com totalizadores de cada time.
 * @returns {{nomeTime: string, totalJogadores: number, experienciaTecnico: number}[]}
 */
const totalizadores = () =>
  times.map((time) => ({
    nomeTime: time.nome,
    totalJogadores: time.jogadores.length,
    experienciaTecnico: time.tecnico.experiencia,
  }));

/**
 * Retorna uma coleção de times com mais de cinco jogadores.
 * @returns {Time[]}
 */
const timesComMaisDeCincoJogadores = () =>
  times.filter((time) => time.jogadores.length > 5);

/**
 * Verifica se existe algum técnico com mais de 20 anos de experiência.
 * @returns {boolean}
 */
const existeTecnicoExperiente = () =>
  times.some((time) => time.tecnico.experiencia > 20);

cadastrarTimes();

gerarRelatorioDetalhado();
calcularMediaExperienciaTecnicos();

console.log(totalizadores());
console.log(timesComMaisDeCincoJogadores());
console.log(existeTecnicoExperiente());
