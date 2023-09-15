// Load data
fetch("/JSON/news_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => createHTML(data));

function createHTML(articleData){
    createNewsGrid(articleData);

    gridSetup();    
    navigationSetup();
}

function createNewsGrid(articleData){
    let articlesKeys = Object.keys(articleData);
    let articles = [];

    // Form articles data array with 9 elements staring from 10th article + number of page multyplied by 9
    for(let i = 11+(sessionStorage.getItem("news_page_number")-1)*9; i < 20+(sessionStorage.getItem("news_page_number")-1)*9; i++){
        articles.push(articleData[articlesKeys[i]]);
    }
    compileHandlebars("newsGridTemplate", "news_grid", articles);
}