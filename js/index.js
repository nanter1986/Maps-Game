var panorama;
var sword = [];
var shield = [];
var potion = [];
var potionAvailable = 0;
var beastEncounters = [];
var audio = new Audio("sound/tad.m4a");

function streetViewMy() {
  var curLoc;
  if (JSON.parse(localStorage.getItem("currentLocation")) != null) {
    curLoc = JSON.parse(localStorage.getItem("currentLocation"));
  } else {
    curLoc = {
      lat: 35.50915947260658,
      lng: 24.022094434738168
    };
    localStorage.setItem("currentLocation", JSON.stringify(curLoc));
  }
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      position: curLoc,
      pov: {
        heading: 34,
        pitch: 10,
      },
      fullscreenControl: false,
      zoomControl: false,
      scrollwheel: false,
      zoom: 0,
      panControl: false,
      addressControl: false
    });
  panorama.position_changed = function() {
    recalculate();
    console.log("position changed");
  }
  if (localStorage.getItem("swordFound") != null) {
    sword = JSON.parse(localStorage.getItem("swordFound"));
    console.log("sword array found" + sword);
    if (localStorage.getItem("shieldFound") != null) {
      shield = JSON.parse(localStorage.getItem("shieldFound"));
      console.log("shield array found " + shield);
    }
    if (localStorage.getItem("potionFound") != null) {
      potion = JSON.parse(localStorage.getItem("potionFound"));
      console.log("potion array found " + potion);
    }
    if (localStorage.getItem("potionAvailable") != null) {
      potionAvailable = localStorage.getItem("potionAvailable");
      console.log("potion av found " + potionAvailable);
    }
    if (localStorage.getItem("beastsEncountered") != null) {
      beastEncounters = JSON.parse(localStorage.getItem("beastsEncountered"));
      console.log("beast Encounters array found " + beastEncounters);
    }
    console.log("str view ready!");
  }

  function recalculate() {

    var existsAlready = false;
    console.log("here: " + panorama.position + "___heading:" + panorama.getPov().heading + "___pitch:" + panorama.getPov().pitch);
    var toRed = createRandomness();

    document.getElementById("textInfo").innerHTML = panorama.location.description + "<br>" + "here: " + panorama.position + "<br>heading:" + panorama.getPov().heading + "<br>pitch:" + panorama.getPov().pitch +
      "<br>sword found: " + sword.length +
      "<br>shield found: " + shield.length +
      "<br>potion found: " + potionAvailable;

    if (toRed[0] > 80) {
      proccessEncounter(beastEncounters, toRed);

    } else if (toRed[0] > 30) {
      document.getElementById("textInfo").style.background = "green";
      document.getElementById("imgInfo").src = "img/black.jpg"
      console.log("nothing here");
    } else if (toRed[0] > 20) {
      selectFoundItem(sword, toRed, "swordFound", "sword.jpg");

    } else if (toRed[0] > 10) {
      selectFoundItem(shield, toRed, "shieldFound", "shield.png");

    } else if (toRed[0] > 0) {
      selectFoundItem(potion, toRed, "potionFound", "potion.jpg");

    }
    localStorage.setItem("currentLocation", JSON.stringify(panorama.position));

    //streetViewMy();
  }

  function proccessEncounter(beastEncounters, toRed) {
    var existsAlready = false;
    var nameAndId = [];
    if (beastEncounters.length != 0) {
      for (var i = 0; i < beastEncounters.length; i++) {
        if (beastEncounters[i] == toRed[1]) {
          document.getElementById("textInfo").style.background = "green";
          document.getElementById("imgInfo").src = "img/black.jpg"
          existsAlready = true;
          console.log("already found that beast");

        }
      }
    }
    if (existsAlready == false) {
      nameAndId.push("chimera");
      nameAndId.push(toRed[1]);
      localStorage.setItem("currentMonster", JSON.stringify(nameAndId));
      console.log("Beast Encounter " + nameAndId[0] + " " + nameAndId[1]);
      setTimeout(function() {
        console.log("to battle again bitch :P");
        console.log(toRed[1]);
        console.log(beastEncounters);
        window.location.href = "battleScreen.html";
      }, 2000);
    }


  }

  function selectFoundItem(array, toRed, localStorageName, photoFileName) {
    var existsAlready = false;
    if (array.length != 0) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == toRed[1]) {
          document.getElementById("textInfo").style.background = "green";
          document.getElementById("imgInfo").src = "img/black.jpg"
          existsAlready = true;
          console.log("already found");
        }
      }
      if (existsAlready == false) {
        document.getElementById("textInfo").style.background = "red";
        document.getElementById("imgInfo").src = "img/" + photoFileName;
        array.push(toRed[1]);
        localStorage.setItem(localStorageName, JSON.stringify(array));
        console.log("found new.stringified and saved" + array);
        if (photoFileName == "potion.jpg") {
          potionAvailable++;
        }
        audio.play();

      }
    } else {
      document.getElementById("textInfo").style.background = "red";
      document.getElementById("imgInfo").src = "img/" + photoFileName;
      array.push(toRed[1]);
      localStorage.setItem(localStorageName, JSON.stringify(array));
      console.log("found new.stringified and saved" + array);
      if (photoFileName == "potion.jpg") {
        potionAvailable++;
      }
      audio.play();
    }
  }


  function createRandomness() {
    var aLocalArray = [];
    var num1 = 100000 * (panorama.position.lng() + panorama.position.lat());
    num1 = Math.floor(num1);
    console.log(num1);
    var theString = "" + num1
    var key1 = Number(theString[theString.length - 2] + theString[theString.length - 1]);
    console.log(key1);
    aLocalArray[0] = key1;
    aLocalArray[1] = num1;
    return aLocalArray;
  }
}
