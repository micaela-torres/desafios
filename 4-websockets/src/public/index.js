const socket = io("http://localhost:8080")

socket.on('products', async product => {
    const html = await makeHtmlCards(product);
    
    document.querySelector("products").innerHTML = html;
});
const makeHtmlCards = async (products) => {

    const URI = fetch("../views/index.handlebars");
    const data = await URI;
    const textHtml = await data.text();
    const template = Handlebars.compile(textHtml);
    return template( products );
};