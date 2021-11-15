//funcion para agregar cards en el html
const agregarCardsProductolIndex = () => {
    productos.forEach((element) => {
        const $cardProducto = document.createElement("div");
        $cardProducto.id = element.id;
        $cardProducto.className = "col-12 col-md-6 col-lg-4 col-xl-3 my-3";
        $cardProducto.innerHTML += `
                        <div class="card" style="width: 18rem;">
                            <img src="img/${element.img}" class="card-img-top" alt="...">
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

//Verifica si el nombre ingresado esta en ingredientes.Json y devuelve true o false en dicho caso
const esNombreProducto = async (producto) => {
    const url = "../json/ingredientes.json";
    $.get(url, (respuesta) => {
        respuesta;
        let productos = Object.keys(respuesta)
        productos.forEach((element) => {
            if (element === producto) {
                return element
            }
            else {
                return alert("El producto no existe")
            }
        })
    });
}
//captura los ingredientes de ingredientes.JSON y los retorna en un arreglo
const obtenerIngredientes = (producto) => {
    const ingredientesProducto = [];
    const url = "../json/ingredientes.json";
    $.get(url, (respuesta) => {
        respuesta;
        for (const [productos, ingrediente] of Object.entries(respuesta)) {
            /* console.log("key: ", producto)
            console.log("ingrediente: ", ingrediente) */
            if (productos === producto) {
                ingredientesProducto.push(ingrediente);
            }
        }
    });
    return ingredientesProducto;
}
//Funcion que dibuja en el html los ingredientes segun el producto
const dibujarIngredientes = (ingrediente) => {
    $("listaIngredientes").append(`<li>${ingrediente}</li>`);
}
//funcion ayncronica para pedir nombre del producto y llamar a la funcion que dibuja los ingredientes
const pedirNombreProducto = async (e) => {
    const nombreProductoCard = e.target.previousSibling.previousSibling.previousSibling.previousSibling.textContent
    const nombreProducto = await esNombreProducto(nombreProductoCard);
    if (nombreProductoCard === nombreProducto) {
        console.log("Hola")
    }
}
//se agre el evento click a los bonotes de las cards para ver ingredientes
$(".verIngredientes").on("click", (e) => {
    debugger
    pedirNombreProducto(e)
})

//Se cargan las cards en el html
agregarCardsProductolIndex()



