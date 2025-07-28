// Seliciona a ul com a lista de clietes
const clientes = document.getElementById("listaClientes");

// Função para adicionar um cliente à lista
function adicionarCliente(cliente) {
    const item = document.createElement("li");
    item.setAttribute("data-id", cliente._id);
    item.innerHTML = `
        Nome:${cliente.nome} - Email:${cliente.email}
        <button class="ali" onclick="update('${cliente._id}')">Atualizar</button>
        <button class="ale" onclick="remove('${cliente._id}')">X</button>
    `;
    clientes.appendChild(item);
}
//
document.getElementById("list").addEventListener("click", function listarClientes() {
    fetch("https://crudcrud.com/api/6eb0549a24894558bb8eeaa626923ca0/cliente")
        .then(resposta => resposta.json())
        .then((listaDeClientes) => {
            clientes.innerHTML = '';
            listaDeClientes.forEach(cliente => {
                adicionarCliente(cliente); // Usar a nova função aqui
            });
        })
        .catch(error => console.error("Erro ao carregar clientes:", error));
});
// Adiciona um ouvinte de evento click no botão "adicionar"
document.getElementById("add").addEventListener("click", () => {
    const nome = document.getElementById("cliente").value.trim();
    const email = document.getElementById("email").value.trim();
    
    // Validação dos campos
    if (!nome) {
        alert("Por favor, digite um nome para o cliente!");
        return;
    }
    
    if (!email) {
        alert("Por favor, digite um email válido para o cliente!");
        return;
    }
    
    // Validação simples de formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Por favor, digite um email válido!");
        return;
    }

    fetch("https://crudcrud.com/api/6eb0549a24894558bb8eeaa626923ca0/cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            nome: nome,
            email: email 
        })
    })
    .then(resposta => resposta.json())
    .then(() => {
        document.getElementById("cliente").value = '';
        document.getElementById("email").value = '';
        alert("Cliente adicionado com sucesso!");
    })
    .catch(error => console.error("Erro ao adicionar cliente:", error));
});

async function remove(clienteId) {
    try {
        const response = await fetch(`https://crudcrud.com/api/6eb0549a24894558bb8eeaa626923ca0/cliente/${clienteId}`, {
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
// Função para atualizar um cliente
async function update(clienteId) {
    const novoNome = prompt("Digite o novo nome do cliente:");
    if (!novoNome || !novoNome.trim()) {
        alert("O nome não pode estar vazio!");
        return;
    }
    
    const novoEmail = prompt("Digite o novo email do cliente:");
    if (!novoEmail || !novoEmail.trim()) {
        alert("O email não pode estar vazio!");
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
        alert("Por favor, digite um email válido!");
        return;
    }

    try {
        const response = await fetch(`https://crudcrud.com/api/6eb0549a24894558bb8eeaa626923ca0/cliente/${clienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                nome: novoNome.trim(),
                email: novoEmail.trim()
            })
        });

        if (!response.ok) throw new Error("Erro ao atualizar cliente");
        document.getElementById("list").click();
        
    } catch (error) {
        console.error("Falha ao atualizar cliente:", error);
        alert("Erro ao atualizar cliente");
    }
}