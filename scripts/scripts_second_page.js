const script_do_google = 'https://script.google.com/macros/s/AKfycbwm9viY92lLB-m8HPFCHIte5c8TpwILM6AUGIzuMMjfoV2nqTs__5uJIv_jKClC_43L/exec';
const dados_do_formulario = document.forms['confirmarPresencaForm'];

dados_do_formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Criar um novo FormData para armazenar todos os campos do formulário
  var formData = new FormData();

  // Adicionar os campos dos novos elementos dinâmicos
  var novosCampos = document.querySelectorAll('.pessoa input[type="text"], .pessoa select');
  novosCampos.forEach(function(campo) {
    formData.append(campo.name, campo.value); // Adiciona nome e confirmação ao FormData
  });

  // Adicionar dados do checkbox e da idade da criança, se aplicável
  var acompanhado = document.getElementById("acompanhado").checked;
  var nomeCrianca = document.getElementById("nome_crianca").value;
  if (acompanhado) {
    var idadeCrianca = document.getElementById("idade").value;
    formData.append("acompanhado", "Sim");
    formData.append("idade", idadeCrianca);
    console.log('nomeCrianca: ', nomeCrianca)
    formData.append("nome_crianca", nomeCrianca); // Adiciona o nome da criança ao FormData
  } else {
    formData.append("acompanhado", "Não");
    formData.append("idade", ""); // Adiciona uma string vazia para a idade se não houver criança
    formData.append("nome_crianca", ""); // Adiciona uma string vazia para o nome da criança se não houver criança
  }

  mostrarLoading(); // Mostrar o loading antes de enviar os dados

  fetch(script_do_google, {method: 'POST', body: formData})
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.');
      }
      window.location.href = 'index_third.html';  
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


function submitForm() {
  document.getElementById("enviar").style.display = "none";
  document.getElementById("loading").style.display = "block";
}

function showIdadeCrianca() {
  var checkBox = document.getElementById("acompanhado");
  var idadeCriancaDiv = document.getElementById("idade-crianca");
  if (checkBox.checked == true) {
    idadeCriancaDiv.style.display = "block"; // Exibe o campo de seleção de idade
  } else {
    idadeCriancaDiv.style.display = "none"; // Oculta o campo de seleção de idade
  }
}
