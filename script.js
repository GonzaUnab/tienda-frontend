/* ------------------------------
BASE DE DATOS DE PRODUCTOS
------------------------------ */
const productos = [
    { id: 1, nombre: "Remera Oversize", precio: 9000, categoria: "remera", img: "static/remera1.jpg", img2: "static/remera1atras.jpg" },
    { id: 2, nombre: "Campera Urban", precio: 18000, categoria: "campera", img: "static/campera.jpg", img2: "static/camperaatras.jpg" },
    { id: 3, nombre: "Pantalón Cargo", precio: 15000, categoria: "pantalon", img: "static/pantalon.jpg" },
    { id: 4, nombre: "Buzo Classic", precio: 12000, categoria: "buzo", img: "static/buzo.jpg" },
    { id: 5, nombre: "Gorra Negra", precio: 7000, categoria: "accesorio", img: "static/gorra.jpg" },
    { id: 6, nombre: "Gorra Blanca", precio: 7000, categoria: "accesorio", img: "static/gorra2.jpg" },
    { id: 7, nombre: "Remera Street", precio: 8500, categoria: "remera", img: "static/remera2.jpg", img2: "static/remera2atras.jpg" },
    { id: 8, nombre: "Pantalón Slim", precio: 13000, categoria: "pantalon", img: "static/pantalon2.jpg" },
    { id: 9, nombre: "Zapatillas Urban", precio: 20000, categoria: "zapatillas", img: "static/zapatillas.jpg" },
];

/* ------------------------------
ELEMENTOS DEL DOM
------------------------------ */
const contenedor = document.getElementById("productos");
const filtros = document.querySelectorAll(".filtro");

const modal = document.getElementById("modal-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const contador = document.getElementById("contador");
const total = document.getElementById("total");

const btnVerCarrito = document.getElementById("ver-carrito");
const btnCerrarCarrito = document.getElementById("cerrar-carrito");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");

const btnModo = document.getElementById("modo-toggle");

/* ------------------------------
LOCAL STORAGE
------------------------------ */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* ------------------------------
RENDER DE PRODUCTOS
------------------------------ */
function renderProductos(lista = productos) {
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const tiene2 = p.img2 ? "dos-img" : "una-img";

        const card = document.createElement("div");
        card.classList.add("producto");
        card.innerHTML = `
            <div class="img-container ${tiene2}">
                <img src="${p.img}" alt="${p.nombre}" class="frente">
                ${p.img2 ? `<img src="${p.img2}" alt="${p.nombre}" class="espalda">` : ""}
            </div>
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
        `;
        contenedor.appendChild(card);
    });
}

renderProductos();

/* ------------------------------
FILTROS DE CATEGORÍA
------------------------------ */
filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        const categoria = btn.dataset.categoria;

        if (categoria === "todos") {
            renderProductos(productos);
        } else {
            renderProductos(productos.filter(p => p.categoria === categoria));
        }
    });
});

/* ------------------------------
CARRITO
------------------------------ */
function actualizarCarrito() {
    contador.textContent = carrito.length;
}

function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    carrito.push(prod);
    guardarCarrito();
    actualizarCarrito();
}

btnVerCarrito.addEventListener("click", () => {
    modal.classList.remove("oculto");
    listaCarrito.innerHTML = "";

    carrito.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - $${p.precio}`;
        listaCarrito.appendChild(li);
    });

    const totalPrecio = carrito.reduce((acc, p) => acc + p.precio, 0);
    total.textContent = `Total: $${totalPrecio}`;
});

btnCerrarCarrito.addEventListener("click", () => {
    modal.classList.add("oculto");
});

btnVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    listaCarrito.innerHTML = "";
    total.textContent = "Total: $0";
});

/* ------------------------------
MODO OSCURO
------------------------------ */
function cargarModoInicial() {
    const modo = localStorage.getItem("modo");
    if (modo === "dark") {
        document.body.classList.add("dark");
    }
}

cargarModoInicial();

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    } else {
        localStorage.removeItem("modo");
    }
});

/* ------------------------------
INICIALIZAR
------------------------------ */
actualizarCarrito();
