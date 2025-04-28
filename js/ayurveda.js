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

// Function to get URL parameter
function getPlantQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('plant'); // returns null if not found
}

// After page loads
window.addEventListener('DOMContentLoaded', () => {
    const plantQuery = getPlantQuery();
    if (plantQuery) {
        // Find the card by matching the text inside .cards_des
        const allCards = document.querySelectorAll('.cards_article');

        allCards.forEach(card => {
            const plantName = card.querySelector('.cards_des')?.textContent.trim().toLowerCase();
            if (plantName === plantQuery) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.border = "3px solid green"; // optional highlight
                card.style.boxShadow = "0 0 20px green"; // optional glow effect
            }
        });
    }
});
