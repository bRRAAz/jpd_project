document.addEventListener('DOMContentLoaded', async function() {
    // Obtém o parâmetro ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    if (usuarioId) {
        try {
            // Faz uma requisição para obter os dados do usuário pelo ID
            const resposta = await fetch(`${configuracaoGlobal.URL}/api/usuario/id`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'id':`${usuarioId}`
                }
    
            });
            
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let usuario = await resposta.json();
            console.log(usuario)
            // Preenche os campos do formulário com os dados do usuário
            document.getElementById('campo-nome').value = usuario.name || '';
            document.getElementById('campo-email').value = usuario.email || '';
            document.getElementById('campo-telefone-principal').value = usuario.tel || '';
            document.getElementById('campo-data-nascimento').value = usuario.dateBirth || '';
            document.getElementById('campo-nome-social').value = usuario.socialName || '';
            document.getElementById('campo-genero').value = usuario.gender || '';
            document.getElementById('campo-pronome').value = usuario.pronome || '';
            document.getElementById('campo-telefone-emergencial').value = usuario.emergencyTel || '';
            document.getElementById('campo-data-ingressao').value = usuario.entryDate || '';
            document.getElementById('campo-equipe').value = usuario.team || '';
            document.getElementById('campo-numero-acoes').value = usuario.numberOfAction || '0';
            document.getElementById('campo-membro-sim').checked = usuario.setorMember;
            document.getElementById('campo-membro-nao').checked = usuario.setorMember == false;
            document.getElementById('campo-coordenador-sim').checked = usuario.coordinator;
            document.getElementById('campo-coordenador-nao').checked = usuario.coordinator == false;
            document.getElementById('campo-setor').value = usuario.setor || '';
            if(usuario.setorMember == true){
                document.getElementById('campo-setor').disabled = false
            }
            document.getElementById('campo-coordenador-setor').value = usuario.coordinatorSetor || '';
            if(usuario.coordinator == true){
                document.getElementById('campo-coordenador-setor').disabled = false
            }
        } catch (erro) {
                console.error('Erro ao buscar os dados: ', erro);
        }
    }
});

// Função para enviar os dados do formulário ao clicar no botão "Atualizar"
async function editarVoluntario() {// Impede o envio do formulário por padrão
    // Obtém o parâmetro ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    // Coleta os dados do formulário
    const formData = {
        name: document.getElementById('campo-nome').value,
        socialName: document.getElementById('campo-nome-social').value,
        gender: document.getElementById('campo-genero').value,
        pronome: document.getElementById('campo-pronome').value,
        dateBirth: document.getElementById('campo-data-nascimento').value,
        email: document.getElementById('campo-email').value,
        tel: document.getElementById('campo-telefone-principal').value,
        emergencyTel: document.getElementById('campo-telefone-emergencial').value,
        entryDate: document.getElementById('campo-data-ingressao').value,
        team: document.getElementById('campo-equipe').value,
        numberOfAction: document.getElementById('campo-numero-acoes').value,
        setorMember: document.querySelector('input[name="membro_setor"]:checked').value == 'sim'?true:false,
        coordinator: document.querySelector('input[name="coordenador"]:checked').value == 'sim'?true:false,
        setor: document.getElementById('campo-setor').value,
        coordinatorSetor: document.getElementById('campo-coordenador-setor').value
    };

    try {
        // Envia os dados para a API
        const resposta = await fetch(`${configuracaoGlobal.URL}/api/usuario/id`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'Content-type':'application/json',
                'id':`${usuarioId}`
            },
            body: JSON.stringify(formData)
        });

        if (!resposta.ok) {
            throw new Error('Erro na resposta da rede: ' + resposta.statusText);
        }

        let resultado = await resposta.json();
        console.log('Dados atualizados com sucesso:', resultado);
        window.alert('Usuário atualizado com sucesso!')
        // Aqui você pode adicionar qualquer ação após o sucesso, como redirecionar o usuário ou mostrar uma mensagem de sucesso

    } catch (erro) {
        console.error('Erro ao enviar os dados:', erro);
        window.alert('Email já existente')
    }
    
}


