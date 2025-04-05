const saldoElement = document.querySelector("#saldo");
const valorElement = document.querySelector("#valor");
const titulo = document.querySelector("#titulo");
const formularios = document.querySelector("#formularios");
const historico = document.querySelector("#historico");
const botaoAdicionar = document.querySelector("#adicionar")
    
let saldoAtual = parseFloat(saldoElement.textContent) || 0;
    
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    atualizar();
});

formularios.addEventListener("submit", function(event) {    
    event.preventDefault();});
    
valorElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        botaoAdicionar.click();
    }
});


function atualizar() {
    const valor = parseFloat(valorElement.value) || 0;
    
    if (isNaN(valor) || valor === 0) {
        alert("Por favor, insira um valor válido!");
        return;
    }
    
    // Atualiza o saldo
    saldoAtual += valor;
    saldoElement.textContent = saldoAtual.toFixed(2);
    
    // Criar um novo item no histórico
    const taskTitle = titulo.value.trim() || "Nova Tarefa";
    
    const newTask = document.createElement("div");
    newTask.innerHTML = `
        <p>${taskTitle}</p>
        <p>R$ ${valor.toFixed(2)}</p>`;

    // Botão de remover

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "✖";
    botaoRemover.classList.add("remover")

    botaoRemover.addEventListener("click", function() {
        remover(newTask, valor);
    });

    function remover(newTask, valor) {
        saldoAtual -= valor;
        saldoElement.textContent = saldoAtual.toFixed(2); // Atualiza o saldo 
        newTask.remove();
        
        salvarDados(); // Atualiza o armazenamento local
    }


    
    
    newTask.appendChild(botaoRemover);
    historico.appendChild(newTask);

    salvarDados();
    
    // Limpar os campos
    titulo.value = "";
    valorElement.value = "";
    }


function salvarDados() {
    const historicoArray = [];
        
    // Pegar todas as entradas do histórico
    document.querySelectorAll("#historico div").forEach(item => {
        historicoArray.push(item.innerHTML);
    });
    
    // Salvar no LocalStorage
    localStorage.setItem("saldo", saldoAtual);
    localStorage.setItem("historico", JSON.stringify(historicoArray));
}

function carregarDados() {
    const saldoSalvo = localStorage.getItem("saldo");
    const historicoSalvo = localStorage.getItem("historico");

    if (saldoSalvo !== null) {
        saldoAtual = parseFloat(saldoSalvo);
        saldoElement.textContent = saldoAtual.toFixed(2);
    }

    if (historicoSalvo !== null) {
        const historicoArray = JSON.parse(historicoSalvo);
        historicoArray.forEach(itemHTML => {
            const newTask = document.createElement("div");
            newTask.innerHTML = itemHTML;
            historico.appendChild(newTask);
        });
    }
}

// Carregar os dados ao iniciar a página
carregarDados();

