var player1;
var monster1;
var playersTurn=true;
var gameRunning=true;


function battleLoader(){
    makePlayer();
    makeMonster();
    displayPlayerStats();
    displayMonsterStats();
    writeCommentary("You encountered a <b>"+monster1.name+"</b>.Get ready for battle!<br>"+
    "-Attack with the sword.<br>"+
    "-Block any attack but lose shield points with the shield<br>"+
    "-Heal with potions.");
}

function swordClick() {
    winCondition();
    if(playersTurn==true && gameRunning==true){
        playersTurn=false;
        var actualDamage=0;
        var damage=player1.sword/monster1.shield;
        if(damage<1){
            actualDamage=1;
        }else{
            actualDamage=Math.round(damage);
        }
        monster1.health=monster1.health-actualDamage;
        displayMonsterStats();
        writeCommentary("You dealt <b>"+actualDamage+"</b> points of damage");
    }
    setTimeout(beastTurn,2000);
}

function beastTurn() {
    winCondition();
    if(playersTurn==false && gameRunning==true){
        var actualDamage=0;
        var damage=monster1.sword/player1.shield;
        if(damage<1){
            actualDamage=1;
        }else{
            actualDamage=Math.round(damage);
        }
        player1.health=player1.health-actualDamage;
        displayPlayerStats();
        writeCommentary("You received <b>"+actualDamage+"</b> points of damage!<br><b>OUCH!</b>");
    }
    playersTurn=true;
    setTimeout(winCondition,1000);

}

function shieldClick() {
    winCondition();
}

function potionClick() {
    winCondition();
    if(player1.potion>0){
        playersTurn=false;
        player1.potion=player1.potion-1;
        player1.health+=10;
        displayPlayerStats();
        writeCommentary("You used a potion and gained 10 health!");
        setTimeout(beastTurn,2000);
    }
}

function winCondition(){
    if(player1.health<=0){
        gameRunning=false;
        writeCommentary("You lost!");
    }else if(monster1.health<=0){
        gameRunning=false;
        writeCommentary("You won!");
        setTimeout(saveData,1000);
    }
}

function saveData(){
    if(JSON.parse(localStorage.getItem("beastEncounters"))==null){
        var beastEncounters=[];
        beastEncounters.push(monster1.id);
        localStorage.setItem("beastsEncountered",JSON.stringify(beastEncounters));
    }else{
        var beastEncounters=JSON.parse(localStorage.getItem("beastEncounters"));
        beastEncounters.push()
        localStorage.setItem("beastsEncountered",JSON.stringify(beastEncounters));
    }
    window.location.href="index.html";
}

function writeCommentary(text){
    document.getElementById("commentary").innerHTML=text;
}

function displayPlayerStats() {
    document.getElementById("playerStats").innerHTML=
    "SWORD: "+player1.sword+
    "<br>SHIELD: "+player1.shield+
    "<br>POTION: "+player1.potion+
    "<br>HEALTH: "+player1.health;
}

function displayMonsterStats() {
    document.getElementById("monsterStats").innerHTML=
    "<strong>"+monster1.name+"</strong>"+
    "<br>SWORD: "+monster1.sword+
    "<br>SHIELD: "+monster1.shield+
    "<br>HEALTH: "+monster1.health;
}

function makePlayer(){
    var sw=JSON.parse(localStorage.getItem("swordFound"));
    if(sw==undefined){
        sw=[];
    }
    var sh=JSON.parse(localStorage.getItem("shieldFound"));
    if(sh==undefined){
        sh=[];
    }
    var pot=JSON.parse(localStorage.getItem("potionFound"));
    if(pot==undefined){
        pot=[];
    }
    player1=new Player(sw.length,sh.length,pot.length);
}

function makeMonster(){
    var nameAndId=JSON.parse(localStorage.getItem("currentMonster"));
    var monsterNameLoad=nameAndId[0];
    var id=0;
    var sword=1;
    var shield=1;
    var health=1;
    var image="img/black.jpg";
    switch (monsterNameLoad) {
        case "chimera":
            sword=10;
            shield=5;
            health=10;
            image="img/threeHeaded.jpg";
            id=nameAndId[1];
            break;
        default:

    }
    monster1=new Monster(monsterNameLoad,sword,shield,health,image,id);
    document.getElementById("monsterImage").src=monster1.image;
}

function Player(sword,shield,potion){
    this.sword=sword;
    this.shield=shield;
    this.potion=potion;
    this.health=10;
}

function Monster(name,sword,shield,health,image,id){
    this.name=name;
    this.sword=sword;
    this.shield=shield;
    this.health=health;
    this.image=image;
    this.id=id;
}
