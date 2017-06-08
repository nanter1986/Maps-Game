var player1;
var monster1;

function battleLoader(){
    makePlayer();
    makeMonster();
    displayPlayerStats();
    displayMonsterStats();
    writeCommentary("You encountered a <b>"+monster1.name+"</b>.Get ready for battle!");
}

function swordClick() {

}

function shieldClick() {

}

function potionClick() {

}

function writeCommentary(text){
    document.getElementById("commentary").innerHTML=text;
}

function displayPlayerStats() {
    document.getElementById("playerStats").innerHTML=
    "SWORD: "+player1.sword+
    "<br>SHIELD: "+player1.shield+
    "<br>POTION: "+player1.potion;
}

function displayMonsterStats() {
    document.getElementById("monsterStats").innerHTML=
    "<strong>"+monster1.name+"</strong>"+
    "<br>SWORD: "+monster1.sword+
    "<br>SHIELD: "+monster1.shield+
    "<br>POTION: "+monster1.health;
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
    var monsterNameLoad=localStorage.getItem("currentMonster");
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
            break;
        default:

    }
    monster1=new Monster(monsterNameLoad,sword,shield,health,image);
    document.getElementById("monsterImage").src=monster1.image;
}

function Player(sword,shield,potion){
    this.sword=sword;
    this.shield=shield;
    this.potion=potion;
    this.health=10;
}

function Monster(name,sword,shield,health,image){
    this.name=name;
    this.sword=sword;
    this.shield=shield;
    this.health=health;
    this.image=image;
}
