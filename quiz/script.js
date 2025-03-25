function listagem() {
  let listaQuiz = document.getElementById('listaQuiz');
  const coleta = localStorage.getItem('QuizDB');
  const lista = coleta ? JSON.parse(coleta) : 'vazio';
  let texto = '';
  if (lista == 'vazio') {
    texto = 'Nenhum Quiz até o momento';
  } else {
    let arraylista = Object.keys(lista);
    for (let k = 0; k < arraylista.length; k++) {
      let qzno = 'quiz' + k;
      let pergs = lista[qzno];
      let obj = pergs.perg0;
      let titulo = obj.titulo;
      texto += `<div class="tituloQuiz" onclick="abrir('${qzno}')">${titulo}</div>`;
    }
  }
  listaQuiz.innerHTML += '<div class="boxLista">' + texto + '</div>';
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
            <input type="text" id="titu" size="74" required><br><br>

            <label for="enuncia">1° Questão apresentada pelo Quiz:</label><br>
            <input type="text" id="enuncia" size="90" required><br><br>

            <label for="resp0">1° resposta:</label><br>
            <input type="text" id="resp0" size="90" required><br>

            <label for="resp1">2° resposta:</label><br>
            <input type="text" id="resp1" size="90" required><br>

            <div id="respExtra"></div><br>

            <button type="button" id="btnMaisResp" onclick="maisOpc('perg0')">+ respostas</button><br><br>

            <label for="correto">Resposta correta:</label><br>
            <input type="number" id="correto" size="3" maxlength="2" required><br><br>
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
  let crud = document.getElementById('pergExtras');
  let nuperg = crud.childElementCount;
  let quizData = {};
  for (let k = 0; k < nuperg; k++) {
    let pergObj = {};
    let pergid = 'perg' + k;
    let perg = crud.querySelector(`[id='${pergid}']`);
    let titu = perg.querySelector("[id='titu']").value;
    let ques = perg.querySelector("[id='enuncia']").value;
    let gaba = perg.querySelector("[id='correto']").value;
    pergObj = { titulo: titu, pergunta: ques, gabarito: gaba };
    let nresp = perg.querySelector("[id='respExtra']").childElementCount + 2;
    for (let i = 0; i < nresp; i++) {
      let respname = 'resp' + i;
      let resp = perg.querySelector(`[id='${respname}']`).value;
      pergObj[respname] = resp;
    }
    quizData[pergid] = pergObj;
  }
  const coleta = localStorage.getItem('QuizDB');
  const lista = coleta ? JSON.parse(coleta) : 'vazio';
  if (lista == 'vazio') {
    let quiz0 = {};
    quiz0.quiz0 = quizData;
    localStorage.setItem('QuizDB', JSON.stringify(quiz0));
  } else {
    let nquiz = Object.keys(lista).length;
    let nomequiz = 'quiz' + nquiz;
    lista[nomequiz] = quizData;
    localStorage.setItem('QuizDB', JSON.stringify(lista));
  }
  listagem();
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
    let perg = pergchild.querySelector("[id='enuncia']").value;
    arrayperg.push(perg);
    let er = pergchild.querySelector("[id='respExtra']");
    let ern = er.childElementCount;
    let volresp = ern + 2;
    let quizobj = {};
    for (let i = 0; i < volresp; i++) {
      let respnome = 'resp' + i;
      let respvalor =
        pergchild.querySelector(`[id='${respnome}']`)?.value || '';
      quizobj[respnome] = respvalor;
    }

    let gaba = pergchild.querySelector("[id='correto']").value;
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
      <input type="text" id="enuncia" size="90" required><br><br>
      <label for="resp0">1° resposta:</label><br>
      <input type="text" id="resp0" size="90" required><br>
      <label for="resp1">2° resposta:</label><br>
      <input type="text" id="resp1" size="90" required><br>
      <div id="respExtra"></div><br>
      <button type="button" id="${btnnome}" onclick="maisOpc('${newperg}')">+ respostas</button><br><br>
      <label for="correto">Resposta correta:</label><br>
      <input type="number" id="correto" size="3" maxlength="2" required><br><br>
    </div>
  `;
  areaperg.insertAdjacentHTML('beforeend', newQuestionHTML);
  for (let j = 0; j < arrayperg.length; j += 2) {
    let idperg = 'perg' + j / 2;
    let pergchild = document.getElementById(idperg);
    if (!pergchild) continue;
    let enunciado = pergchild.querySelector("[id='enuncia']");
    if (enunciado) enunciado.value = arrayperg[j];
    let er = pergchild.querySelector('#respExtra');
    let ern = er.childElementCount;
    let volresp = ern + 2;
    for (let h = 0; h < volresp; h++) {
      let respnome = 'resp' + h;
      let respvalor = pergchild.querySelector(`[id='${respnome}']`);
      if (respvalor) {
        respvalor.value = arrayperg[j + 1][respnome];
      }
    }
    let gaba = pergchild.querySelector("[id='correto']");
    if (gaba) gaba.value = arrayperg[j + 1]['gaba'];
  }
}

function maisOpc(lugar) {
  const parent = document.getElementById(lugar);
  const area = parent.querySelector("[id='respExtra']");
  let filhotes = area.childElementCount;
  let arrayResposta = [];
  for (let k = 0; k < filhotes; k++) {
    let filhoteAtual = `resp${k + 2}`;
    let coleira = area.querySelector(`[id="${filhoteAtual}]`);
    if (coleira) arrayResposta.push(coleira.value);
  }
  let nome = `resp${filhotes + 2}`;
  let posi = `${filhotes + 3}° resposta:`;
  let conteudo = `
    <div>
      <label for="${nome}">${posi}</label><br>
      <input type="text" id="${nome}" size="90" required><br>
    </div>
  `;
  area.insertAdjacentHTML('beforeend', conteudo);
  for (let i = 0; i < filhotes; i++) {
    let filhoteAtual = `#resp${i + 2}`;
    let coleira = area.querySelector(`[id="${filhoteAtual}]`);
    if (coleira) coleira.value = arrayResposta[i];
  }
}

function abrir(lugar) {
  let canvas = document.getElementById('corpo');
  const jsondoc = JSON.parse(localStorage.getItem('QuizDB'));
  const quiz = jsondoc[lugar];
  let conteudo = `
<div class="boxQuiz abaixadinha">
    <div id="cabecalho">
    </div>
    <div id="areaQuiz" class="pergcaixa"></div>
    <br>
        <script>
        radioButtons.forEach(radio => {
            radio.addEventListener('change', destaca());
        });
    </script>
    <div id="quizcontrol" class="espacinho esparrama">
        <button type="button" id="btnEnviar" onclick="enviar()">Submeter</button>
        <button type="button" id="btnLimpar" onclick="limpa()">Limpar respostas</button>
    </div>
</div><br>
<div id="navbar" class="colanofundo procomeco noventinhaW">
    <button type="button" id="btnretornar" onclick="enviar()">Home ↩</button>
</div>
  `;
  canvas.innerHTML = conteudo;
  let inicial = quiz.perg0;
  let titul = inicial.titulo;
  let cabecalho = `<div class="quizTitulo">${titul}</div>`;
  let cabeca = canvas.querySelector("[id='cabecalho']");
  cabeca.innerHTML = cabecalho;
  let quantperg = Object.keys(quiz).length;
  for (let k = 0; k < quantperg; k++) {
    let pergid = 'perg' + k;
    let perg = quiz[pergid];
    let ques = perg.pergunta;
    let queplace = canvas.querySelector("[id='areaQuiz']");
    queplace.innerHTML = `<div class="alinhaH">${ques}</div><br>`;
    let nresp = Object.keys(perg).length - 3;
    for (let i = 0; i < nresp; i++) {
      let respid = `resp` + i;
      let resptext = perg[respid];
      let resp = `<div class="respcaixa btn alinhaH" onclick="destaca()"><label><input type="radio" name="${pergid}" id="${respid}" value="${i}"> ${resptext}</label></div>`;
      queplace.insertAdjacentHTML('beforeend', resp);
    }
  }
}

function destaca() {
  console.log('ativado');
  const groups = [
    ...new Set(
      [...document.querySelectorAll('input[type="radio"]')].map(
        (radio) => radio.name
      )
    ),
  ];
  console.log(groups);
  groups.forEach((group) => {
    const radios = document.querySelectorAll('input[name="' + group + '"]');
    radios.forEach((radio) => {
      const label = radio.nextElementSibling;
      if (radio.checked) {
        label.classList.add('repmark');
      } else {
        label.classList.remove('repmark');
      }
    });
  });
}

function enviar() {
  let canvas = document.getElementById('corpo');
  let padrao = `
    <div id="lista">
        <p>Quizes:</p>
        <div id="listaQuiz">
        </div>
    </div><br>
    <div class="grandinho" id='areaCriacao1'>
        <button type="button" id="btnCriar" onclick="criar()">Criar Novo Quiz?</button>
    </div>
  `;
  canvas.innerHTML = padrao;
  listagem();
}
