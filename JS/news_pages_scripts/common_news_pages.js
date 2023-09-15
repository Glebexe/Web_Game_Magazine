function compileHandlebars(id, containerClass, data){
    const rawTemplate = document.getElementById(id).innerHTML;
    const compiledTemplate = Handlebars.compile(rawTemplate);
    const generatedHTML = compiledTemplate(data);
    
    const articleContainer = document.getElementsByClassName(containerClass)[0];    
    articleContainer.innerHTML = generatedHTML;
}

Handlebars.registerHelper("articleBeginning", function(text){
    let cleanText = text.replaceAll(/<[^>]*>/g, '');// remove html tags for safe slicing
    return cleanText.slice(0,500) + "...";
});

function gridSetup(){    
    const grid = document.querySelector(".grid_icon");
    const list = document.querySelector(".list_icon");
    const news_grid = document.querySelector(".news_grid");
    
    // If first time load, set grid_mode as grid
    if(!sessionStorage.getItem("grid_mode"))
        sessionStorage.setItem("grid_mode", "grid");
    
    // If grid_mode equal list, change grid to list
    if(sessionStorage.getItem("grid_mode") == "list")
        news_grid.classList.add("list");
    
    list.onclick = () =>{
        news_grid.classList.add("list");
        sessionStorage.setItem("grid_mode", "list");
    };

    grid.onclick = () =>{
        news_grid.classList.remove("list");
        sessionStorage.setItem("grid_mode", "grid");
    };
}

// Set the right article_id for each news card
function navigationSetup(){
    document.querySelectorAll('.news_card').forEach(card =>{
        card.onclick = () =>{
            sessionStorage.setItem("article_id", card.getAttribute("article_id"));
        }
    });
}