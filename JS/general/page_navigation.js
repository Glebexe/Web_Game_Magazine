// Find element in navigation_list and set it as active according to opened page
function setActivePage(itemName){
     const navPageNumbers = document.getElementsByClassName("navigation_list")[0].querySelectorAll('li');

    for(let i = 1; i < navPageNumbers.length-1; i++){        
        navPageNumbers[i].className = "pageNum";
    }
    navPageNumbers[Number(sessionStorage.getItem(itemName))+1].className = "pageNum active";
}

function bottomPagesNavigation(itemName, location){
    let navPages = document.getElementsByClassName("navigation_list")[0].querySelectorAll('li');
    
    // User clicks on the next page arrow on the bottom navigation panel
    document.querySelector(".next").onclick = () =>{
         navPages = document.getElementsByClassName("navigation_list")[0].querySelectorAll('li');
        //If it is not the last page, load next page
        if(navPages[navPages.length-2].className != "pageNum active"){
            sessionStorage.setItem(itemName, Number(sessionStorage.getItem(itemName))+1);
            window.location = location;
        }
    }

    // User clicks on the previous page arrow on the bottom navigation panel
    document.querySelector(".prev").onclick = () =>{
        //If it is not the first page, load previous page
        if(navPages[1].className != "pageNum active"){
            sessionStorage.setItem(itemName, Number(sessionStorage.getItem(itemName))-1);
            
            if(Number(sessionStorage.getItem(itemName)) == 0 && location == "/HTML/news_page_template.html")
                window.location = "/index.html";
            else
                window.location = location;
        }
    };

    const navPageNumbers = document.getElementsByClassName("navigation_list")[0].querySelectorAll('li');
    for(let i = 1; i < navPageNumbers.length-1; i++){
        // User clicks on the page number on the bottom navigation panel
        navPageNumbers[i].onclick = () =>{                    
            sessionStorage.setItem(itemName,i-1);
            if(i == 1 && location == "/HTML/news_page_template.html")
                window.location = "/index.html";
            else
                window.location = location;
        };
    }
}