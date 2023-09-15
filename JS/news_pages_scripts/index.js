// Load data
fetch("/JSON/news_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => createHTML(data));

function createHTML(articleData){    
    const articlesKeys = Object.keys(articleData);
    
    createTopNews(articleData, articlesKeys);
    createMainNews(articleData, articlesKeys);
    createNewsGrid(articleData, articlesKeys);   
    
    gridSetup();    
    indexNavigationSetup();
}

function createTopNews(articleData, articlesKeys){ 
    let articles = []; // articles to dispay at the top
    // Push 4 articles skipping the first
    for(let i = 1; i < 5; i++){
        articles.push(articleData[articlesKeys[i]]);
    }
    
    compileHandlebars("topNewsTemplate", "top_news_cards", articles);
}

function createMainNews(articleData, articlesKeys){    
    compileHandlebars("mainNewsTemplate", "main_news_card", articleData[articlesKeys[0]]);
}

function createNewsGrid(articleData, articlesKeys){
    let articles = []; // articles to dispay in the grid
    // Push next 6 articles skipping those that have already been displayed
    for(let i = 5; i < 11; i++){
        articles.push(articleData[articlesKeys[i]]);
    }
    
    compileHandlebars("newsTemplate", "news_grid", articles);
}

Handlebars.registerHelper("articleBeginningShorter", function(text){
    let cleanText = text.replaceAll(/<[^>]*>/g, '');// remove html tags for safe slicing
    let string = "";
    for(let i = 0; string.length < 55; i++)
        string += cleanText.split(' ')[i] + " ";
    return string;
});

// Set the right article_id for each news card
function indexNavigationSetup(){
    document.querySelectorAll('.content_image_card').forEach(image_container =>{
        image_container.onclick = () =>{
             sessionStorage.setItem("article_id",image_container.getAttribute("article_id"));
        }
    });
    document.querySelectorAll('.content_image_stripe').forEach(image_container =>{
        image_container.onclick = () =>{
             sessionStorage.setItem("article_id",image_container.getAttribute("article_id"));
        }
    });
    navigationSetup();
}