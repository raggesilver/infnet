// @ts-check

// @raggesilver/not-jquery é um pacote criado por mim, que adiciona
// funcionalidades inspiradas pelo jQuery e por frameworks reativas como o
// Vue.js.
import { $ } from "./not-jquery.js";

/**
 * @typedef {{ id: string; descricao: string; concluido: boolean; }} Tarefa
 */

const listElement = /** @type {HTMLUListElement} */ (
  document.querySelector("#task-list")
);

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
  (/** @type {Tarefa} */ tarefa) => {
    const li = document.createElement("li");
    li.id = tarefa.id;
    li.textContent = `${tarefa.descricao} ${tarefa.concluido ? "✅" : ""}`;

    if (!tarefa.concluido) {
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
  },
  // Podemos também passar um array inicial de tarefas
  [
    {
      id: "260441ee-accc-4661-a98c-17327573eafc",
      descricao: "Fazer o TP de JS II",
      concluido: false,
    },
    {
      id: "31443a6d-7bea-42a6-9e9c-81ccd6d443d7",
      descricao: "Fazer o TP de Interatividade",
      concluido: true,
    },
    {
      id: "55a879b9-2fbc-4044-8f4f-d70c03b67715",
      descricao: "Fazer o trabalho de BD",
      concluido: false,
    },
  ],
);

/**
 * @param {string} descricao
 * @returns {Tarefa}
 */
const adicionarTarefa = (descricao) => {
  const tarefa = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36)}`,
    descricao,
    concluido: false,
  };

  tarefas.push(tarefa);
  return tarefa;
};

/**
 * Editar tarefa.
 *
 * @param {string} id
 * @param {Partial<Pick<Tarefa, "descricao" | "concluido">>} data
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

// UI Code

/**
 * @param {SubmitEvent} event
 */
export const onCreateTask = (event) => {
  event.preventDefault();
  if (!(event.target instanceof HTMLFormElement)) return;

  const form = event.target;

  const data = /** @type {{ task: string }} */ (
    Object.fromEntries(new FormData(form).entries())
  );

  adicionarTarefa(data.task);
  form.reset();
};
