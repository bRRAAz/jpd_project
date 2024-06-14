document.addEventListener('DOMContentLoaded', async (event) => {
    let contatosBody = document.getElementById('contatosBody');
    let botaoCriarAcao = document.querySelector('.mt-5');
    let descricaoAcao = document.querySelector('#entrada-acao')
    let usuarios = [];
    let usuariosSelecionados = [];
    try {
        const response = await fetch(`${configuracaoGlobal.URL}/api/usuario`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        let data = await response.json()
        usuarios = data
        exibirUsuarios(usuarios);

    } catch (error) {

        console.log(error)
    }
    function exibirUsuarios(usuarios) {
        if (!contatosBody) {
            console.error('Elemento contatosBody não encontrado');
            return;
        }
        contatosBody.innerHTML = '';
        usuarios.forEach(usuario => {
            if (usuario.delete == false) {
                let linhaUsuario = criarLinhaUsuario(usuario);
                contatosBody.appendChild(linhaUsuario);
            }
        });
    }
    function criarLinhaUsuario(usuario) {
        let tr = document.createElement('tr');

        let selecionarTd = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'usuario-checkbox';
        checkbox.value = usuario.id;
        checkbox.disabled = false;  // Inicialmente desabilitado
        selecionarTd.appendChild(checkbox);
        tr.appendChild(selecionarTd);

        let nomeTd = document.createElement('td');
        nomeTd.textContent = usuario.name;
        tr.appendChild(nomeTd);

        let emailTd = document.createElement('td');
        emailTd.textContent = usuario.email;
        tr.appendChild(emailTd);

        let telefoneTd = document.createElement('td');
        telefoneTd.textContent = usuario.tel ? usuario.tel : 'N/A';
        tr.appendChild(telefoneTd);

        let equipeTd = document.createElement('td');
        equipeTd.textContent = usuario.team ? usuario.team : 'N/A';
        tr.appendChild(equipeTd);

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                usuariosSelecionados.push(usuario.id);
                console.log(usuariosSelecionados)
            } else {
                usuariosSelecionados = usuariosSelecionados.filter(id => id !== usuario.id);
            }
        });

        return tr;
    }

    botaoCriarAcao.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (usuariosSelecionados.length < 1) {
            window.alert('Selecione pelo menos 1 usuário')
        } else {
            let description = descricaoAcao.value
            var bodyJson = JSON.stringify({
                description: description,
                userId: usuariosSelecionados
            })
            try {
                const response = await fetch(`${configuracaoGlobal.URL}/api/acao`, {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyJson
                });
                if (response.ok) {
                    window.alert('Ação cadastrada!')
                    window.location.href = "criar-acoes.html";
                }
            } catch (erros) {
                console.log(error.status);
            }
        }

    });



});
/*document.addEventListener('DOMContentLoaded', function() {
    let botaoBuscarUsuarios = document.querySelector('.botao-buscar-usuarios');
    let botaoCriarAcao = document.querySelector('.botao-acao');
    let botaoEnviarAcoes = document.querySelector('.botao-enviar-acoes');
    let entradaAcao = document.getElementById('entrada-acao');
    let contatosBody = document.getElementById('contatosBody');
    let acoesContainer = document.getElementById('acoesContainer');
    let usuarios = [];
    let acoes = [];
    let usuariosSelecionados = [];

    if (botaoBuscarUsuarios) {
        botaoBuscarUsuarios.addEventListener('click', buscarUsuarios);
    }

    if (botaoCriarAcao) {
        botaoCriarAcao.addEventListener('click', criarAcao);
    }

    if (botaoEnviarAcoes) {
        botaoEnviarAcoes.addEventListener('click', enviarAcoes);
    }

    async function buscarUsuarios() {
        try {
            let resposta = await fetch('https://reqres.in/api/users?page=2');
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let dados = await resposta.json();
            if (Array.isArray(dados.data)) {
                usuarios = dados.data;
                exibirUsuarios(usuarios);
            } else {
                throw new Error('Formato de dados inesperado: Não é um array');
            }
        } catch (erro) {
            console.error('Erro ao buscar os dados: ', erro);
        }
    }

    function exibirUsuarios(usuarios) {
        if (!contatosBody) {
            console.error('Elemento contatosBody não encontrado');
            return;
        }
        contatosBody.innerHTML = '';
        usuarios.forEach(usuario => {
            let linhaUsuario = criarLinhaUsuario(usuario);
            contatosBody.appendChild(linhaUsuario);
        });
    }

    function criarLinhaUsuario(usuario) {
        let tr = document.createElement('tr');

        let selecionarTd = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'usuario-checkbox';
        checkbox.value = usuario.id;
        checkbox.disabled = true;  // Inicialmente desabilitado
        selecionarTd.appendChild(checkbox);
        tr.appendChild(selecionarTd);

        let nomeTd = document.createElement('td');
        nomeTd.textContent = usuario.first_name + ' ' + usuario.last_name;
        tr.appendChild(nomeTd);

        let emailTd = document.createElement('td');
        emailTd.textContent = usuario.email;
        tr.appendChild(emailTd);

        let telefoneTd = document.createElement('td');
        telefoneTd.textContent = usuario.phone ? usuario.phone : 'N/A';
        tr.appendChild(telefoneTd);

        let equipeTd = document.createElement('td');
        equipeTd.textContent = usuario.company ? usuario.company.name : 'N/A';
        tr.appendChild(equipeTd);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                usuariosSelecionados.push(usuario.id);
            } else {
                usuariosSelecionados = usuariosSelecionados.filter(id => id !== usuario.id);
            }
        });

        return tr;
    }

    function criarAcao() {
        let acao = entradaAcao.value.trim();
        if (acao) {
            acoes.push(acao);
            entradaAcao.value = '';
            exibirNomeAcao(acao);
            habilitarCheckboxes();
        } else {
            alert('Por favor, digite uma ação.');
        }
    }

    function exibirNomeAcao(acao) {
        let h5 = document.createElement('h5');
        h5.textContent = acao;
        acoesContainer.appendChild(h5);
    }

    function habilitarCheckboxes() {
        let checkboxes = document.querySelectorAll('.usuario-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
    }

    function enviarAcoes() {
        if (acoes.length === 0) {
            alert('Por favor, crie pelo menos uma ação antes de enviar.');
            return;
        }

        let checkboxes = document.querySelectorAll('.usuario-checkbox:checked');
        if (checkboxes.length === 0) {
            alert('Por favor, selecione pelo menos um usuário.');
            return;
        }

        let dadosAcoes = [];
        checkboxes.forEach(checkbox => {
            let idUsuario = checkbox.value;
            let usuario = usuarios.find(u => u.id == idUsuario);
            dadosAcoes.push({
                idUsuario: idUsuario,
                nome: usuario.first_name + ' ' + usuario.last_name,
                email: usuario.email,
                telefone: usuario.phone ? usuario.phone : 'N/A',
                equipe: usuario.company ? usuario.company.name : 'N/A',
                acoes: acoes
            });
        });

        fetch('https://reqres.in/api/users/acoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ acoes: dadosAcoes })
        })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Erro ao enviar as ações: ' + resposta.statusText);
            }
            return resposta.json();
        })
        .then(dados => {
            alert('Ações enviadas com sucesso!');
            console.log('Dados enviados:', dadosAcoes);
            // Limpar campos editados
            contatosBody.innerHTML = '';
            acoesContainer.innerHTML = '';
            acoes = [];
            usuariosSelecionados = [];
            let checkboxes = document.querySelectorAll('.usuario-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.disabled = true;
                checkbox.checked = false;
            });
        })
        .catch(erro => {
            console.error('Erro ao enviar as ações: ', erro);
        });
    }
});
*/