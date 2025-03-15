function listagem() {
  let listaQuiz = document.getElementById("listaQuiz");
  const coleta = localStorage.getItem("listaQiz");
  const lista = coleta ? JSON.parse(coleta) : {};
  let conteudo;
  if (lista === null) {
    conteudo = '<div class="box_lista">Nenhum Quiz até o momento</div>';
  }

  listaQuiz.innerHTML = conteudo;
}

function criar(endereco) {}
