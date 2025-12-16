let baseGrupos = document.querySelector("#GRUPOS_TODOS");
let arrayValoresGrupos = baseGrupos.querySelectorAll(".grupo_valor");
let element_Total = document.getElementById("Total");
let bufferTotal = 0;
carregarDados()

function GRUPO_Add(button){
  
  let primeiroGrupo = baseGrupos.firstElementChild;
  
  let novo_Grupo = primeiroGrupo.cloneNode(true)
  let novo_Grupo_inputs = novo_Grupo.querySelectorAll('input');
  novo_Grupo_inputs.forEach(input => {
        input.value = null;
        input.checked = false;
    });
  novo_Grupo.dataset.styleState = Math.floor(Math.random() * 10)
  GRUPO_StyleSwitch(novo_Grupo.firstElementChild.firstElementChild)
  let apgItens = Array.from(novo_Grupo.children)
  apgItens.splice(0, 2)
  apgItens.forEach(child => {
        child.remove()
    });
  
  novo_Grupo.firstElementChild.children[3].textContent = "R$ 0,00"
  
  novo_Grupo.classList.toggle('grupo-start')
  baseGrupos.appendChild(novo_Grupo);
  setTimeout(() => {
      novo_Grupo.classList.toggle('FadeIn');
  }, 10);
  setTimeout(() => {
    novo_Grupo.classList.toggle('grupo-start')
    novo_Grupo.classList.toggle('FadeIn');
    salvarDados()
  }, 200);

  
  

}

const GRUPO_STYLES = [
    {
        '--cor-destak': "rgba(132, 18, 255, 1)",
        '--cor-fundo': "rgb(29, 3, 60)",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "#3067ffff",
        '--cor-fundo': "#080738ff",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "rgb(33,226,242)",
        '--cor-fundo': "rgb(7,59,64)",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "#13f72aff",
        '--cor-fundo': "#0a3f1cff",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "#ffdd00ff",
        '--cor-fundo': "#433700ff",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "#ff6912ff",
        '--cor-fundo': "#522006ff",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "rgba(255, 17, 17, 1)",
        '--cor-fundo': "rgba(69, 0, 0, 1)",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "rgba(255, 29, 251, 1)",
        '--cor-fundo': "rgba(69, 0, 54, 1)",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "rgba(216, 216, 216, 1)",
        '--cor-fundo': "rgba(30, 30, 30, 1)",
        '--cor-text1': "rgb(232,232,232)"
    },
    {
        '--cor-destak': "rgba(29, 29, 29, 1)",
        '--cor-fundo': "rgba(212, 212, 212, 1)",
        '--cor-text1': "rgba(16, 16, 16, 1)",
    },
  ];

function GRUPO_StyleSwitch(element){
    let Grupo = element.parentElement.parentElement;
    
    let currentState = parseInt(Grupo.dataset.styleState || 0);
  
    let nextState = (currentState + 1) % GRUPO_STYLES.length;
    
    const stylesToApply = GRUPO_STYLES[nextState];
    
    for (const property in stylesToApply) {
        Grupo.style.setProperty(property, stylesToApply[property]);
    }
    
    Grupo.dataset.styleState = nextState;
    salvarDados()
}

function ITEM_Add(element){
  let itemOriginal = element.parentElement;
  let grupoAtual = itemOriginal.parentElement;
  
  itens = Array.from(grupoAtual.children);
  let indiceItem = itens.indexOf(itemOriginal) + 1;
  if(grupoAtual.children.length == indiceItem){
    
    novo_item = itemOriginal.cloneNode(true);
    let novo_Item_inputs = novo_item.querySelectorAll('input');
    novo_Item_inputs.forEach(input => {
        input.value = null;
        input.checked = false;
    });
    
    novo_item.classList.toggle('item-start')
    grupoAtual.appendChild(novo_item)
    ITEM_GruposDescer(grupoAtual, novo_item)
  
    setTimeout(() => {
        novo_item.classList.toggle('FadeIn');
    }, 10);
    setTimeout(() => {
      novo_item.classList.toggle('item-start')
      novo_item.classList.toggle('FadeIn');
      salvarDados();
    }, 200);
    }
}

function ITEM_Checkbox(element){
    console.log("coisou")

  if(element.checked){
    element.dataset.checkBx = 1
  }else{
    element.dataset.checkBx = 0
  }
  salvarDados()
}

function ITEM_NameChange(element){
  ITEM_Add(element)
  salvarDados() 
}

function GRUPO_NameChange(){
  salvarDados()
}

function ITEM_QuantidadeChange(element){
  calculoGrupo(element.parentElement.parentElement)
  ITEM_Add(element)
}

function ITEM_PrecoChange(element){
  calculoGrupo(element.parentElement.parentElement)
  ITEM_Add(element)
}

function ITEM_Excluir(element){
  
  if (element.parentElement.parentElement.children.length > 2 && element.parentElement.parentElement.dataset.animacaoSD == "false") {
    let excluir_item = element.parentElement
    let grupoAtual = excluir_item.parentElement;

    grupoAtual.dataset.animacaoSD = "true"
    
    itens = Array.from(grupoAtual.children);
    let indiceItem = itens.indexOf(excluir_item) + 1;      
    let itensDepois = itens.slice(indiceItem)


    ITEM_Subirem(itensDepois)
    ITEM_GruposSubir(grupoAtual, excluir_item)
    excluir_item.classList.toggle('item-grupo-end')
  
    setTimeout(() => {
        excluir_item.classList.toggle('FadeOut-item');
    }, 1);
    setTimeout(() => {
      excluir_item.classList.toggle('item-grupo-end')
      excluir_item.classList.toggle('FadeOut-item')
      let acalcular = element.parentElement.parentElement
      element.parentElement.remove()  
      calculoGrupo(acalcular)
      ;
    }, 150);
    }
    
  
}

function ITEM_Subirem(itens){
  itens.forEach(iten => {
    setTimeout(() => {
      iten.classList.toggle('item-subir')
    }, 1);
    setTimeout(() => {
      iten.classList.toggle('item-subir')      
    }, 152);
  })
}

function ITEM_GruposSubir(grupo, item){
  let grupoHeight = grupo.offsetHeight;
  let itemHeight = item.offsetHeight;

  grupo.style.height = `${grupoHeight - 23}px`;

  setTimeout(() => {
    grupo.style.height = `${grupoHeight - itemHeight - 23}px`;
  }, 10);

  setTimeout(() => {
    grupo.style.removeProperty('height');
    grupo.dataset.animacaoSD = "false"
  }, 300);
}

function ITEM_GruposDescer(grupo, item){
  let grupoHeight = grupo.offsetHeight;
  let itemHeight = item.offsetHeight;

  grupo.style.height = `${grupoHeight - 63}px`;
  
   setTimeout(() => {
    grupo.style.height = `${grupoHeight + itemHeight - 63}px`;
  }, 10);
  
  setTimeout(() => {
    grupo.style.removeProperty('height');
    grupo.dataset.animacaoSD = "false"
  }, 300);
}

function GRUPO_Excluir(element){
    if (baseGrupos.children.length <= 1) return;

    const grupoParaExcluir = element.closest('.GRUPO');
    if (!grupoParaExcluir) return;

    if (grupoParaExcluir.querySelectorAll('.GRUPO-ITENS').length > 1) {
        const confirmacao = confirm("Tem certeza que quer excluir o Grupo e todos os seus itens?");
        if (!confirmacao) return;
    }

    const alturaGrupo = grupoParaExcluir.offsetHeight + 5; 
    const todosOsGrupos = Array.from(baseGrupos.children);
    const indexExcluir = todosOsGrupos.indexOf(grupoParaExcluir);

    const gruposParaSubir = todosOsGrupos.slice(indexExcluir + 1);
    gruposParaSubir.forEach(grupo => {
        grupo.style.transform = `translateY(-${alturaGrupo}px)`;
    });

    grupoParaExcluir.classList.add('FadeOut-grupo');

    setTimeout(() => {
        grupoParaExcluir.remove();

        gruposParaSubir.forEach(grupo => {
            grupo.style.transition = 'none';
            grupo.style.transform = 'translateY(0px)';
            grupo.offsetHeight; // reflow
            grupo.style.removeProperty('transition');
        });

        calculoTotal(); 
    }, 150);
}

function Resetar(){
  let reseta = confirm("Quer mesmo resetar a Lista, seus Grupos e Itens apagando todos os seus conteúdos?")
  if(reseta){
    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
      input.value = null
      input.checked = false
    })
    localStorage.removeItem('saveLista')
    window.location.reload()
  }
}

function calculoGrupo(Grupo){
  let elmt_subtotal = Grupo.firstElementChild.children[3];
  let bufferSubtotal = 0;
  
  let arrayItens = Array.from(Grupo.children)
  arrayItens.shift()
  arrayItens.forEach(arrayItem => {
    let elmt_Preco = arrayItem.children[3];
    let elmt_Quantidade = arrayItem.children[2]
    
    let Preco_value = elmt_Preco.value
    let Quantidade_value= elmt_Quantidade
    
    
    
    if (elmt_Quantidade.value == "" || elmt_Quantidade.value == 0) {
      Quantidade_value = 1
      bufferSubtotal = bufferSubtotal + (1 * elmt_Preco.value)
    } else {
    bufferSubtotal = bufferSubtotal + (elmt_Quantidade.value * elmt_Preco.value)
    }
    });
  elmt_subtotal.textContent = "R$ " + bufferSubtotal.toFixed(2).replace(".",",");
  calculoTotal();
  debugger
}

function calculoTotal(){ 
  bufferTotal = 0;
  arrayValoresGrupos = baseGrupos.querySelectorAll(".grupo_valor");
  
  arrayValoresGrupos.forEach(_valor => {
        let valorLimpo = parseFloat(_valor.textContent.replace("R$ ", ""))
        bufferTotal = bufferTotal + valorLimpo
    });
    
    element_Total.textContent = "Total: R$ " + bufferTotal.toFixed(2).replace(".",",")
    ajustarFontSize()
    salvarDados()
}

function GRUPO_ToggleRecolher(element){
  let Itens = Array.from(element.parentElement.parentElement.children);
  Itens.splice(0, 1)
  Itens.forEach(item =>{
    
  item.classList.toggle("recolhido")
  })
  element.classList.toggle("rotateRecolher");
}

function ajustarFontSize(){
  
  const spans = document.querySelectorAll(".valor") 
  
    
    spans.forEach(spn =>{
      let maxContainerWidth = 100
      let sufixo = "px"
      if (spn == element_Total) {
        maxContainerWidth = 180
        sufixo = "px"}
      let currentFontSize = 16;
      spn.style.fontSize = currentFontSize + sufixo;

      while (spn.offsetWidth > maxContainerWidth && currentFontSize > 1) {
          currentFontSize--;
          spn.style.fontSize = currentFontSize + sufixo;
        
      }
      });
  }
  
function salvarDados(){
  
  let AllInputs = document.querySelectorAll("input")
  AllInputs.forEach(inpt =>{
    inpt.setAttribute('value', inpt.value)
    
  })
  
  let Save = baseGrupos.outerHTML
  let dados = {
    name: 'GruposItens',
    html: Save
  };
  let dadosJson = JSON.stringify(dados);
  if (localStorage.getItem('saveLista')) {
    localStorage.removeItem('saveLista')
  }
  localStorage.setItem('saveLista', dadosJson)
}
  
function carregarDados(importado){
  if(!importado){
    let dadosSalvos = localStorage.getItem('saveLista');
    if (dadosSalvos){
      baseGrupos.remove()
      let dadosCarregados = JSON.parse(dadosSalvos)
      document.body.innerHTML = document.body.firstElementChild.outerHTML + dadosCarregados.html
      baseGrupos = document.querySelector("#GRUPOS_TODOS");
      element_Total = document.getElementById("Total");
      calculoTotal()
      
    }
  }else{
    baseGrupos.remove()
    // Se 'importado' é a string JSON do arquivo:
    let dadosCarregados = JSON.parse(importado) // 'importado' é a string JSON lida
    document.body.innerHTML = document.body.firstElementChild.outerHTML + dadosCarregados.html
    baseGrupos = document.querySelector("#GRUPOS_TODOS");
    element_Total = document.getElementById("Total");
    
    

    escondidos
    calculoTotal()
  }
}

function DVD(){
  let escolha1 = prompt('\n\n  Escreva o Numero da opção:\n\n      1 - Compartilhar\n      2 - Importar JSON\n      3 - GitHub', "1")
  if(escolha1 == 1) {
    let escolha1_1 = prompt('\n\n  Escreva o Numero da opção:\n\n      1 - Compartilhar com Contatos\n      2 - Compartilhar em JSON', "1")
    Compartilhar(escolha1_1)
  }
  if(escolha1 == 2) {
    Importar()
  }
  if(escolha1 == 3) {
    window.open('https://github.com/FellipeDerato/Lista-de-Compras', '_blank');
  }


  
}

function Compartilhar(opt){
  if(opt == 1) {
    let c_Grupos = []
    let allGrupos = baseGrupos.querySelectorAll(".GRUPO")
    allGrupos.forEach( grp =>{
      let gruposItens = grp.querySelectorAll(".GRUPO-ITENS")
      
      let c_Itens = []
      
      gruposItens.forEach(itm => {
        
        c_Itens.push({
          Nome: itm.children[1].value,
          Quantidade: itm.children[2].value,
          Preco: itm.children[3].value
        })
      })
      c_Grupos.push({
        Nome: grp.firstElementChild.children[1].value,
        Style: parseInt(grp.dataset.styleState),
        Subtotal: grp.firstElementChild.children[3].textContent,
        Itens: c_Itens
      })
    })
    
    //console.log(c_Grupos)
    
    let p_1 = "-- Lista de Compras! --";
    let p_2 = "\n";
    c_Grupos.forEach(Grupo => {
      if (Grupo.Nome == "") {
        Grupo.Nome = "  Grupo"
      }
      let p_2_1 = "\n"
      
      Grupo.Itens.forEach(siten => {
        if (siten.Nome || siten.Quantidade || siten.Preco){
          let bufQtd = siten.Quantidade
          if(siten.Quantidade == "") {
            bufQtd = 1
          }
        p_2_1 = p_2_1 + "• " + siten.Nome + " x" + bufQtd + " - $" + siten.Preco + "\n";}
      })
      
      p_2 = p_2 + "\n " + Grupo.Nome + " - - - " + Grupo.Subtotal + p_2_1 + "\n"
      
      
      
    })
    let CompartilharString = p_1 + p_2 + element_Total.textContent
    console.log(CompartilharString)
    
    if('share' in navigator) {
      navigator.share({
        title: "Lista de Compras",
        text: CompartilharString
      })  
    }else{
      if('clipboard' in navigator){
        navigator.clipboard.writeText(CompartilharString)
      }else{
      alert("Sem suporte para: Compartilhar com Contatos e a Area de Transferência. Tente em outro navegador")
      }
    }
    
  }
  if(opt == 2) {
    let jsonString = localStorage.getItem('saveLista');
    let blob = new Blob([jsonString], { type: 'text/plain' });
    let arquivoTxt = new File([blob], 'ListaJSON.txt', { type: 'text/plain' });
    
    if('share' in navigator) {
      navigator.share({
        title: "Lista de Compras em JSON",
        files: [arquivoTxt],
        text: "Lista de compras em JSON, Importe no seu Aplicativo de Lista de Compras!"
      })
    } else {
      let url = URL.createObjectURL(arquivoTxt)
      const linkDownload = document.createElement('a');
      linkDownload.href = url;
      linkDownload.download = 'ListaJSON.txt';
      linkDownload.style.display = 'none';
      document.body.appendChild(linkDownload);
      
      linkDownload.click(); 

document.body.removeChild(linkDownload);
URL.revokeObjectURL(url);
    }
    
  }
}

function Importar() {
    const fileInput = document.getElementById('file-input');

    if (!fileInput) {
        console.error("Input de arquivo não encontrado.");
        return;
    }

    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const fileContent = e.target.result;
                try {
                    carregarDados(fileContent);
                    alert("Dados importados com sucesso!");
                } catch (error) {
                    alert("Erro ao processar o arquivo. Certifique-se de que é um JSON válido.");
                    console.error("Erro na importação:", error);
                }
            };

            reader.readAsText(file);
        }

        fileInput.value = null;
    };

    fileInput.click();
}


  
