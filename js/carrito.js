//Captura los el id de la card del producto y la retorna
const capturarIdProducto = (e) => {
    const idCard = e.target.parentElement.parentElement.parentElement.id
    return parseInt(idCard)
}
//funcion para agregar cards en el html
const agregaCardProductoCarritoHtml = () => {
    let usuarioActual = capturarClienteActual();
    for (const [key, value] of Object.entries(usuarioActual.carritoCliente)) {
        $("#contenedorCarrito").prepend(`
        <div id="${value.id}" class="cardProductoCarrito d-flex flex-wrap align-items-center justify-content-evenly p-4 my-2">
            <div class="contenedorCarrito__img">
                <img class="imgCarrito" src="${value.img}" alt="">
            </div>
            <div>
                <h4>${value.nombre}</h4>
                <span>descripcion del producto riquísimo</span>
            </div>
            <div class="my-2">
                <span>c/u</span>
                <span>$<span class="precioProducto" >${value.precio}</span></span>
            </div>
            <div class="my-2 cardProductoCarrito__botonera">
                <button id="btnRestarProducto" class="btnRestarCarrito"><i class="fas fa-minus-circle"></i></button>
                <span id="cantidadProductos${value.id}" class="p-2 fs-5">${value.cantidad}</span>
                <button id="btnSumarProducto" class="btnSumarCarrito"><i class="fas fa-plus-circle"></i></button>
            </div>
            <div class="my-2">
                <span>$<span class="sumaProductos${value.id}" >${value.sumaProductos}</span></span>
            </div>
        </div>
        `);
    }
};

//Modifica la cantidad de productos en la card
const modificarCantidadProductosCard = (id, cantidad) => {
    $(`#cantidadProductos${id}`).text(`${cantidad}`)
}
//Modifica el valor de los productos en la card
const modificarValorProductosCard = (id, cantidad) => {
    $(`#sumaProductos${id}`).text(`${cantidad}`)
}

//modifica el texto de un elemento seleccionado
const modificaTextoElemento = (selector, texto, id) => {
    $(`${selector}${id}`).text(`${texto}`)
}

//funcion para mostrar la suma total de los productos en el carrito
const dibujarSumaTotalCarrito = () => {
    let usuarioActual = capturarClienteActual();
    $("#totalCarrito").text(usuarioActual.cuentaTotal);
}

const aumentaCantidadProductosCard = (id) => {
    const cantidad = parseInt($(`#cantidadProductos${id}`).text())
    return cantidad + 1
}

const restaCantidadProductosCard = (id) => {
    const cantidad = parseInt($(`#cantidadProductos${id}`).text())
    if (cantidad === 0) {
        return 0
    }
    return cantidad - 1
}
//Funcion sumar producto desde el carrito
/* const sumarProductoDesdeCarrito = (element) => {
    console.log(element.querySelector("#cantidadProductos").textContent)
    const productoElegido = {
        id: element.id,
        nombre: element.querySelector("h4").textContent,
        precio: parseInt(element.querySelector(".precioProducto").textContent),
        cantidad: parseInt(element.querySelector("#cantidadProductos").textContent),
        img: element.querySelector("img").src,
        sumaProductos: parseInt(element.querySelector(".sumaProductos").textContent)
    }
    if (carrito.hasOwnProperty(productoElegido.id)) {
        //Se aumenta la cantidad del producto en 1
        productoElegido.cantidad = 1 + carrito[productoElegido.id].cantidad;
    }
    //Se suman el precio de los productos por la canntidad del mismo producto
    productoElegido.sumaProductos = productoElegido.cantidad * productoElegido.precio;
    carrito[productoElegido.id] = { ...productoElegido };
    let usuarioActual = capturarClienteActual();
    usuarioActual.carritoCliente = carrito
    //Se suma el total del carrito
    usuarioActual.cuentaTotal = sumaTotalCarrito(usuarioActual);
    console.log(usuarioActual);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    crearContadorCarrito()
} */

//Funcion para dibujar el boton de comprar carrito
const dibujarBotonComprarCarrito = () => {
    $("#ContainerResultadoCarrito").append(`
        <div class="d-flex justify-content-center">
            <button id="btnComprarCarrito" class="btn btn-primary">Comprar</button>
        </div>
    `);
}





//Finaliza la compra con mercado pago
const finalizarCompra = () => {

    let usuarioActual = capturarClienteActual()
    let carrito = usuarioActual.carritoCliente
    let posicionOrigin = document.location.origin
    let url = "/pagado.html"
    if (posicionOrigin == "https://niitram.github.io") {
        url = "/Mc-Chessi/pagado.html"
    }
    //Construccion de objeto para enviar al servidor
    const caritoMapeado = carrito.map((producto) => {
        return {
            title: producto.nombre,
            description: "",
            picture_url: producto.img,
            category_id: producto.id,
            quantity: producto.cantidad,
            currency_id: "ARS",
            unit_price: producto.precio
        }
    })

    fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            //autenticacion con la credencial de prueba
            Authorization: 'Bearer TEST-5344314592224001-112814-4d170316beff6ac11f2542e19500fa82-165464610'
        },
        body: JSON.stringify({
            //items que quiero cobrar
            items: caritoMapeado,
            //URL a la que vuelve cuando termina la compra
            back_urls: {
                success: `${posicionOrigin}${url}`,
                fallure: window.location.href
            }
        })
    })
        .then(response => response.json())
        .then(data => {

            //Remplaza el link por el de mercado pago
            window.location.replace(data.init_point);

        })
}


/* curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d '{
  "items": [
    {
      "title": "Dummy Title",
      "description": "Dummy description",
      "picture_url": "http://www.myapp.com/myimage.jpg",
      "category_id": "cat123",
      "quantity": 1,
      "currency_id": "U$",
      "unit_price": 10
    }
  ],
  "payer": {
    "phone": {},
    "identification": {},
    "address": {}
  },
  "payment_methods": {
    "excluded_payment_methods": [
      {}
    ],
    "excluded_payment_types": [
      {}
    ]
  },
  "shipments": {
    "free_methods": [
      {}
    ],
    "receiver_address": {}
  },
  "back_urls": {},
  "differential_pricing": {},
  "tracks": [
    {
      "type": "google_ad"
    }
  ]
}' */




window.onload = () => {
    let usuarioActual = capturarClienteActual()

    console.log(window.location.href)
    console.log(document.location.origin)

    //los eventos click de los botones
    document.addEventListener("click", (e) => {

        //Evento comprar producto
        if (e.target.id == "btnComprarCarrito") {
            e.stopPropagation
            finalizarCompra()
        }

        //Evento sumar producto
        if (e.target.parentElement.id == "btnSumarProducto") {
            e.stopPropagation
            let id = capturarIdProducto(e)
            let cantidad = aumentaCantidadProductosCard(id)
            modificarCantidadProductosCard(id, cantidad)
            aumentaCantidadMismoProducto(usuarioActual, id)
            let sumaMismoProducto = sumaTotalMismoProducto(usuarioActual, id)
            modificaTextoElemento(".sumaProductos", sumaMismoProducto, id)
            let sumaTotalProductos = sumaTotalCarrito(usuarioActual)
            usuarioActual.cuentaTotal = sumaTotalProductos
            usuarioActual.cantidadProductos = usuarioActual.cantidadProductos + 1
            //Le agrega el id para que pueda tener el evneto restar
            $(`#contenedorCarrito #${id} .btnRestarCarrito`).attr("id", "btnRestarProducto")
            $("#totalCarrito").text(usuarioActual.cuentaTotal)
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
            crearContadorCarrito()
        }

        //Evento restar producto
        if (e.target.parentElement.id == "btnRestarProducto") {
            e.stopPropagation
            let id = capturarIdProducto(e)
            let cantidad = restaCantidadProductosCard(id)

            //Si la cantidad es 0
            if (cantidad <= 0) {
                modificarCantidadProductosCard(id, cantidad)
                modificaTextoElemento(".sumaProductos", cantidad, id)
                restaCantidadMismoProductoA0(usuarioActual, id)
                let sumaTotalProductos = restaTotalCarrito(usuarioActual, id)
                usuarioActual.cuentaTotal = sumaTotalProductos
                usuarioActual.cantidadProductos = usuarioActual.cantidadProductos - 1
                //Le saca el id para que no pueda tener el evento click y que no siga restando
                $(`#contenedorCarrito #${id} .btnRestarCarrito`).attr("id", "")
                $("#totalCarrito").text(usuarioActual.cuentaTotal)
            }
            else {
                modificarCantidadProductosCard(id, cantidad)
                restaCantidadMismoProducto(usuarioActual, id)
                let sumaMismoProducto = sumaTotalMismoProducto(usuarioActual, id)
                modificaTextoElemento(".sumaProductos", sumaMismoProducto, id)
                let sumaTotalProductos = sumaTotalCarrito(usuarioActual)
                console.log(usuarioActual.cantidadProductos)
                usuarioActual.cantidadProductos = usuarioActual.cantidadProductos - 1
                usuarioActual.cuentaTotal = sumaTotalProductos
                $("#totalCarrito").text(usuarioActual.cuentaTotal)
            }
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
            crearContadorCarrito()

        }
    })

    if (usuarioActual) {
        agregaCardProductoCarritoHtml();
        dibujarSumaTotalCarrito();
        if (usuarioActual.cuentaTotal > 0) {
            dibujarBotonComprarCarrito();
        }
    }
}