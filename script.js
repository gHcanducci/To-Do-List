// Script Dark-Mode
let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.getElementById("switch-mode");

// Ativando Dark Mode
const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

// Desativando Dark Mode
const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.removeItem("lightmode");
};
// Condicional para saber se na última vez que o site foi acessado havia sido habilitado o Dark Mode
if (lightmode === "active") enableLightmode();

// Troca de modo através do click e guardando a informação da ativação no localStorage
themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (lightmode !== "active") {
    enableLightmode();
  } else {
    disableLightmode();
  }
});
//
//
//
// Script Sistema do To Do
const button = document.querySelector(".btn-new-task");
const input = document.querySelector(".new-task");
const completeList = document.querySelector(".list-tasks");

let listaDeTarefas = [];

// Adicionando tarefas e excluindo a possibilidade de ter tarefas vazias.
function add_new_task() {
  const task = input.value.trim();
  if (task !== "") {
    listaDeTarefas.push(task);
    input.value = "";
    display_task();
  }
}

// Exibindo tarefas e criando listas de modo individual, utilizando arrays
function display_task() {
  let new_task = "";

  listaDeTarefas.forEach((task, position) => {
    new_task += `
    
        <li>
          <p>${task}</p>
          <button class="btn-ok" onclick="check_task(${position})">
            <img src="img/check-lg.svg" alt="Ok" />
          </button>
        </li>
      `;
  });
  completeList.innerHTML = new_task;

  localStorage.setItem("lista", JSON.stringify(listaDeTarefas));
}

// Guardando as tarefas no localStorage
function tasksRefresh() {
  const localStorageTasks = localStorage.getItem("lista");

  if (localStorageTasks) {
    listaDeTarefas = JSON.parse(localStorageTasks);
  }

  display_task();
}

// Sistema de concluir e deletar tarefas
function check_task(position) {
  listaDeTarefas.splice(position, 1);

  display_task();
}

tasksRefresh();
button.addEventListener("click", add_new_task);
