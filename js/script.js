let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio, imagen) {
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
        total += precio;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1, imagen: imagen });
        total += precio;
    }

    actualizarCarrito();
}


function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');

    carritoLista.innerHTML = '';
    totalElement.textContent = total.toFixed(2);

    carrito.forEach(producto => {
        const li = document.createElement('li');
        
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.className = 'img-carrito';
        img.alt = producto.nombre;
        li.appendChild(img);

        const spanNombre = document.createElement('span');
        spanNombre.textContent = `x ${producto.cantidad}`;
        li.appendChild(spanNombre);

        const spanPrecio = document.createElement('span');
        spanPrecio.textContent = ` - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        li.appendChild(spanPrecio);

        const botonEliminar = document.createElement('button');
        const iconoEliminar = document.createElement('i');
        iconoEliminar.className = 'fas fa-trash-alt';
        botonEliminar.appendChild(iconoEliminar);
        botonEliminar.className = 'boton-eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(producto.nombre);

        li.appendChild(botonEliminar);
        carritoLista.appendChild(li);
    });
}

function eliminarDelCarrito(nombre) {
    const index = carrito.findIndex(item => item.nombre === nombre);
    const producto = carrito[index];
    total -= producto.precio;

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

function mostrarCarrito() {
    document.getElementById("carrito").style.right = "0";
}

function cerrarCarrito() {
    document.getElementById("carrito").style.right = "-300px";
}
