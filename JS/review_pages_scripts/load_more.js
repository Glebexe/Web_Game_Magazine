let allReviews = [];

// Load data
fetch("/JSON/reviews_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => loadData(data));

function loadData(reviewsData){
    let reviewsKeys = Object.keys(reviewsData);
    for(let i = 0; i < reviewsKeys.length; i++){
        allReviews.push(reviewsData[reviewsKeys[i]]);
    }
}

// If review_page_template opens the first time, number_of_parts initializes
if(!sessionStorage.getItem("number_of_parts"))
    sessionStorage.setItem("number_of_parts",1);

const button = document.querySelector(".button");
const navigationList = document.querySelector(".navigation_list");


button.addEventListener("click", () => {
    increaseNumberOfParts();
});

// Load new part of review cards to the webpage
function increaseNumberOfParts(){
    if(!isLastPage()){
        sortCards(sessionStorage.getItem("sort"),allReviews, sessionStorage.getItem("review_page_number"), Number(sessionStorage.getItem("number_of_parts"))+1);
        removeNavigationNumber();
        
        sessionStorage.setItem("number_of_parts", Number(sessionStorage.getItem("number_of_parts"))+1);
        navigationSetup();// need to assign article_id for newly loaded cards 
    }
    else{
        button.className = "button";// make button unclickable
    }
}

function removeNavigationNumber(){
    navigationList.removeChild(navigationList.getElementsByTagName("li")[navigationList.getElementsByTagName("li").length-2]);
}

function isLastPage(){
    return navigationList.getElementsByTagName("li")[navigationList.getElementsByTagName("li").length-2].className == "pageNum active";
}