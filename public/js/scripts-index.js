if (location.href.indexOf("delete=true") != -1) {
  alert("Cliente excluído com sucesso!");
} else if (location.href.indexOf("edit=true") != -1) {
  alert("Alterações feitas com sucesso!");
} else if (location.href.indexOf("new=true") != -1) {
  alert("Cliente cadastrado com sucesso!");
} else if (location.href.indexOf("erro") != -1) {
  alert("Ocorreu um erro!");
}
