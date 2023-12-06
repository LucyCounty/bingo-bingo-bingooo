var jogadores = []
var numerosSorteados = [];
var intervalo;
var vencedorEncontrado = false;
var jogoIniciado = false;

function desenharCartela(jogador){

    const paiDivCartela = document.getElementById('bodyCartelas');

    const divCartela = document.createElement('div');
    divCartela.className = 'cartela';

    paiDivCartela.appendChild(divCartela);

    const h4_jogador = document.createElement('h4');
    h4_jogador.innerText = jogador.nome;

    divCartela.appendChild(h4_jogador);

    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const thB = document.createElement('th');
    const thI = document.createElement('th');
    const thN = document.createElement('th');
    const thG = document.createElement('th');
    const thO = document.createElement('th');

    thB.innerText = 'B'
    thI.innerText = 'I'
    thN.innerText = 'N'
    thG.innerText = 'G'
    thO.innerText = 'O'

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for(var i = 0; i < 5; i++){
        const tr = document.createElement('tr');
        for(var j = 0; j < 5; j++){
            const td = document.createElement('td');
            td.innerText = jogador.cartela[j][i];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    divCartela.appendChild(tabela);
}

function gerarColuna(quantidade, inicio, fim){
    var coluna = [];

    while(coluna.length < quantidade){
        var aleatorio = Math.floor(Math.random() * (fim - inicio) + inicio);
        if(!coluna.includes(aleatorio)){
            coluna.push(aleatorio);
        }
    }

    return coluna;
}

function gerarCartela(){
    var cartela = [gerarColuna(5, 1, 15), gerarColuna (5, 16, 30), gerarColuna(5, 31, 45), gerarColuna(5, 46, 60), gerarColuna(5, 61, 75)];

    return cartela;
}

function inscreverJogador(){

    if(jogoIniciado == true){
        alert('Não é possivel criar uma nova cartela com o jogo iniciado.');
        return;
    }

    const nome = prompt('digite o nome do jogador: ');

    if(nome.length < 1){
        alert('O nome precisa ter mais de 1 caractere!');
        return;
    }

    if(jogadores.includes(nome)){
        alert('Este nome já foi inserido. Escolha outro nome.');
        return;
    }

    const cartela = gerarCartela();

    const jogador = {
        nome: nome,
        cartela: cartela
    }

    jogadores.push(nome);
    jogadores.push(jogador);
    desenharCartela(jogador);
}

function jogar(){
    if(jogadores.length <= 2){
        alert('É preciso ter pelo menos dois jogadores!');
        return;
    }

    jogoIniciado = true;

    intervalo = setInterval(function(){

        var aleatorio;
        while(true){
            aleatorio = Math.floor(Math.random() * 75);
            if(!numerosSorteados.includes(aleatorio)){
                numerosSorteados.push(aleatorio);
                break;
            }
        }

        const bodyNumeros = document.getElementById('bodyNumeros');

        const span = document.createElement('span');
        span.innerText = aleatorio;

        bodyNumeros.appendChild(span);

        console.log(numerosSorteados);

        confirmarJogo(aleatorio);

        if (numerosSorteados.length >= 75) {
            console.log("Sorteio Finalizado!");
            clearInterval(intervalo);
        }

    }, 100)
}

function confirmarJogo(numero){
    var numerosCartelas = document.getElementsByTagName('td');

    for(var i = 0; i < numerosCartelas.length; i++){
        if(numerosCartelas[i].innerText == numero){
            numerosCartelas[i].style.backgroundColor = 'lightblue';
        }
    }
}

function reiniciarJogo() {

    numerosSorteados = [];

    const divCartelas = document.getElementById('bodyCartelas');
    divCartelas.innerHTML = '';

    const bodyNumeros = document.getElementById('bodyNumeros');
    bodyNumeros.innerHTML = '';

    jogadores = [];

    clearInterval(intervalo);

    alert('Jogo reiniciado!');

    jogoIniciado = false;

    vencedorEncontrado = false;
}