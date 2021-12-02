//funcion para agregar cards en el html
const agregarCardsProductolIndex = () => {
    productos.forEach((element) => {
        const $cardProducto = document.createElement("div");
        $cardProducto.id = element.id;
        $cardProducto.className = "col-12 col-md-6 col-lg-4 col-xl-3 my-3";
        $cardProducto.innerHTML += `
                        <div class="card" id="${element.id}" style="width: 18rem;">
                            <img src="img/${element.img}" class="card-img-top" alt="${element.nombre}">
                            <div class="card-body">
                                <p class="card-text">${element.nombre}</p>
                                <span>Ingredientes</span>
                                <button class="verIngredientes btn btn-outline-dark fw-bold ms-5">Ver más</button>
                                <ul id="listaIngredientes${element.id}">
                                </ul>
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
    await $.getJSON(url, (respuesta) => {
        respuesta;
        let productos = Object.keys(respuesta)
        productos.forEach((element) => {
            if (element === producto) {
                console.log(element)
                return element
            }
        })
    });
}

// Desafio clase 14 AJAX con jQuery
//captura los ingredientes de ingredientes.JSON y los retorna en un arreglo
const obtenerIngredientes = async (producto) => {
    const ingredientesProducto = [];
    const url = "../json/ingredientes.json";
    await $.getJSON(url, (respuesta) => {
        respuesta;
        for (const [productos, ingredientes] of Object.entries(respuesta)) {
            if (productos === producto) {
                ingredientesProducto.push(ingredientes);
            }
        }
    })
    return ingredientesProducto
}

//Funcion que dibuja en el html los ingredientes segun el producto
const modeloListaIngredientes = (ingrediente, id) => {
    $(`#listaIngredientes${id}`).append(`<li class="my-1 border-bottom-gray-1"><i class="far fa-check-circle color-goldenrod"></i> ${ingrediente}</li>`);
}

//funcion para pedir nombre del producto y llamar a la funcion que dibuja los ingredientes
const pedirNombreProducto = (e) => {
    return e.target.parentNode.parentNode.childNodes[3].childNodes[1].textContent
}

//funcion que recupera el id de la card
const obtenerIdCard = (e) => {
    return e.target.parentNode.parentNode.id
}

//Dibuja en el html los ingredientes en una lista
const dibujarIngredientes = (nombreProductoCard, id) => {
    obtenerIngredientes(nombreProductoCard).then(ingredientes => {
        ingredientes[0].forEach(element => {
            modeloListaIngredientes(element, id)
        })
    });
}

window.onload = function () {
    //Se cargan las cards en el html
    agregarCardsProductolIndex()

    //Se agrega el evento click a los bonotes de las cards para ver ingredientes
    $(".verIngredientes").on("click", (e) => {
        e.stopPropagation();
        const nombreProducto = pedirNombreProducto(e)
        const idCard = obtenerIdCard(e)
        //Si los <li> ya estan dibujados se les aplica slideToggle para que se oculten
        if (e.target.nextElementSibling.childNodes.length > 1) {
            $(`#listaIngredientes${idCard}`).slideToggle();
        } else {
            dibujarIngredientes(nombreProducto, idCard)
        }
    })

    if (localStorage.getItem("usuarioActual")) {
        habilitaBotonAgregarCarrito()
    } else {
        deshabilitaBotonAgregarCarrito()
        console.log("asdasd")
    }


};


