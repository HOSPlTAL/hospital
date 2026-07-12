const links = {

    youtube: "https://www.youtube.com/@%E5%A5%B8",
    
    discord: "https://discord.gg/hospital",
    
    tiktok: "https://www.tiktok.com/@goodbyeyoucruelworld"

};



document.getElementById("youtube").href = links.youtube;

document.getElementById("discord").href = links.discord;

document.getElementById("tiktok").href = links.tiktok;



// Extra loading effect

window.onload = () => {

    document.body.style.opacity = "1";

};
