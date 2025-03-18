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
  let conteudo = `
  <div class="alinhaH alinhaV">
    <div class="formularioQuiz alinhaV">
      <form>
        <div id="pergExtras">
          <div id="perg0">
            <label for="titu">Titulo do Quiz:</label>
            <input type="text" id="titu" name="titu" size="74" required><br><br>

            <label for="enuncia">1° Questão apresentada pelo Quiz:</label><br>
            <input type="text" id="enuncia" name="enuncia" size="90" required><br><br>

            <label for="resp0">1° resposta:</label><br>
            <input type="text" id="resp0" name="resp" size="90" required><br>

            <label for="resp1">2° resposta:</label><br>
            <input type="text" id="resp1" name="resp1" size="90" required><br>

            <div id="respExtra"></div><br>

            <button type="button" id="btnMaisResp" onclick="maisOpc('perg0')">+ respostas</button><br><br>

            <label for="correto">Resposta correta:</label><br>
            <input type="number" id="correto" name="correto" size="3" maxlength="2" required><br><br>
          </div>
        </div><br><br>

        <button type="button" id="btnMaisPerg" onclick="maisperg()">+ perguntas</button><br><br>
      </form>
    </div>

    <div class="espacinho">
      <button type="button" class="btnS" id="btnSalvar" onclick="salvar()">Salvar</button>
      <button type="button" class="btnC" id="btnCancelar" onclick="cancelar()">Cancelar</button>
    </div>
  </div>
`;
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
  let nuperg = document.getElementById('pergExtras').childElementCount;
  let areaperg = document.getElementById('pergExtras');
  let arrayperg = [];
  for (let k = 0; k < nuperg; k++) {
    let idperg = 'perg' + k;
    let pergchild = document.getElementById(idperg);
    if (!pergchild) continue;
    let perg = pergchild.querySelector("[name='enuncia']").value;
    arrayperg.push(perg);
    let er = pergchild.querySelector('#respExtra');
    let ern = er.childElementCount;
    let volresp = ern + 2;
    let quizobj = {};
    for (let i = 0; i < volresp; i++) {
      let respnome = 'resp' + i;
      let respvalor =
        pergchild.querySelector(`[name='${respnome}']`)?.value || '';
      quizobj[respnome] = respvalor;
    }

    let gaba = pergchild.querySelector("[name='correto']").value;
    quizobj['gaba'] = gaba;
    arrayperg.push(quizobj);
  }
  let newperg = 'perg' + nuperg;
  let btnnome = 'btnMaisResp' + nuperg;
  let newQuestionHTML = `
    <div id="${newperg}">
      <label for="enuncia">${
        nuperg + 1
      }° Questão apresentada pelo Quiz:</label><br>
      <input type="text" name="enuncia" size="90" required><br><br>
      <label for="resp0">1° resposta:</label><br>
      <input type="text" name="resp0" size="90" required><br>
      <label for="resp1">2° resposta:</label><br>
      <input type="text" name="resp1" size="90" required><br>
      <div id="respExtra"></div><br>
      <button type="button" id="${btnnome}" onclick="maisOpc('${newperg}')">+ respostas</button><br><br>
      <label for="correto">Resposta correta:</label><br>
      <input type="number" name="correto" size="3" maxlength="2" required><br><br>
    </div>
  `;
  areaperg.insertAdjacentHTML('beforeend', newQuestionHTML);
  for (let j = 0; j < arrayperg.length; j += 2) {
    let idperg = 'perg' + j / 2;
    let pergchild = document.getElementById(idperg);
    if (!pergchild) continue;
    let enunciado = pergchild.querySelector("[name='enuncia']");
    if (enunciado) enunciado.value = arrayperg[j];
    let er = pergchild.querySelector('#respExtra');
    let ern = er.childElementCount;
    let volresp = ern + 2;
    for (let h = 0; h < volresp; h++) {
      let respnome = 'resp' + h;
      let respvalor = pergchild.querySelector(`[name='${respnome}']`);
      if (respvalor) {
        respvalor.value = arrayperg[j + 1][respnome];
      }
    }
    let gaba = pergchild.querySelector("[name='correto']");
    if (gaba) gaba.value = arrayperg[j + 1]['gaba'];
  }
}

function maisOpc(lugar) {
  const parent = document.getElementById(lugar);
  const area = parent.querySelector('#respExtra');
  let filhotes = area.childElementCount;
  let arrayResposta = [];
  for (let k = 0; k < filhotes; k++) {
    let filhoteAtual = `#resp${k + 2}`;
    let coleira = area.querySelector(filhoteAtual);
    if (coleira) arrayResposta.push(coleira.value);
  }
  let nome = `resp${filhotes + 2}`;
  let posi = `${filhotes + 3}° resposta:`;
  let conteudo = `
    <div>
      <label for="${nome}">${posi}</label><br>
      <input type="text" id="${nome}" name="${nome}" size="90" required><br>
    </div>
  `;
  area.insertAdjacentHTML('beforeend', conteudo);
  for (let i = 0; i < filhotes; i++) {
    let filhoteAtual = `#resp${i + 2}`;
    let coleira = area.querySelector(filhoteAtual);
    if (coleira) coleira.value = arrayResposta[i];
  }
}
