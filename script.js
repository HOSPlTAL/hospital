const links = {

    youtube: "https://www.youtube.com/@%E5%A5%B8",
    
    discord: "https://discord.gg/hospital",
    
    tiktok: "https://www.tiktok.com/@goodbyeyoucruelworld"

};



document.getElementById("youtube").href = links.youtube;

document.getElementById("discord").href = links.discord;

document.getElementById("tiktok").href = links.tiktok;






const starContainer = document.getElementById("stars");



for(let i = 0; i < 220; i++){


    const star = document.createElement("div");


    star.className = "star";


    const size =
    Math.random() * 3 + 1;


    star.style.width =
    size + "px";


    star.style.height =
    size + "px";



    star.style.left =
    Math.random()*100 + "%";



    star.style.top =
    Math.random()*100 + "%";



    star.style.animationDuration =
    Math.random()*25 + 20 + "s";



    star.style.animationDelay =
    Math.random()*20 + "s";



    starContainer.appendChild(star);


}
