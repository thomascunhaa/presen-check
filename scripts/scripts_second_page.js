const scrip_do_google = 'https://script.google.com/macros/s/AKfycbxJTE7mCPXFJ7bUeZVRHv09rRmHqxdaRRQvRDIPt0EfwN953m-GZnes3p-FRPeTaq0/exec';
const dados_do_formulario = document.forms['confirmarPresencaForm'];

dados_do_formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Criar um novo FormData para armazenar todos os campos do formulário
  var formData = new FormData();


  // Adicionar os campos dos novos elementos dinâmicos
  var novosCampos = document.querySelectorAll('.pessoa input[type="text"], .pessoa select');
  novosCampos.forEach(function(campo) {
    formData.append(campo.name, campo.value);
  });

  mostrarLoading(); // Mostrar o loading antes de enviar os dados

  fetch(scrip_do_google, {method: 'POST', mode: 'no-cors', body: formData})
    .then(response => {
      if (!response.ok) {
        window.location.href = 'index_third.html';  
        throw new Error('Erro ao enviar os dados.');
      }
      alert('Dados enviados com sucesso!');
      dados_do_formulario.reset();
      // Redireciona para outra página HTML
    })
    .catch(error => console.error(error))
    .finally(() => {
      esconderLoading(); // Esconder o loading após o envio dos dados
    });
});

function mostrarLoading() {
  document.getElementById('loading').style.display = 'block';
}

function esconderLoading() {
  document.getElementById('loading').style.display = 'none';
}

