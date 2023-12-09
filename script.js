const formularioTarefa = document.getElementById('formularioTarefa');
const inputTarefa = document.getElementById('inputTarefa');
const listaTarefas = document.getElementById('listaTarefas');

// Recupera a lista de tarefas do LocalStorage, se existir
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função para renderizar a lista de tarefas
function renderizarTarefas() {
  listaTarefas.innerHTML = '';
  tarefas.forEach(function(tarefa, index) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="textoTarefa">${tarefa}</span>
      <button class="botaoEditar" data-index="${index}">Editar</button>
      <button class="botaoExcluir" data-index="${index}">Excluir</button>
    `;
    listaTarefas.appendChild(listItem);
  });

  // Adicionar eventos para os botões de editar e excluir tarefa
  const botoesEditar = document.querySelectorAll('.botaoEditar');
  botoesEditar.forEach(function(botao) {
    botao.addEventListener('click', function(event) {
      const index = event.target.getAttribute('data-index');
      const elementoTextoTarefa = event.target.parentElement.querySelector('.textoTarefa');
      const novoTextoTarefa = prompt('Editar tarefa:', tarefas[index]);
      if (novoTextoTarefa !== null) {
        tarefas[index] = novoTextoTarefa.trim();
        salvarTarefasNoLocalStorage();
        elementoTextoTarefa.textContent = novoTextoTarefa;
      }
    });
  });

  const botoesExcluir = document.querySelectorAll('.botaoExcluir');
  botoesExcluir.forEach(function(botao) {
    botao.addEventListener('click', function(event) {
      const index = event.target.getAttribute('data-index');
      tarefas.splice(index, 1);
      salvarTarefasNoLocalStorage();
      renderizarTarefas();
    });
  });
}

// Função para adicionar uma tarefa
function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
  salvarTarefasNoLocalStorage();
  renderizarTarefas();
}

// Função para salvar a lista de tarefas no LocalStorage
function salvarTarefasNoLocalStorage() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Adicionar evento de envio do formulário
formularioTarefa.addEventListener('submit', function(event) {
  event.preventDefault();
  const novaTarefa = inputTarefa.value.trim();
  if (novaTarefa !== '') {
    adicionarTarefa(novaTarefa);
    inputTarefa.value = '';
  }
});

// Renderizar a lista de tarefas inicialmente
renderizarTarefas();
