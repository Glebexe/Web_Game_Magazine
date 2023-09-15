// Load data
fetch("/JSON/reviews_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => createHTML(data));

setTimeout(loadScore, 500);// Timeout to allow content being loaded

function loadScore(){    
    let score = Number(document.querySelector(".content").getAttribute("score"));

    document.querySelector(".scores").querySelectorAll("li")[Math.ceil(score/2)-1].style.fontSize = "60px";
    document.querySelector(".scores").querySelectorAll("li")[Math.ceil(score/2)-1].style.height = "150px";
}