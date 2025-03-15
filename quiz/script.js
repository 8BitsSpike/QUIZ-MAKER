function listagem() {
  let listaQuiz = document.getElementById("listaQiz");
  const coleta = localStorage.getItem("listaQiz");
  const lista = coleta ? JSON.parse(coleta) : "vazio";
  let texto;
  if (lista == "vazio") {
    texto = "Nenhum Quiz até o momento";
  } else {
    let arraylista = lista["quizes"];
    for (let k = 0; k < arraylista.length; k++) {
      let obj = arraylista[k];
      let titulo = obj.titulo;
      texto += '<div class="tituloQuiz">' + titulo + '"</div><br>';
    }
  }
  listaQuiz.innerHTML = '<div class="boxLista">' + texto + '"</div>';
}

function criar(endereco) {}
