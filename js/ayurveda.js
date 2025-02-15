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
