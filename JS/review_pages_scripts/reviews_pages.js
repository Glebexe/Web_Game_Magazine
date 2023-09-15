const dropdown = document.querySelector('.dropdown_sort_categories');

//Get inner elements from dropdown
const select = dropdown.querySelector('.select');
const arrow = dropdown.querySelector('.arrow');
const droplist = dropdown.querySelector('.droplist');
const droplistOptions = dropdown.querySelectorAll('.droplist li');
const selected = dropdown.querySelector('.selected');

//Load data
fetch("/JSON/reviews_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => createHTML(data));

function createHTML(reviewData){
    sortSetup();
    
    createReviewsGrid(reviewData);
    
    navigationSetup();
    dropdownSetup();
}

function createReviewsGrid(reviewData){
    
    const reviewsKeys = Object.keys(reviewData);
    let reviews = [];
    for(let i = 0; i < reviewsKeys.length; i++){
        reviews.push(reviewData[reviewsKeys[i]]);
    }
    
    //If active page is 1 and 2 parts already have been loaded, remove last page option from bottom navigation panel
    if(sessionStorage.getItem("number_of_parts") == "2" && sessionStorage.getItem("review_page_number") == "1")
       removeNavigationNumber();
    
    let partNumber = 1;
    if(sessionStorage.getItem("review_page_number") != "0")
        partNumber = Number(sessionStorage.getItem("number_of_parts"));
    
    sessionStorage.setItem("number_of_parts", 1);
    sortCards(sessionStorage.getItem("sort"), reviews, 
              Number(sessionStorage.getItem("review_page_number"))+partNumber-1, 
              sessionStorage.getItem("number_of_parts"));
}

// Set the right article_id for each review card
function navigationSetup(){
    document.querySelectorAll('.review_card').forEach(card =>{
        card.onclick = () =>{
            sessionStorage.setItem("article_id", card.getAttribute("article_id"));
        }
    });
}

function dropdownSetup(){
    select.onclick = () =>{        
        select.classList.toggle('select-clicked');// add the clicked select styles to the select element       
        arrow.classList.toggle('arrow-rotate');// add the rotate styLes to the arrow eLement        
        droplist.classList.toggle('droplist-open');// add the open styles to the droplist element
    };

    droplistOptions.forEach(option => {
        option.onclick = () =>{
            makeActive(option)
        };
    });
}

function makeActive(option){
    selected.innerText = option.innerText;
    select.classList.remove('select-clicked');// remove select-clicked styles from the select element
    arrow.classList.remove('arrow-rotate');// remove arrow-rotate styles from the arrow element
    droplist.classList.remove('droplist-open');// remove droplist-open styles from the droplist element

    droplistOptions.forEach(option => {
        option.classList.remove('active');
    }); 
    option.classList.add('active');
}

function sortSetup(){
    //If review_page_template opens for the first time, initialize sort with newest
    if(!sessionStorage.getItem("sort"))
        sessionStorage.setItem("sort", "newest");
    
    let sortVariants = document.querySelectorAll('.variant');
    for(let i = 0; i < sortVariants.length; i++){
        sortVariants[i].classList.remove("active");
    }
    
    document.querySelector('.variant.' + sessionStorage.getItem("sort")).classList.add("active");
    
    // Setup click event on each sort option
    sortVariants.forEach(variant =>{
        variant.addEventListener('click', () => { // .onclick() does not work
            for(let i = 0; i < sortVariants.length; i++){
                // All sort variants make inactive except variants with variant.classList[1] name
                if(sortVariants[i].classList[1] != variant.classList[1])
                    sortVariants[i].classList.remove("active");
                else{
                    if(sortVariants[i].getAttribute("type") == "list")
                        makeActive(sortVariants[i]);
                    else
                        sortVariants[i].classList.add("active");
                }
            }
            sessionStorage.setItem("sort", variant.classList[1]);
            sortCards(variant.classList[1], allReviews, sessionStorage.getItem("review_page_number"), sessionStorage.getItem("number_of_parts"));
            
            navigationSetup();
        });
    });
}