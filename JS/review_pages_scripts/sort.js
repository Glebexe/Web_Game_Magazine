// Basis for this script is taken from https://github.com/saam-khatri/Filter-Sort/tree/main/js

function sortCards(mode, allReviews, startPart, numberOfPartsToDisplay){
    if (mode == "newest") 
        createHTMLCards(getReviewsPart(sortByDate(allReviews, false), startPart, numberOfPartsToDisplay, 3));	
    else if (mode == "oldest") 
        createHTMLCards(getReviewsPart(sortByDate(allReviews, true), startPart, numberOfPartsToDisplay, 3));	
    else if (mode == "best_games") 
        createHTMLCards(getReviewsPart(sortByScore(allReviews, false), startPart, numberOfPartsToDisplay, 3));
    else if (mode == "worst_games") 
        createHTMLCards(getReviewsPart(sortByScore(allReviews, true), startPart, numberOfPartsToDisplay, 3));
}

function sortByScore(reviews, asc){
    let dm, sortli;
    dm = asc ? 1 : -1;// sort in ascending or descending order
    sortli = reviews.sort((a, b)=>{
        const ax = Number(a.score);
        const bx = Number(b.score);
        return ax > bx ? (1*dm) : (-1*dm);
    });
    return sortli;
}
function sortByDate(reviews, asc){
    let dm, sortli;
    dm = asc ? 1 : -1;// sort in ascending or descending order
    sortli = reviews.sort((a, b)=>{
        const aDay = Number(a.date.split('.')[0]);
        const aMon = Number(a.date.split('.')[1]);
        const aYear = Number(a.date.split('.')[2]);

        const bDay = Number(b.date.split('.')[0]);
        const bMon = Number(b.date.split('.')[1]);
        const bYear = Number(b.date.split('.')[2]);

        const ax = aYear*365 + aMon*30 + aDay;// converting everything to days
        const bx = bYear*365 + bMon*30 + bDay;// converting everything to days
        return ax > bx ? (1*dm) : (-1*dm);
    });
    return sortli;
}

// Returns array with review articles data from required parts of articles array 
function getReviewsPart(array, start, partsNeeded, totalNumberOfParts){
    let cards = [];
    for(let i = Math.ceil(array.length/totalNumberOfParts*Number(start)); i < array.length/totalNumberOfParts*Number(partsNeeded)+array.length/totalNumberOfParts*Number(start); i++){
        cards.push(array[i]);
    }
    return cards;
}

function createHTMLCards(data){
    const rawTemplate = document.getElementById("reviewsGridTemplate").innerHTML;
    const compiledTemplate = Handlebars.compile(rawTemplate);
    const generatedHTML = compiledTemplate(data);

    const articleContainer = document.getElementsByClassName("reviews_grid")[0];
    articleContainer.innerHTML = generatedHTML;
}