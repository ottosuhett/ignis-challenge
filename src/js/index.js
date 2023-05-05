const textoDigitado = document.getElementById("text");
const Button = document.getElementById("btn");
const results = document.getElementById("result-list");
const vencedor = document.getElementById("campeao");

let clubes = []
let listaObjetos = []
let jogos =[]


Button.addEventListener("click",() => {
    ExtrairTimes()
    GerarJogos()
    defineCampeao(listaObjetos)
})

const ExtrairTimes = ()=> {
    let time = {
        nome: "",
        cidade: "",
        pontos:0
    }
    textoDigitado.value
                .split("\n")
                .filter(linha => linha.trim())
                .map(item =>item.split(";"))
                .map(item=>{
                    time.nome = item[0].trim()
                    time.cidade = item[1].trim()
                    
                    clubes.push(item[0].trim())
                    listaObjetos.push(time)
                    
                    time = {
                        nome: "",
                        cidade: "",
                        pontos:0
                    }
                }) 
}

const GerarJogos= () =>{
    
    let quantidadeTimes = listaObjetos.length
    let cidadesRodada1 = []
    let cidadesRodada2 = []
    
    for(let timeA = 0; timeA < quantidadeTimes; timeA++){
        for(let timeB = 0; timeB < quantidadeTimes; timeB++){
            if(timeA != timeB){
                let localJogo = listaObjetos[timeA].cidade
                let timeMandante = listaObjetos[timeA]
                let timeVisitante = listaObjetos[timeB]
                if(timeA < timeB){
                    let placar = [GolAleatorio(),GolAleatorio()]
                    verificarCidadePrimeiraRodada(cidadesRodada1,localJogo,timeMandante,timeVisitante,placar)
                    VerificarGanhadorPartida(timeMandante,timeVisitante,placar)
                }else{
                    placar = [GolAleatorio(),GolAleatorio()]
                    verificarCidadeSegundaRodada(cidadesRodada2,localJogo,timeMandante,timeVisitante,placar)
                    VerificarGanhadorPartida(timeMandante,timeVisitante,placar)
                }
            }
        }
    }
}
function setPontos(time,pontos){
    time.pontos += pontos
}
const GolAleatorio = () =>{
    return Math.floor(Math.random() * 5)
}
function VerificarGanhadorPartida(timeA,timeB,placar){
    if(placar[0] > placar[1]){
        setPontos(timeA,3)
        
    }else if(placar[1] > placar[0]){
        setPontos(timeB,3)
        
    }else{
        setPontos(timeA,1)
        setPontos(timeB,1)
    }
    
}
function getPontos(lista,index){
    console.log(`O time ${lista[index].nome} tem ${lista[index].pontos} pontos`)
}
function exibirPartida(timeA,timeB,placar,rodada,message = ""){
    nomeTimeA = timeA.nome.charAt(0).toUpperCase()+ timeA.nome.slice(1)
    nomeTimeB = timeB.nome.charAt(0).toUpperCase()+ timeB.nome.slice(1)
    cidadeTimeA = timeA.cidade.charAt(0).toUpperCase()+timeA.cidade.slice(1)
    
    results.innerHTML += `<li>${nomeTimeA} ${placar[0]} VS 
                              ${placar[1]} ${nomeTimeB} - 
                              ${cidadeTimeA} - Rodada ${rodada} ${message}
                          </li>`
}
function verificarCidadePrimeiraRodada(listaCidades1,cidade,timeA,timeB,placar){
    
    if(listaCidades1.includes(cidade)){
        exibirPartida(timeA,timeB,placar,1,"RODADA DUPLA")
    }else{
        exibirPartida(timeA,timeB,placar,1)
        listaCidades1.push(cidade)
    }

}
function verificarCidadeSegundaRodada(listaCidades2,cidade,timeA,timeB,placar){
    
    if(listaCidades2.includes(cidade)){
        exibirPartida(timeA,timeB,placar,2,"RODADA DUPLA")
    }else{
        exibirPartida(timeA,timeB,placar,2)
        listaCidades2.push(cidade)
    }

}
function defineCampeao(lista){
    const maiorPontuacao = lista.reduce(function(prev,current){
        return (prev.pontos > current.pontos) ? prev: current
    })
    vencedor.innerHTML= `<p> O time campao é : ${maiorPontuacao.nome.toUpperCase()} com ${maiorPontuacao.pontos} pontos </p>`
    
}