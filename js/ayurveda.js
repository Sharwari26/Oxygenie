let previewContainer = document.querySelector('.card-preview');
let previewBox = document.querySelectorAll('.preview');

document.querySelectorAll('.cards-display .ayur').forEach(product =>{
    product.onclick =() =>{
        previewContainer.style.display = 'flex';
        let name = product.getAttribute('data-name');
        previewBox.forEach(preview =>{
            let target = preview.getAttribute('data-target');
            if(name == target){
                preview.classList.add('active');
            }
        });
    };

});

  

previewBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    }; 

});



// JavaScript to enable search functionality

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const searchButton = document.querySelector(".search-bar a");
    const items = document.querySelectorAll(".searchable"); // Select searchable elements

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase(); // Get the search value

        let found = false; // To check if any match is found

        items.forEach(item => {
            const text = item.textContent.toLowerCase();

            if (text.includes(query)) {
                item.style.display = "block"; // Show matching items
                found = true;
            } else {
                item.style.display = "none"; // Hide non-matching items
            }
        });

        // If search is empty, show all items
        if (query === "") {
            items.forEach(item => item.style.display = "block");
        }
    }

    // Search when typing
    searchInput.addEventListener("input", performSearch);

    // Search when clicking the button
    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents default behavior of anchor tag
        performSearch();
    });
});



