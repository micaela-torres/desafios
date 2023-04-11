const formProducts = () => {
    const formProducts = document.querySelector('#formUpload');
    
    if(formProducts instanceof HTMLFormElement){
        formProducts.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(formProducts);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            fetch('/api/inventoryupload', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    };
};

formProducts();