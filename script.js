const links = {

youtube:"https://www.youtube.com/@%E5%A5%B8",
discord:"https://discord.gg/hospitals",
tiktok:"https://www.tiktok.com/@goodbyeyoucruelworld"

};


document.getElementById("youtube").href = links.youtube;
document.getElementById("discord").href = links.discord;
document.getElementById("tiktok").href = links.tiktok;




/* STAR SYSTEM */

const stars = document.getElementById("stars");


const starAmount = 450;


for(let i = 0; i < starAmount; i++){

    const star = document.createElement("div");

    star.className = "star";


    const size = Math.random() * 3 + .5;


    star.style.width = size + "px";
    star.style.height = size + "px";


    star.style.left = Math.random()*100 + "%";
    star.style.top = Math.random()*100 + "%";


    star.style.opacity =
        Math.random() * .8 + .2;


    /*
    Different star speeds
    makes depth effect
    */

    const speed =
        Math.random()*50 + 20;


    star.style.animationDuration =
        speed + "s";


    star.style.animationDelay =
        -(Math.random()*speed)+"s";



    /*
    random horizontal drifting
    */

    const drift =
        (Math.random()*200-100)+"px";


    star.style.setProperty(
        "--drift",
        drift
    );



    /*
    random glow
    */

    if(size > 2.3){

        star.style.boxShadow =
        "0 0 8px white";

    }


    stars.appendChild(star);

}






/* SHOOTING STARS */


const shooting = 
document.getElementById("shooting-stars");



function createShootingStar(){

    const star =
    document.createElement("div");


    star.className =
    "shooting-star";


    star.style.left =
    Math.random()*80 + 20 + "%";


    star.style.top =
    Math.random()*40 + "%";


    shooting.appendChild(star);



    setTimeout(()=>{

        star.remove();

    },1500);


}



setInterval(()=>{


    if(Math.random() > .35){

        createShootingStar();

    }


},4000);






/* subtle mouse parallax */


let mouseX = 0;
let mouseY = 0;


document.addEventListener(
"mousemove",
(e)=>{


mouseX =
(e.clientX/window.innerWidth-.5)*20;


mouseY =
(e.clientY/window.innerHeight-.5)*20;



document.getElementById("stars").style.transform =

`translate(${mouseX}px,${mouseY}px)`;



});
