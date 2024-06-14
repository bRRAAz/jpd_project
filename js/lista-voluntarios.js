document.addEventListener('DOMContentLoaded', async function () {
    let botaoBuscarUsuarios = document.querySelector('.botao-buscar-usuarios');
    let botaoPesquisar = document.querySelector('.botao-pesquisar');
    botaoPesquisar.addEventListener('click', pesquisarUsuarios);
    let entradaPesquisa = document.getElementById('entrada-pesquisa');
    let listaUsuarios = document.getElementById('lista-usuarios');
    let usuarios = [];

    try {
        const resposta = await fetch(`${configuracaoGlobal.URL}/api/usuario`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }

        });
        if (!resposta.ok) {
            throw new Error('Erro na resposta da rede: ' + resposta.statusText);
        }
        let data = await resposta.json()
        usuarios = data
        console.log(usuarios); // Adiciona um console.log para verificar o formato dos dados
        exibirUsuarios(usuarios);
    } catch (erro) {
        console.error('Erro ao buscar os dados: ', erro);
    }

    async function pesquisarUsuarios() {
        try {
            const resposta = await fetch(`${configuracaoGlobal.URL}/api/usuario/pesquisa`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'name': `${entradaPesquisa.value}`
                }

            });
            let data = await resposta.json()
            usuarios = data
            console.log(usuarios); // Adiciona um console.log para verificar o formato dos dados
            exibirUsuarios(usuarios);
        } catch (erro) {
            console.error('Erro ao buscar os dados: ', erro);
        }
        await exibirUsuarios(usuarios);
    }

    function exibirUsuarios(usuarios) {
        listaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            if (usuario.delete == false) {
                let linhaUsuario = criarLinhaUsuario(usuario);
                listaUsuarios.appendChild(linhaUsuario);
            }
        });
    }

    function criarLinhaUsuario(usuario) {
        let tr = document.createElement('tr');

        let nomeTd = document.createElement('td');
        nomeTd.textContent = `${usuario.name}`;
        tr.appendChild(nomeTd);

        let emailTd = document.createElement('td');
        emailTd.textContent = usuario.email;
        tr.appendChild(emailTd);

        let equipeTd = document.createElement('td');
        equipeTd.textContent = usuario.team ? usuario.team : 'Sem dados';
        tr.appendChild(equipeTd);

        let acoesTd = document.createElement('td');

        let botaoEditar = document.createElement('button');
        botaoEditar.className = 'botao-editar';
        botaoEditar.innerHTML = `<i class="fas fa-pencil-alt"></i>`; // Ícone de edição
        botaoEditar.addEventListener('click', () => {
            editarUsuario(usuario.id);
        });
        acoesTd.appendChild(botaoEditar);

        let botaoDeletar = document.createElement('button');
        botaoDeletar.className = 'botao-deletar';
        botaoDeletar.innerHTML = `<i class="fas fa-trash"></i>`; // Ícone de exclusão
        botaoDeletar.addEventListener('click', () => {
            deletarUsuario(usuario.id);
        });
        acoesTd.appendChild(botaoDeletar);

        tr.appendChild(acoesTd);

        return tr;
    }

    async function editarUsuario(id) {
        window.location.href = `editar_cadastro.html?id=${id}`;
    }

    async function deletarUsuario(id) {
        try {
            const resposta = await fetch(`${configuracaoGlobal.URL}/api/usuario/delete`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'id': `${id}`
            }})
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            alert('Usuário excluído com sucesso.');
            // Remova o usuário da lista
            usuarios = usuarios.filter(usuario => usuario.id !== id);
            exibirUsuarios(usuarios);
        } catch (erro) {
            console.error('Erro ao excluir o usuário: ', erro);
            alert('Erro ao excluir o usuário.');
        }
    }

    // Evento de clique para o botão de busca de usuários
    botaoBuscarUsuarios.addEventListener('click', buscarUsuarios);

    // Evento de clique para o botão de pesquisa
    // Função para preencher os campos do formulário de edição com os dados do usuário
    async function preencherFormulario(usuario) {
        document.getElementById('campo-nome').value = `${usuario.first_name} ${usuario.last_name}`;
        document.getElementById('campo-email').value = usuario.email;
        document.getElementById('campo-equipe').value = usuario.equipe || '';
    }

    // Função para carregar os dados do usuário ao abrir a página de edição
    async function carregarUsuario(id) {
        try {
            let resposta = await fetch(`https://reqres.in/api/users?page=2${id}`);
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let usuario = await resposta.json();
            preencherFormulario(usuario);
        } catch (erro) {
            console.error('Erro ao carregar os dados do usuário: ', erro);
        }
    }

    // Verifica se há um ID de usuário na URL e carrega seus dados
    if (userId) {
        carregarUsuario(userId);
    }
});
