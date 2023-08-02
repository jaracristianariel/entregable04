const socketClient = io();

socketClient.on("products", (obj) => {
    updateProductsList(obj)
})

function updateProductList(products) {
    let div = document.getElementById("list-products");
    let productos = "";
    products.forEach((product) => {
        productos += `
        <article class="container">
            <div class="card">
                <div class="imgBx">
                    <img src="${product.thumbnail}" width="150" />
                </div>
                <div class="contentBx">
                    <h2>${product.title}</h2>
                    <div class="size">
                    <h3>${product.description}</h3>
                    </div>
                    <div class="color">
                    <h3>${product.price}</h3>
                    </div>
                    <a href="#">Buy Now</a>
                </div>
            </div>        
        </article>         
    `;
    });
    div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;

socketClient.emit("addProducts", {
    title,
    description,
    stock,
    thumbnail,
    price,
    code,
});
form.reset();
});
document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteIdInput = document.getElementById("id-prod");
    const deleteId = parseInt(deleteIdInput.value);
    socketClient.emit("deleteProducts", deleteId);
    deleteIdInput.value = "";
});