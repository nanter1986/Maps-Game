
var panorama;

function streetViewMy() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: {lat: 35.50915947260658, lng: 24.022094434738168},
            pov: {
                heading: 34,
                pitch: 10,
            },
            fullscreenControl: false,
            zoomControl:false,
            scrollwheel:false,
            zoom:0,
            panControl:false,
            addressControl:false
        });

        console.log("str view");
    }

function recalculate() {
    var found=[];
    document.getElementById("textInfo").innerHTML=panorama.location.description+"<br>"+"here: "+panorama.position+"<br>heading:"+panorama.getPov().heading+"<br>pitch:"+panorama.getPov().pitch;
    console.log("here: "+panorama.position+"___heading:"+panorama.getPov().heading+"___pitch:"+panorama.getPov().pitch);
    var toRed=createRandomness();
    if(localStorage.getItem("foundArray",JSON.stringify())!=null){
        found=JSON.parse(localStorage.getItem("foundArray"));
        console.log("array found "+found);
    }

        if(toRed[0]>10){
            document.getElementById("textInfo").style.background="green";
            console.log("nothing here");
        }else if(found.length>0){
            for(var i=0;i<found.length;i++){
                if(found[i]==toRed[1]){
                    console.log("already found");
                }else{
                    document.getElementById("textInfo").style.background="red";
                    found.push(toRed[1]);
                    localStorage.setItem("foundArray",JSON.stringify(found));
                    console.log("found new.stringified and saved"+found);
                }
            }
        }else{
            document.getElementById("textInfo").style.background="red";
            found.push(toRed[1]);
            localStorage.setItem("foundArray",JSON.stringify(found));
            console.log("found new.stringified and saved"+found);
        }


    //streetViewMy();
}

//setInterval(recalculate,100);

function createRandomness() {
    var aLocalArray=[];
    var num1=100000*(panorama.position.lng()+panorama.position.lat());
    num1=Math.floor(num1);
    console.log(num1);
    var theString=""+num1
    var key1=Number(theString[theString.length-2]+theString[theString.length-1]);
    console.log(key1);
    aLocalArray[0]=key1;
    aLocalArray[1]=num1;
    return aLocalArray;
}
