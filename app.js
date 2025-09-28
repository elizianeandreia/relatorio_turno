document.addEventListener('DOMContentLoaded', function() {
  function $id(id){return document.getElementById(id)}
  function criarBotaoRemover(callback){
    const btn = document.createElement('button')
    btn.textContent = "❌"
    btn.className = "remove-btn"
    btn.type = "button"
    btn.addEventListener('click', callback)
    return btn
  }

  if($id('btnSinal')) $id('btnSinal').addEventListener('click', function(){
    const hora = new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})
    const li = document.createElement('li')
    li.textContent = `Sinal enviado às ${hora}`
    li.appendChild(criarBotaoRemover(()=>li.remove()))
    $id('sinais').appendChild(li)
  })

  if($id('addEntrada')) $id('addEntrada').addEventListener('click', function(){
    const casa = $id('entradaCasa').value.trim()
    const nome = $id('entradaNome').value.trim()
    const hora = $id('entradaHora').value
    if(!casa || !nome || !hora){ alert("Preencha Casa, Morador e Hora para registrar uma Encomenda de Entrada."); return }
    const li = document.createElement('li')
    li.textContent = `${casa} ${nome} ${hora}`
    li.appendChild(criarBotaoRemover(()=>li.remove()))
    $id('listaEntrada').appendChild(li)
    $id('entradaCasa').value = ''; $id('entradaNome').value = ''; $id('entradaHora').value = ''
  })

  if($id('addPortaria')) $id('addPortaria').addEventListener('click', function(){
    const casa = $id('portariaCasa').value.trim()
    const qtd = $id('portariaQtd').value.trim()
    const status = $id('portariaStatus').value
    if(!casa || !qtd){ alert("Preencha Casa e Quantidade para registrar uma Encomenda na Portaria."); return }
    const li = document.createElement('li')
    li.textContent = `${casa} ${qtd} ${status}`
    li.appendChild(criarBotaoRemover(()=>li.remove()))
    $id('listaPortaria').appendChild(li)
    $id('portariaCasa').value = ''; $id('portariaQtd').value = ''; $id('portariaStatus').value = 'ok'
  })

  if($id('addSaida')) $id('addSaida').addEventListener('click', function(){
    const casa = $id('saidaCasa').value.trim()
    const nome = $id('saidaNome').value.trim()
    const hora = $id('saidaHora').value
    if(!casa || !nome || !hora){ alert("Preencha Casa, Morador e Hora para registrar uma Encomenda de Saída."); return }
    const li = document.createElement('li')
    li.textContent = `${casa} ${nome} ${hora}`
    li.appendChild(criarBotaoRemover(()=>li.remove()))
    $id('listaSaida').appendChild(li)
    $id('saidaCasa').value = ''; $id('saidaNome').value = ''; $id('saidaHora').value = ''
  })

  if($id('addChave')) $id('addChave').addEventListener('click', function(){
    try{
      const local = $id('chaveLocal').value.trim()
      const hora = $id('chaveHora').value
      const nome = $id('chaveNome').value.trim()
      const casa = $id('chaveCasa').value.trim()
      if(!local || !hora || !nome || !casa){ alert('Preencha Local, Hora, Morador e Casa antes de registrar.'); return }
      const li = document.createElement('li')
      li.textContent = `${nome} (Casa ${casa}) retirou a chave de ${local} às ${hora}`
      li.appendChild(criarBotaoRemover(()=>li.remove()))
      $id('listaChaves').appendChild(li)
      $id('chaveLocal').value = ''; $id('chaveHora').value = ''; $id('chaveNome').value = ''; $id('chaveCasa').value = ''
    }catch(err){ console.error('Erro registrar chave',err) }
  })

  if($id('addWhats')) $id('addWhats').addEventListener('click', function(){
    const morador = $id('whatsMorador').value.trim()
    const casa = $id('whatsCasa').value.trim()
    const hora = $id('whatsHora').value
    const msg = $id('whatsMensagem').value.trim()
    if(!morador || !casa || !hora || !msg){ alert("Preencha Morador, Casa, Hora e Mensagem para registrar WhatsApp."); return }
    const li = document.createElement('li')
    li.textContent = `${morador} (Casa ${casa}) às ${hora}: ${msg}`
    li.appendChild(criarBotaoRemover(()=>li.remove()))
    $id('listaWhats').appendChild(li)
    $id('whatsMorador').value = ''; $id('whatsCasa').value = ''; $id('whatsHora').value = ''; $id('whatsMensagem').value = ''
  })

  function renumerarLista(ul){
    Array.from(ul.children).forEach((li,i)=>{
      const name = li.dataset.name || li.textContent.split('. ').slice(1).join('. ')
      li.childNodes[0].nodeValue = `${i+1}. ${name}`
      li.dataset.name = name
    })
  }

  function adicionarMorador(){
    if(!$id('convidadosContainer')) return
    const container = $id('convidadosContainer')
    const bloco = document.createElement('div')
    bloco.className = 'morador-block'

    const moradorInput = document.createElement('input'); moradorInput.placeholder = 'Morador'
    const casaInput = document.createElement('input'); casaInput.placeholder = 'Casa'
    const localInput = document.createElement('input'); localInput.placeholder = 'Local'
    const ul = document.createElement('ul'); ul.className = 'convidados-list'
    const btnAdd = document.createElement('button'); btnAdd.type='button'; btnAdd.className='btn'; btnAdd.textContent='Adicionar Convidado'
    btnAdd.addEventListener('click', function(){
      const nome = prompt('Nome do convidado:')
      if(nome && nome.trim()){
        const li = document.createElement('li')
        li.dataset.name = nome.trim()
        const index = ul.children.length + 1
        const textNode = document.createTextNode(`${index}. ${nome.trim()}`)
        li.appendChild(textNode)
        li.appendChild(criarBotaoRemover(()=>{ li.remove(); renumerarLista(ul) }))
        ul.appendChild(li)
      }
    })
    const btnRem = criarBotaoRemover(()=>bloco.remove())
    bloco.appendChild(moradorInput); bloco.appendChild(casaInput); bloco.appendChild(localInput)
    bloco.appendChild(btnAdd); bloco.appendChild(btnRem); bloco.appendChild(ul)
    container.appendChild(bloco)
  }

  if($id('btnAddMorador')) $id('btnAddMorador').addEventListener('click', adicionarMorador)
  if($id('novoMoradorConvidados')) $id('novoMoradorConvidados').addEventListener('click', adicionarMorador)
  if($id('convidadosContainer') && $id('convidadosContainer').children.length === 0) adicionarMorador()

  function adicionarOcorrencia(){
    if(!$id('ocorrenciasContainer')) return
    const container = $id('ocorrenciasContainer')
    const box = document.createElement('div'); box.className = 'ocorrencia-box'
    const morador = document.createElement('input'); morador.placeholder = 'Morador'
    const casa = document.createElement('input'); casa.placeholder = 'Casa'
    const estab = document.createElement('input'); estab.placeholder = 'Estabelecimento'
    const visitante = document.createElement('input'); visitante.placeholder = 'Visitante'
    const rg = document.createElement('input'); rg.placeholder = 'RG'
    const cpf = document.createElement('input'); cpf.placeholder = 'CPF'
    const txt = document.createElement('textarea'); txt.placeholder = 'Ocorrência'
    const btnRem = criarBotaoRemover(()=>box.remove())
    box.appendChild(morador); box.appendChild(casa); box.appendChild(estab); box.appendChild(visitante)
    box.appendChild(rg); box.appendChild(cpf); box.appendChild(txt); box.appendChild(btnRem)
    container.appendChild(box)
  }

  if($id('novaOcorrencia')) $id('novaOcorrencia').addEventListener('click', adicionarOcorrencia)
  if($id('ocorrenciasContainer') && $id('ocorrenciasContainer').children.length === 0) adicionarOcorrencia()

  function coletarLista(id){
    const el = $id(id); if(!el) return ""
    return Array.from(el.children).map(li => li.innerText.replace('❌','').trim()).join("\n")
  }

  function coletarOcorrenciasArray() {
    const result = [];
    document.querySelectorAll("#ocorrenciasContainer .ocorrencia-box").forEach(box => {
      const mor = box.querySelector("input[placeholder='Morador']")?.value || "";
      const ca = box.querySelector("input[placeholder='Casa']")?.value || "";
      const es = box.querySelector("input[placeholder='Estabelecimento']")?.value || "";
      const vi = box.querySelector("input[placeholder='Visitante']")?.value || "";
      const rg = box.querySelector("input[placeholder='RG']")?.value || "";
      const cpf = box.querySelector("input[placeholder='CPF']")?.value || "";
      const oc = box.querySelector("textarea[placeholder='Ocorrência']")?.value || "";
      const bloco = [
        "------------------------------------",
        `MORADOR: ${mor}`,
        `CASA: ${ca}`,
        `ESTABELECIMENTO: ${es}`,
        `VISITANTE: ${vi}`,
        `RG: ${rg}`,
        `CPF: ${cpf}`,
        `OCORRÊNCIA: ${oc}`,
        "------------------------------------"
      ].join("\n");
      result.push(bloco);
    });
    return result;
  }

  function coletarOcorrencias() {
    return coletarOcorrenciasArray().join("\n\n");
  }

  // Exportação CSV corrigida
  if ($id('exportCSV')) {
    $id('exportCSV').addEventListener('click', function () {
      const linhas = [];
      let dataRelatorioCSV = document.querySelector('input[type="date"]')?.value || "";
      if (dataRelatorioCSV) {
        const partes = dataRelatorioCSV.split('-');
        dataRelatorioCSV = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
      const responsavel = "Wagner Mori";
      linhas.push(["Data", dataRelatorioCSV]);
      linhas.push(["Responsável", responsavel]);
      linhas.push([]);
      linhas.push(["Seção", "Conteúdo"]);

      function adicionaBlocoCSV(titulo, conteudo) {
        if (!conteudo) return;
        const linhasConteudo = conteudo.split("\n").filter(Boolean);
        linhas.push([titulo, linhasConteudo.shift() || ""]);
        linhasConteudo.forEach(l => linhas.push(["", l]));
      }

      adicionaBlocoCSV("Sinais", coletarLista('sinais'));
      adicionaBlocoCSV("Encomenda Entrada", coletarLista('listaEntrada'));
      adicionaBlocoCSV("Encomenda na Portaria", coletarLista('listaPortaria'));
      adicionaBlocoCSV("Encomenda Saída", coletarLista('listaSaida'));
      adicionaBlocoCSV("Chaves", coletarLista('listaChaves'));
      adicionaBlocoCSV("WhatsApp", coletarLista('listaWhats'));

      const ocorrencias = coletarOcorrencias();
      if (ocorrencias) {
        const partes = ocorrencias.split("\n").filter(Boolean);
        linhas.push(["Ocorrências", ""]);
        partes.forEach(l => linhas.push(["", l]));
        linhas.push(["", ""]);
      }

      const convidadosBlocos = [];
      document.querySelectorAll("#convidadosContainer .morador-block").forEach(div => {
        const mor = div.querySelector("input[placeholder='Morador']")?.value || "";
        const ca = div.querySelector("input[placeholder='Casa']")?.value || "";
        const lo = div.querySelector("input[placeholder='Local']")?.value || "";
        const lista = Array.from(div.querySelectorAll("ul.convidados-list li"))
          .map(li => li.innerText.replace('❌', '').trim())
          .filter(Boolean);

        if (mor || ca || lo || lista.length) {
          convidadosBlocos.push({ mor, ca, lo, lista });
        }
      });

      if (convidadosBlocos.length) {
        linhas.push(["Convidados", ""]);
        convidadosBlocos.forEach(bloco => {
          linhas.push([`Morador: ${bloco.mor}`, `Casa: ${bloco.ca} | Local: ${bloco.lo}`]);
          bloco.lista.forEach(convidado => {
            linhas.push(["", convidado]);
          });
          linhas.push(["", ""]);
        });
      }

      let csv = "";
      linhas.forEach(l => {
        csv += l.map(c => `"${(c || "").toString().replace(/"/g, '""')}"`).join(",") + "\n";
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Relatorio_Turno.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if($id('relatorioForm')) $id('relatorioForm').addEventListener('submit', function(e){
    e.preventDefault()
    $id('mensagem').innerText = "Relatório salvo com sucesso!"
    $id('relatorioForm').reset()
    if($id('sinais')) $id('sinais').innerHTML = ''
    if($id('listaEntrada')) $id('listaEntrada').innerHTML = ''
    if($id('listaPortaria')) $id('listaPortaria').innerHTML = ''
    if($id('listaSaida')) $id('listaSaida').innerHTML = ''
    if($id('listaChaves')) $id('listaChaves').innerHTML = ''
    if($id('listaWhats')) $id('listaWhats').innerHTML = ''
    if($id('convidadosContainer')) $id('convidadosContainer').innerHTML = ''
    if($id('ocorrenciasContainer')) $id('ocorrenciasContainer').innerHTML = ''
    if($id('novoMoradorConvidados')) adicionarMorador()
    if($id('novaOcorrencia')) adicionarOcorrencia()
  })

  // LocalStorage para salvar campos do formulário
  if($id('relatorioForm')) {
    $id('relatorioForm').addEventListener('input', () => {
      const data = new FormData($id('relatorioForm'));
      const obj = Object.fromEntries(data.entries());
      localStorage.setItem('relatorio', JSON.stringify(obj));
    });
  }

  // Carregar dados salvos do localStorage
  const saved = localStorage.getItem('relatorio');
  if (saved) {
    const obj = JSON.parse(saved);
    for (const [k,v] of Object.entries(obj)) {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = v;
    }
  }
});
