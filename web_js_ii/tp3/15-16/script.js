// @ts-check

// @raggesilver/not-jquery é um pacote criado por mim, que adiciona
// funcionalidades inspiradas pelo jQuery e por frameworks reativas como o
// Vue.js.
import { $ } from "./not-jquery.js";

/**
 * @typedef {{
 *  id: string;
 *  descricao: string;
 *  concluido: boolean;
 *  prioridade: "baixa" | "media" | "alta";
 *  }} Tarefa
 */

const listElement = /** @type {HTMLUListElement} */ (
  document.querySelector("#task-list")
);

/**
 * @param {Tarefa} tarefa
 * @returns {HTMLLIElement}
 */
const renderListItem = (tarefa) => {
  const li = document.createElement("li");
  li.id = tarefa.id;
  li.style.fontFamily = "monospace";

  const span = document.createElement("span");
  span.textContent = `[${tarefa.prioridade.padStart(5, " ")}] ${tarefa.descricao} ${tarefa.concluido ? "✅" : ""}`;
  li.appendChild(span);

  if (!tarefa.concluido) {
    const select = document.createElement("select");
    select.name = "prioridade";
    select.innerHTML = `
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      `;
    select.value = tarefa.prioridade;
    select.onchange = () => {
      editarTarefa(tarefa.id, {
        prioridade: /** @type {Tarefa["prioridade"]} */ (select.value),
      });
    };
    li.appendChild(select);

    const doneButton = document.createElement("button");
    doneButton.textContent = "Concluir";
    doneButton.onclick = () => {
      editarTarefa(tarefa.id, { concluido: true });
    };
    li.appendChild(doneButton);
  }

  const button = document.createElement("button");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  button.title = "Remover tarefa";

  button.onclick = () => {
    removerTarefa(tarefa.id);
  };

  li.appendChild(button);

  return li;
};

// Esse é o array de tarefas mencionado no enunciado do trabalho. A única
// diferença dele para um array comum é que as funções push, unshift, splice e
// pop foram modificadas para atualizar o DOM automaticamente. Essa atualização
// é feita através de um callback que é chamado sempre que o array é modificado.
const tarefas = $.reactiveList(
  // Primeiro passamos o elemento do DOM onde os elementos serão inseridos
  listElement,
  // Em seguida passamos o nome de um campo que será usado como identificador
  // único para cada elemento (ele deve existir em cada objeto do array)
  "id",
  // Por fim, passamos uma função que será chamada sempre que o array for
  // modificado. Essa função deve retornar um elemento do DOM que será inserido
  // na lista de tarefas.
  renderListItem,
  // Podemos também passar um array inicial de tarefas
  [
    {
      id: "260441ee-accc-4661-a98c-17327573eafc",
      descricao: "Fazer o TP de JS II",
      concluido: false,
      prioridade: "alta",
    },
    {
      id: "31443a6d-7bea-42a6-9e9c-81ccd6d443d7",
      descricao: "Fazer o TP de Interatividade",
      concluido: true,
      prioridade: "media",
    },
    {
      id: "55a879b9-2fbc-4044-8f4f-d70c03b67715",
      descricao: "Fazer o trabalho de BD",
      concluido: false,
      prioridade: "baixa",
    },
  ],
);

/**
 * @param {string} descricao
 * @param {"baixa" | "media" | "alta"} [prioridade]
 * @returns {Tarefa}
 */
const adicionarTarefa = (descricao, prioridade = "media") => {
  const tarefa = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36)}`,
    descricao,
    concluido: false,
    prioridade,
  };

  tarefas.push(tarefa);
  return tarefa;
};

/**
 * Editar tarefa.
 *
 * @param {string} id
 * @param {Partial<Omit<Tarefa, "id">>} data
 * @returns {Tarefa | null}
 */
const editarTarefa = (id, data) => {
  const taskIndex = tarefas.findIndex((t) => t.id === id);
  if (taskIndex === -1) return null;

  tarefas.splice(taskIndex, 1, { ...tarefas[taskIndex], ...data });
  return tarefas[taskIndex];
};

/**
 * Remover tarefa.
 *
 * @param {string} id
 * @returns {boolean}
 */
const removerTarefa = (id) => {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tarefas.splice(index, 1);
  return true;
};

/**
 * Filtrar tarefas por prioridade.
 *
 * @param {Tarefa["prioridade"]} prioridade
 * @returns {Tarefa[]}
 */
const filtrarTarefas = (prioridade) => {
  return tarefas.filter((t) => t.prioridade === prioridade);
};

const gerarRelatorio = () => {
  tarefas.forEach((tarefa) => {
    console.log(
      `[${tarefa.prioridade}] ${tarefa.descricao} ${tarefa.concluido ? "✅" : ""}`,
    );
  });
};

gerarRelatorio();

console.log(filtrarTarefas("alta"));

// UI Code

/**
 * @param {SubmitEvent} event
 */
export const onCreateTask = (event) => {
  event.preventDefault();
  if (!(event.target instanceof HTMLFormElement)) return;

  const form = event.target;

  const { prioridade, descricao } =
    /** @type {Pick<Tarefa, "descricao" | "prioridade">} */ (
      Object.fromEntries(new FormData(form).entries())
    );

  adicionarTarefa(descricao, prioridade);
  form.reset();
};
