document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.mb-5');
    const nomeResponse = document.getElementById('campo-nome');
    const nomeSocialResponse = document.getElementById('campo-nome-social');
    const generoResponse = document.getElementById('campo-genero');
    const pronomeResponse = document.getElementById('campo-pronome');
    const dataResponse = document.getElementById('campo-data-nascimento');
    const emailResponse = document.getElementById('campo-email');
    const telefoneResponse = document.getElementById('campo-telefone-principal');
    const telefoneEmergenciaResponse = document.getElementById('campo-telefone-emergencial');
    const dataIngressaoResponse = document.getElementById('campo-data-ingressao');
    const equipeResponse = document.getElementById('campo-equipe');
    const numeroAcoesResponse = document.getElementById('campo-numero-acoes');
    const SetorResponse = document.getElementById('campo-setor');
    const campoCordenadorSetorResponse = document.getElementById('campo-coordenador-setor')
    const membroSetorResponse = document.getElementById('campo-membro-sim')
    const cordenadorResponse = document.getElementById('campo-coordenador-sim')
    const membroSetorNaoResponse = document.getElementById('campo-membro-nao')
    const cordenadorNaoResponse = document.getElementById('campo-coordenador-nao')
    const senhaResponse = document.getElementById('campo-senha')
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        let name = nomeResponse.value;
        let socialName = nomeSocialResponse.value;
        let pronome = pronomeResponse.value;
        let gender = generoResponse.value;
        let dateBirth = dataResponse.value;
        let email = emailResponse.value;
        let tel = telefoneResponse.value;
        let emergencyTel = telefoneEmergenciaResponse.value;
        let entryDate = dataIngressaoResponse.value;
        let team = equipeResponse.value;
        let numberOfAction = Number(numeroAcoesResponse.value);
        let setor = SetorResponse.value;
        let setorMember = membroSetorResponse.checked;
        let coordinator = cordenadorResponse.checked;
        let coordinatorSetor = campoCordenadorSetorResponse.value;
        let password = senhaResponse.value
        var bodyJson = JSON.stringify({
            name: name,
            password: password,
            socialName: socialName,
            pronome: pronome,
            gender: gender,
            dateBirth: dateBirth,
            email: email,
            tel: tel,
            emergencyTel: emergencyTel,
            entryDate: entryDate,
            team: team,
            numberOfAction: numberOfAction,
            setor: setor,
            setorMember: setorMember,
            coordinator: coordinator,
            coordinatorSetor:coordinatorSetor
        })
        try {
            const response = await fetch(`${configuracaoGlobal.URL}/api/usuario`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyJson
            });

            if (!response.ok) {
                if(response.status === 409){
                    window.alert('Email de usuário já existente, por favor tente com outro email')
                }
            }

            if (response.ok) {
                nomeResponse.value = ''
                nomeSocialResponse.value = ''
                generoResponse.value = ''
                pronomeResponse.value = ''
                dataResponse.value = ''
                emailResponse.value = ''
                telefoneResponse.value = ''
                telefoneEmergenciaResponse.value = ''
                dataIngressaoResponse.value = ''
                equipeResponse.value = ''
                numeroAcoesResponse.value = ''
                SetorResponse.value = ''
                SetorResponse.disabled = true
                campoCordenadorSetorResponse.value = ''
                password.value = ''
                campoCordenadorSetorResponse.disabled = true
                membroSetorResponse.checked = false
                cordenadorResponse.checked = false
                membroSetorNaoResponse.checked = true
                cordenadorNaoResponse.checked = true
                window.alert('Voluntário cadastrado com sucesso!')
            }
            
            // Lógica para redirecionar o usuário ou exibir uma mensagem de sucesso

        } catch (error) {
            console.log(error.status);
        }
    });
})