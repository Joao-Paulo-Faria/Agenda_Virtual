const frm = document.querySelector("form") //obtem elemento da página
const dvQuadro = document.querySelector("#divQuadro")



const atua = ()=>{
    location.reload()
}

//var btn = document. querySelector("#btatu")
//btn. addEventListener("click", function() {
//location. reload();
//});

//função atualizar
const atualizar = ()=>{
    window.addEventListener("load", ()=>{

    
        //verifica se existe tarefas salvas no navegador do usuário
        if(localStorage.getItem("tarefasDia")){
            //cria um vetor com a lista de tarefs (separadas pelo split(";"))
            const dados = localStorage.getItem("tarefasDia").split(";")
    
            //percorre os dados armazenados em localstorage
            dados.forEach((dado)=>{
            const h5 = document.createElement("h5")//cria o elemento html h5
            const texto = document.createTextNode(dado) //cria um texto
            h5.appendChild(texto) //define que texto será filho de h5
            dvQuadro.appendChild(h5) //e que h5 será filho de divQuadro
            
    
            })
            
        }
        if(localStorage.getItem("tarefasDia2")){
            //cria um vetor com a lista de tarefs (separadas pelo split(";"))
            const dad = localStorage.getItem("tarefasDia2").split(";")
    
            //percorre os dados armazenados em localstorage
            dad.forEach((da)=>{
            const h6 = document.createElement("h6")//cria o elemento html h5
            const texto = document.createTextNode(da) //cria um texto
            h6.appendChild(texto) //define que texto será filho de h5
            dvQuadro.appendChild(h6) //e que h5 será filho de divQuadro
            h6.className ="tarefa-feita"
            
    
            })
    
    
        }
    
       
    })
}
//função gravar
const gravar = ()=>{
    //frm.btGravar.addEventListener("click",()=>{
        const tarefas = document.querySelectorAll("h5") //obtem tags h5 da página
        const tarefas2 = document.querySelectorAll("h6") //obtem tags h5 da página
    
        //if(tarefas.length==0){
            //alert("Não existe tarefas para serem salvas") //se não existe tarefas, exibe alerta
            //return //retorna
        //}
        let dados =""
        let dad="" //irá "acumular" os daddos a serem salvos
        tarefas.forEach((tarefa)=>{
            dados = dados +tarefa.innerText + ";" //acumula conteúdo de cada h5
    
        })
        //grava os dados em localStorage, removendo os último ";"
        localStorage.setItem("tarefasDia",dados.slice(0,-1))

         //irá "acumular" os daddos a serem salvos
        tarefas2.forEach((tarefa2)=>{
            dad = dad +tarefa2.innerText + ";" //acumula conteúdo de cada h5
    
        })
        localStorage.setItem("tarefasDia2",dad.slice(0,-1))
    
        //confere se dados foram armazenados em localstorage
        //if(localStorage.getItem("tarefasDia")) {
            //alert("Ok! Tarefas Salvas")
        //}
     
   // })

}

//botão selecionar
frm.btselecionar.addEventListener("click", ()=>{
    const tarefas = document.querySelectorAll("h5") //obtem tag h5 da página

    if(tarefas.length ==0){
        alert("Não existe tarefa para selecionar") //não existe tarefa para exibir
        return //e retorna
    }
    let aux = -1 //variavel auxiliar para indicar linha selecionada

    //percorre a lista de elementos h5 inseridos na pagina, ou seja, tarefas 
    for(let i = 0; i<tarefas.length; i++){
        //se tag é da class tarefa-selecionada (está selecionada)
        if(tarefas[i].className =="tarefa-selecionada"){
            tarefas[i].className ="tarefa-normal" //troca para normal
            aux = i //muda valor da variavel auxiliar
            break //sai da repetição
        }
    }
    //se a linha que etá selecionada é a última, ira voltar para a primeira
    if(aux==tarefas.length -1){
        aux =-1

    }
    tarefas[aux+1].className = "tarefa-selecionada" //muda estio da próxima linha
})



//botão gravar
frm.btGravar.addEventListener("click",()=>{
    const tarefas = document.querySelectorAll("h5") //obtem tags h5 da página
    const tarefas2 = document.querySelectorAll("h6") //obtem tags h5 da página
    
    if(tarefas.length==0){
        alert("Não existe tarefas para serem salvas") //se não existe tarefas, exibe alerta
        return //retorna
    }
    let dados ="" //irá "acumular" os daddos a serem salvos
    tarefas.forEach((tarefa)=>{
        dados = dados +tarefa.innerText + ";" //acumula conteúdo de cada h5

    })


    let dad ="" //irá "acumular" os daddos a serem salvos
    tarefas2.forEach((tarefa2)=>{
        dad = dad +tarefa2.innerText + ";" //acumula conteúdo de cada h5

    })
    //grava os dados em localStorage, removendo os último ";"
    localStorage.setItem("tarefasDia",dados.slice(0,-1))

    localStorage.setItem("tarefasDia2",dad.slice(0,-1))

    //confere se dados foram armazenados em localstorage
    if(localStorage.getItem("tarefasDia")) {
        alert("Ok! Tarefas Salvas")
    }
    
    atualizar()
    
    
})


//botão enviar
frm.addEventListener("submit", ()=>{
    //e.preventDefault() //evita envio do form

    const tarefa = frm.inTarefa.value //obtem o conteudo digitado

    const h5 = document.createElement("h5") //cria o elemento html h5
    const texto = document.createTextNode(tarefa) //cria um texto
    h5.appendChild(texto)// define que o texto será filho de h5
    dvQuadro.appendChild(h5)//que h5 será filho de divQuadro
    frm.inTarefa.value="" //limpa o campo de edição
    frm.inTarefa.focus() //joga o cursor neste campo
    
    atualizar()
    gravar()
    
})


//botão retirar
frm.btRetirar.addEventListener("click", ()=>{
    const tarefas = document.querySelectorAll("h5") //obtem tags h5 da página
    let aux = -1 //variável auxiliar para indicar linha selecionada

    //percorre a lista das tarefas inseridas na página (elementos h5)
    tarefas.forEach((tarefa, i)=>{
        if(tarefa.className =="tarefa-selecionada"){//se é da classe tarefa-selecionada
            aux = i //muda valor da variável aux

        }
    })

    if(aux == -1){ //se não existe tarefa selecionada (ou se lista vazia...)
        alert("Selecione uma tarefa para removê-la...")
        return
    }
    //solicita confirmação (exibindo o conteúdo da tag h5 selecionada)
    if(confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)){
        dvQuadro.removeChild(tarefas[aux]) //remove um dos filhos de divQuadro

    }

    gravar()
    

})

//págna ok
frm.btok.addEventListener("click", ()=>{
    let novo 
    let elemento
    const tarefas = document.querySelectorAll("h5") //obtem tags h5 da página
    let aux = -1 //variável auxiliar para indicar linha selecionada

    //percorre a lista das tarefas inseridas na página (elementos h5)
    tarefas.forEach((tarefa, i)=>{
        if(tarefa.className =="tarefa-selecionada"){//se é da classe tarefa-selecionada
            aux = i //muda valor da variável aux

        }
    })

    if(aux == -1){ //se não existe tarefa selecionada (ou se lista vazia...)
        alert("Selecione uma tarefa para colocar OK!!")
        return
    }
    //solicita confirmação (exibindo o conteúdo da tag h5 selecionada)
    if(confirm(`Confirma a inclsuão da tarefa"${tarefas[aux].innerText}" como finalizada no dia?`)){

        novo=tarefas[aux].innerText
        tarefas[aux].className ="excluir"

        if(tarefas[aux].className ="excluir"){
            tarefas[aux].remove()
            const h6 = document.createElement("h6") //cria o elemento html h5
            const texto2 = document.createTextNode(novo)
            h6.appendChild(texto2)// define que o texto será filho de h5
            dvQuadro.appendChild(h6)//que h5 será filho de divQuadro
            h6.className ="tarefa-feita"

        }
      
       
    

    }
    
    
    gravar()
    
    

})



//--------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------


//botão selecionar2
frm.btselecionar2.addEventListener("click", ()=>{
    const tarefas2 = document.querySelectorAll("h6") //obtem tag h5 da página
    

    if(tarefas2.length == 0){
        alert("Não existe tarefa para selecionar") //não existe tarefa para exibir
        return //e retorna
    }
    let aux2 = -1 //variavel auxiliar para indicar linha selecionada
    

    //percorre a lista de elementos h5 inseridos na pagina, ou seja, tarefas 
    for(let i = 0; i<tarefas2.length; i++){
        //se tag é da class tarefa-selecionada (está selecionada)
        
        if(tarefas2[i].className =="tarefa-selecionada"){
            tarefas2[i].className ="tarefa-feita" //troca para normal
            aux2 = i //muda valor da variavel auxiliar
            break //sai da repetição
        }
    }
    //se a linha que etá selecionada é a última, ira voltar para a primeira
    if(aux2==tarefas2.length -1){
    
        aux2 =-1

    }
    
    tarefas2[aux2+1].className = "tarefa-selecionada" //muda estio da próxima linha
})

//voltar ok
frm.btvoltar.addEventListener("click", ()=>{

    let novo2
    let elemento
    const tarefas3 = document.querySelectorAll("h6") //obtem tags h5 da página
    let aux3 = -1 //variável auxiliar para indicar linha selecionada


    //percorre a lista das tarefas inseridas na página (elementos h6)
    tarefas3.forEach((tarefa, i)=>{
        if(tarefa.className =="tarefa-selecionada"){//se é da classe tarefa-selecionada
            aux3 = i //muda valor da variável aux
        }
    })
    if(aux3 == -1){ //se não existe tarefa selecionada (ou se lista vazia...)
        alert("Selecione uma tarefa para colocar OK!!")
        return
    }
    //solicita confirmação (exibindo o conteúdo da tag h5 selecionada)
    if(confirm(`Confirma a volta da tarefa"${tarefas3[aux3].innerText}" para não concluída?`)){

        novo2=tarefas3[aux3].innerText
    
        tarefas3[aux3].className ="tarefa-normal"

        if(tarefas3[aux3].className ="tarefa-normal"){
            tarefas3[aux3].remove()
            const h5 = document.createElement("h5") //cria o elemento html h5
            const texto3 = document.createTextNode(novo2)
            h5.appendChild(texto3)// define que o texto será filho de h5
            dvQuadro.appendChild(h5)//que h5 será filho de divQuadro
            h5.className ="tarefa-normal"
        }
    }
    atua()
    gravar()   

   

})

atualizar()
