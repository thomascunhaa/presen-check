function verificarPresenca(event) {
  event.preventDefault(); // Impede o envio do formulário
  
  // Obtém o valor do campo de entrada
  var nome = document.getElementById('nome').value.trim();

  // Armazena o valor do nome em localStorage
  localStorage.setItem('nome', nome);

  // Carrega os dados do arquivo JSON
  fetch('data/presetation_convited.json')
    .then(response => response.json())
    .then(data => {
      // Verifica se o nome está na lista de convidados
      if (data.includes(nome)) {
        window.location.href = "pages/index_second.html";
      } else {
        alert('Desculpe, seu nome não consta na lista de convidados.');
      }
    })
    .catch(error => console.error('Erro ao carregar arquivo JSON:', error));
}
