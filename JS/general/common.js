generalLinksSetup();

// Restet storage items when you go to news or reviews pages
function generalLinksSetup(){
    document.querySelectorAll(".review_link").forEach(link =>{
        link.onclick = () =>{
             resetStorage();            
        }
    });

    document.querySelectorAll(".news_link").forEach(link =>{
        link.onclick = () =>{
            resetStorage();
        }
    });
}

function resetStorage(){
    sessionStorage.setItem("number_of_parts", 1);
    sessionStorage.setItem("review_page_number", 0);
    sessionStorage.setItem("news_page_number", 0);   
}