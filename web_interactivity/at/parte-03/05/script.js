function validar() {
  var nome = document.getElementById("nome").value;
  var rh = document.getElementById("rh").checked;
  var seguranca = document.getElementById("seguranca").checked;
  var cpf = document.getElementById("cpf").value;
  var data = document.getElementById("data").value;
  var endereco = document.getElementById("endereco").value;

  if (nome.length < 3 || nome.length > 10) {
    alert("Nome deve ter entre 3 e 10 caracteres");
    return;
  }

  if (!rh && !seguranca) {
    alert("Selecione pelo menos uma área");
    return;
  }

  if (cpf.replaceAll(/[.-]/g, "").length !== 11) {
    alert("CPF deve ter 11 caracteres " + cpf + " " + cpf.length);
    return;
  }

  if (data.indexOf("/") === -1) {
    alert("Data de agendamento deve ter /");
    return;
  }

  if (endereco.toLowerCase().indexOf("rua") === -1) {
    alert("Endereço deve conter a palavra Rua");
    return;
  }

  alert("Cadastro realizado com sucesso");
}
