var height = 6; 
var width = 5; 
var row = 0; 
var coluna = 0; 

var gameOver = false; 
var word = "TESTE"; 
var word2 = "TESTE"; 

window.onload = function(){
    initialize(); 
}

function initialize(){
    for(let r = 0; r < height; r++){
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span"); 
            tile.id = r.toString() + "-" + c.toString(); 
            tile.classList.add("tile"); 
            tile.innerText = ""; 
            document.getElementById("board").appendChild(tile); 
        }
    }

  document.addEventListener("keyup", (e) => {
    if(gameOver) return; 

     if("KeyA" <= e.code && e.code <= "KeyZ"){
        if(coluna < width){
            let currentTile = document.getElementById(row.toString() + '-' + coluna.toString()); 
            if(currentTile.innerText == ""){
                currentTile.innerText = e.code[3]; 
                coluna += 1; 
            }
        }
     }
       else if(e.code == "Backspace"){
        if( 0< coluna && coluna <= width ){
            coluna -= 1; 
        }
        let currentTile = document.getElementById(row.toString() + '-' + coluna.toString()); 
        currentTile.innerText = "";
        }

        else if( e.code == "Enter"){
            atualizar(); 
            row+=1; 
            coluna = 0; 
        }

        if(!gameOver && row == height){ 
            alert("Dica: algo que todo desenvolvedor e QA deve saber fazer!")
            reiniciaTabuleiro(); 
        }




       
  })

}

function atualizar() {
    let correto = 0;
    let countLetras = {};

    for (let i = 0; i < word.length; i++) {
        let letra = word[i];
        if (countLetras[letra]) {
            countLetras[letra]++;
        } else {
            countLetras[letra] = 1;
        }
    }

    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letra = currentTile.innerText;

        if (word[c] == letra) {
            currentTile.classList.add("correto");
            correto += 1;
            countLetras[letra]--; 
        }
    }

  
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letra = currentTile.innerText;

        if (letra !== "" && !currentTile.classList.contains("correto")) {
            if (word.includes(letra) && countLetras[letra] > 0) {
                currentTile.classList.add("temletra");
                countLetras[letra]--; 
            } else {
                currentTile.classList.add("incorreto");
            }
        }
    }

    if (correto === width) {
        alert("Parabéns, você acertou a palavra! " + word2);
        gameOver = true;
    }
}

function reiniciaTabuleiro(){
     for(let r = 0; r < height; r++){
        for(let c = 0; c <width; c++){
            let caixinhaId = r.toString() + '-' + c.toString();
            let currentTile = document.getElementById(caixinhaId); 
            if (currentTile !== null) {
                currentTile.innerText = '';
                currentTile.classList.remove('correto');
                currentTile.classList.remove('incorreto');
                currentTile.classList.remove('temletra');
            }
        }
     }
     gameOver = false; 
     coluna = 0; 
     row = 0;
     
     document.getElementById("board").focus(); 

}



