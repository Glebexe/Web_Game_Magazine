function createHTML(articleData){
    var rawTemplate = document.getElementById("articleTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(articleData[sessionStorage.getItem("article_id")]);

    var articleContainer = document.querySelector(".article-container");
    articleContainer.innerHTML = generatedHTML;
    
    loadImageInteraction();
}

// Split a whole article into two parts which is displayed
// one above the images another under the images 
Handlebars.registerHelper("firstArticlePart", function(text){
    let firstPart = "";
    let splitText = text.split("</p>");
    for(let i = 0; i < splitText.length/2-1; i++){
        firstPart += splitText[i]+"</p>";
    }
    return firstPart;
});
Handlebars.registerHelper("secondArticlePart", function(text){
    let secondPart = "";
    let splitText = text.split("</p>");
    for(let i = Math.floor(splitText.length/2); i < splitText.length; i++){
        secondPart += splitText[i]+"</p>";
    }
    return secondPart;
});