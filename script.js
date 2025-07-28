// Seliciona a ul com a lista de clietes
const clientes = document.getElementById("listaClientes");

// Função para adicionar um cliente à lista
function adicionarCliente(cliente) {
    const item = document.createElement("li");
    item.setAttribute("data-id", cliente._id);
    item.innerHTML = `${cliente.nome} <button class="ali" onclick="update('${cliente._id}')">Atualizar</button><button class="ale" onclick="remove('${cliente._id}')">X</button>`;
    clientes.appendChild(item);
}
//
document.getElementById("list").addEventListener("click",function listarClientes() {
    fetch("https://crudcrud.com/api/b4538486b8f84c7a88de788b5fd97ec6/cliente")
        .then(resposta => resposta.json())
        .then((listaDeClientes) => {
            // Limpa a lista antes de adicionar os itens
            clientes.innerHTML = '';
            listaDeClientes.forEach(cliente => {
                adicionarCliente(cliente);
            });
        })
        .catch(error => console.error("Erro ao carregar clientes:", error));
})
// Adiciona um ouvinte de evento click no botão "adicionar"
document.getElementById("add").addEventListener("click", () => {
    const nome = document.getElementById("cliente").value;
    if (!nome.trim()) {
        alert("Por favor, digite um nome para o cliente!");
        return;
    }

    fetch("https://crudcrud.com/api/b4538486b8f84c7a88de788b5fd97ec6/cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nome })
    })
    .then(resposta => resposta.json())
    .then(() => {
    // Apenas limpa o campo, não adiciona à lista
    document.getElementById("cliente").value = '';
    alert("Cliente adicionado com sucesso!");
})
    .catch(error => console.error("Erro ao adicionar cliente:", error));
});

async function remove(clienteId) {
    try {
        const response = await fetch(`https://crudcrud.com/api/b4538486b8f84c7a88de788b5fd97ec6/cliente/${clienteId}`, {
            method: "DELETE"
        });
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        // Remove apenas o item deletado do DOM (sem recarregar a página, para não precisar recarregar a lista completa)
        const itemToRemove = document.querySelector(`li[data-id="${clienteId}"]`);
        if (itemToRemove) itemToRemove.remove();
        
    } catch (error) {
        console.error("Falha ao deletar cliente:", error);
        alert("Erro ao remover cliente");
    }
}
// Função para editar o nome de um cliente
async function update(clienteId) {
    const novoNome = prompt("Digite o novo nome do cliente:");
    
    if (!novoNome || !novoNome.trim()) {
        alert("O nome não pode estar vazio!");
        return;
    }

    try {
        const response = await fetch(`https://crudcrud.com/api/b4538486b8f84c7a88de788b5fd97ec6/cliente/${clienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: novoNome.trim() })
        });

        if (!response.ok) throw new Error("Erro ao atualizar cliente");

        // Atualiza a lista completa após a edição
        document.getElementById("list").click();
        
    } catch (error) {
        console.error("Falha ao atualizar cliente:", error);
        alert("Erro ao atualizar cliente");
    }
}