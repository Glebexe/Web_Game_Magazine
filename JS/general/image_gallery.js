function loadImageInteraction(){
    images = document.querySelectorAll('.image_container img');
    
    // When you click on an image, it is assigned popup-image
    document.querySelectorAll('.image_container').forEach(image_container =>{
        image_container.onclick = () =>{
            document.querySelector('.popup-image').style.display = 'block';
            document.querySelector('.popup-image img').src = image_container.querySelector('img').getAttribute('src');
        }
    });

    // When you click on the cross at the top-right side, popup-image closes
    document.querySelector('.popup-image span').onclick = () =>{
        document.querySelector('.popup-image').style.display = 'none';
    }

    // When you click on the right arrow, if it is possible, popup-image is changed for the right one
    document.querySelector('.popup-image .next').onclick = () =>{
        let currImage = document.querySelector('.popup-image img').src;
        
        for(let i = 0; i < images.length-1; i++)
            if(images[i].src == currImage)
                document.querySelector('.popup-image img').src = images[i+1].src;
    }

    // When you click on the left arrow, if it is possible, popup-image is changed for the left one
    document.querySelector('.popup-image .prev').onclick = () =>{
        let currImage = document.querySelector('.popup-image img').src;
        
        for(let j = images.length-1; j > 0; j--)
            if(images[j].src == currImage)
                document.querySelector('.popup-image img').src = images[j-1].src;
    }
}