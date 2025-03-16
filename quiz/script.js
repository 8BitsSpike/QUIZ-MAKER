function listagem() {
  let listaQuiz = document.getElementById('listaQiz');
  const coleta = localStorage.getItem('listaQiz');
  const lista = coleta ? JSON.parse(coleta) : 'vazio';
  let texto;
  if (lista == 'vazio') {
    texto = 'Nenhum Quiz até o momento';
  } else {
    let arraylista = lista['quizes'];
    for (let k = 0; k < arraylista.length; k++) {
      let obj = arraylista[k];
      let titulo = obj.titulo;
      texto += '<div class="tituloQuiz">' + titulo + '</div><br>';
    }
  }
  listaQuiz.innerHTML = '<div class="boxLista">' + texto + '</div>';
}

function criar() {
  let destino = document.getElementById('areaCriacao1');
  let conteudo =
    '<div class="alinhaH alinhaV"><div class="formularioQuiz alinhaV"><form><div id="perg1"><label for="titu">Titulo do Quiz:</label><input type="text" id="titu" nome="titu" size="74" required><br><br><label for="enuncia">1° Questão apresentada pelo Quiz:</label><br><input type="text" id="enuncia" nome="enuncia" size="90" required><br><br><label for="resp">1° resposta:</label><br><input type="text" id="resp" nome="resp" size="90" required><br><label for="resp1">2° resposta:</label><br><input type="text" id="resp1" nome="resp1" size="90" required><br><div id="respExtra"></div><br><button type="button" id="btnMaisResp" onclick="maisOpc('perg1')">+ respostas</button><br><br><label for="correto">Resposta correta:</label><br><input type="number" id="correto" nome="correto" size="3" maxlength="2" required><br></div><div id="pergExtas"></div><br><br><button type="button" id="btnMaisPerg" onclick="maisperg()">+ respostas</button><br><br></form></div><div class="espacinho"><button type="button" class="btnS" id="btnSalvar" onclick="salvar()">Salvar</button><button type="button" class="btnC" id="btnCancelar" onclick="cancelar()">Cancelar</button></div></div>';
  destino.innerHTML = conteudo;
}

function salvar() {
  let areaCriacao = document.getElementById('areaCriacao1');
  let retornoAoNormal =
    '<button type="button" id="btnCriar" onclick="criar()">Criar Novo Quiz?</button>';
  areaCriacao.innerHTML = retornoAoNormal;
}

function cancelar() {
  let areaCriacao = document.getElementById('areaCriacao1');
  let retornoAoNormal =
    '<button type="button" id="btnCriar" onclick="criar()">Criar Novo Quiz?</button>';
  areaCriacao.innerHTML = retornoAoNormal;
}

function maisperg() {

}

function maisOpc(lugar) {
  const parent = document.getElementById(lugar);
  const area = parent.querySelector('respExtra');
  let filhotes = area.childElementCount;
  let arrayResposta = [];
  for (let k = 0; k < filhotes; k++) {
    let filhoteAtual = 'resp' + k + 2;
    let coleira = area.querySelector(filhoteAtual).value;
    arrayResposta.push(coleira);
  }
  let nome = 'resp' + filhotes + 2;
  let posi = filhotes + 3 + '° resposta:';
  let conteudo =
    '<div><label for="' +
    nome +
    '">' +
    posi +
    '</label><br><input type="text" id="' +
    nome +
    '" nome="' +
    nome +
    '" size="90" required><br></div>';
  area.innerHTML += conteudo;
  for (let i = 0; i < filhotes; i++) {
    let filhoteAtual = 'resp' + i + 2;
    let coleira = area.querySelector(filhoteAtual);
    coleira.value = arrayResposta[i];
  }
}
