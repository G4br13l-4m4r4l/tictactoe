var tabletop = {
    first_line_1: '', first_line_2: '', first_line_3:'',
    second_line_1: '', second_line_2:'', second_line_3: '',
    third_line_1: '', third_line_2: '', third_line_3: ''
};

var playerTurn = '';
var warning = '';
var playing = false;

//events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
});

//functions

function itemClick(event){

    let item = event.target.getAttribute('data-item');
    if(playing && tabletop[item] === ''){
        tabletop[item] = playerTurn;
        renderTabletop();
        toggleTurn();
    }
};


function reset(){
    warning = '';

    let randomNumber = Math.floor(Math.random() *2);
    
    playerTurn = (randomNumber === 0) ? 'x' : 'o';

    for(let cont in tabletop){
        tabletop[cont] = '';
    }

    playing = true;

    renderTabletop();
    renderInfo();
};

function renderTabletop(){
    for(let cont in tabletop){
        let item = document.querySelector(`div[data-item=${cont}]`);
        item.innerHTML = tabletop[cont];
    };

    check();
};

function renderInfo(){
    document.querySelector('.turn').innerHTML = playerTurn;

    document.querySelector('.result').innerHTML = warning;
};


function toggleTurn(){
     playerTurn = (playerTurn === 'x')? 'o' : 'x';
     renderInfo();
};

function check(){
    if(checkWinner('x')){
        warning = 'x'
        playing = false;
    }else if(checkWinner('o')){
        warning = 'o';
        playing = false;
    }else if(isFull()){
        warning = 'draw'
        playing = false;
    }
};

function checkWinner(player){
    var possibilities = [
        'first_line_1,first_line_2,first_line_3',
        'second_line_1,second_line_2,second_line_3',
        'third_line_1,third_line_2,third_line_3',
        'first_line_1,second_line_1,third_line_1',
        'first_line_2,second_line_2,third_line_2',
        'first_line_3,second_line_3,third_line_3',
        'first_line_1,second_line_2,third_line_3',
        'first_line_3,second_line_2,third_line_1' ];

    for(let win in possibilities){
        let arrayPos = possibilities[win].split(','); 
        let won = arrayPos.every(option=>tabletop[option]===player);
        if(won){
            return true;
        }
    }
    return false;
};

function isFull(){
    for(let cont in tabletop){
        if(tabletop[cont]===''){
            return false;
        }
    }
    return true;
};