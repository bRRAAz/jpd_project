document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('form');
  const emailInput = document.getElementById('campo-usuario');
  const passwordInput = document.getElementById('campo-senha');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('senha-error');
  const generalError = document.getElementById('error-campos');
  
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    let email = emailInput.value;
    let password = passwordInput.value;


    let emailHasError = false;
    let passwordHasError = false;

    // Validação do campo de email
    if (!email) {
      displayError(generalError, 'Informe os seus dados');
      return;
    } 

    // Validação do campo de senha
    if (!password) {
      if (!emailHasError) {
        displayError(generalError, 'Informe os seus dados');
      }
      return;
    } else if (password.length < 6) {
      displayError(passwordError, 'Senha incorreta');
      passwordHasError = true;
    }

    // Se ambos os campos estiverem errados, exibir mensagem geral de erro
    if (emailHasError && passwordHasError) {
      displayError(generalError, 'Dados incorretos! Digite novamente!');
      return;
    }

    // Se houver qualquer erro, não fazer o post
    if (emailHasError || passwordHasError) {
      return;
    }

    try {
      const response = await fetch(`${configuracaoGlobal.URL}/api/usuario/signin`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      let data = await response;
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro no login.');
      }else{
        window.location.href = "bemVindo.html";

      }

      console.log('Login realizado com sucesso:', data);

      // Limpar os campos após um login bem-sucedido
      emailInput.value = '';
      passwordInput.value = '';

      // Lógica para redirecionar o usuário ou exibir uma mensagem de sucesso

    } catch (error) {
      
      // Exibir mensagem de erro genérica
      displayError(emailError, 'Dados incorretos! Por favor, verifique os dados corretamente.');
    }
  });

  // Função para validar email
  function isValidEmail(email) {
    // Utilizando uma expressão regular para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Função para exibir mensagem de erro
  function displayError(element, message) {
    element.innerText = message;
    element.style.display = 'block';
  }
})