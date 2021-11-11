document
    .querySelector("#Ordenarmayor")
    .addEventListener("click", ordenarProductosMayorPrecio);
document
    .querySelector("#Ordenarmenor")
    .addEventListener("click", ordenarProductosMenorPrecio);

//funcion para agregar cards en el html
const agregarCardsProductolHtml = () => {
    productos.forEach((element) => {
        const $cardProducto = document.createElement("div");
        $cardProducto.id = element.id;
        $cardProducto.className = "col-12 col-md-6 col-lg-4 col-xl-3 my-3";
        $cardProducto.innerHTML += `
                        <div class="card" style="width: 18rem;">
                            <img src="${element.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${element.nombre}</p>
                                <span>$<span class="precioCard">${element.precio}</span></span>
                            </div>
                            <div class="d-flex justify-content-center my-2">
                                <button type="button" id="${element.id}" class="btn btn-primary btnAgregarCarrito">Agregar al
                                    carrito</button>
                            </div>
                        </div>
        `;
        document.getElementById("contenedorProductos").appendChild($cardProducto);
        document.getElementById(element.id).addEventListener("click", (e) => {
            if (e.target.className == "btn btn-primary btnAgregarCarrito") {
                AgregarAlCarrito(e)
            }
            e.stopPropagation();
        })
    });
};



agregarCardsProductolHtml()