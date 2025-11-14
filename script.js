const productos = [
{ id: 1, nombre: "Remera Oversize", precio: 9000, categoria: "remera", img: "static/remera1.jpg", img2: "static/remera1atras.jpg" },
{ id: 2, nombre: "Campera Urban", precio: 18000, categoria: "campera", img: "static/campera.jpg", img2: "static/camperaatras.jpg" },
{ id: 3, nombre: "Pantalón Cargo", precio: 15000, categoria: "pantalon", img: "static/pantalon.jpg" },
{ id: 4, nombre: "Buzo Classic", precio: 12000, categoria: "buzo", img: "static/buzo.jpg" },
{ id: 5, nombre: "Gorra Negra", precio: 7000, categoria: "accesorio", img: "static/gorra.jpg" },
{ id: 6, nombre: "Gorra Blanca", precio: 7000, categoria: "accesorio", img: "static/gorra2.jpg" },
{ id: 7, nombre: "Remera ", precio: 8500, categoria: "remera", img: "static/remera2.jpg", img2: "static/remera2atras.jpg"},
{ id: 8, nombre: "Pantalón", precio: 13000, categoria: "pantalon", img: "static/pantalon2.jpg" },
{ id: 9, nombre: "zapas", precio: 20000, categoria: "zapatillas", img: "static/zapatillas.jpg" },

];

const contenedor = document.getElementById("productos");
const filtros = document.querySelectorAll(".filtro");
const modal = document.getElementById("modal-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const contador = document.getElementById("contador");
const total = document.getElementById("total");

let carrito = [];

/* ---------- FUNCIÓN NUEVA: mostrar productos con dos imágenes ---------- */
function renderProductos(lista = productos) {
contenedor.innerHTML = "";
lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto");

    // SI tiene 2 imágenes → agregar clase "dos-img"
    const tiene2 = p.img2 ? "dos-img" : "una-img";

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

/* ---------- Render inicial ---------- */
renderProductos(productos);


/* ---------- Filtros ---------- */
filtros.forEach(btn => {
btn.addEventListener("click", () => {
    const cat = btn.dataset.categoria;
    if (cat === "todos") {
    renderProductos(productos);
    } else {
    renderProductos(productos.filter(p => p.categoria === cat));
    }
});
});

/* ---------- Carrito ---------- */
function agregarAlCarrito(id) {
const prod = productos.find(p => p.id === id);
carrito.push(prod);
contador.textContent = carrito.length;
}

document.getElementById("ver-carrito").addEventListener("click", () => {
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

document.getElementById("cerrar-carrito").addEventListener("click", () => {
modal.classList.add("oculto");
});

document.getElementById("vaciar-carrito").addEventListener("click", () => {
carrito = [];
contador.textContent = 0;
listaCarrito.innerHTML = "";
total.textContent = "Total: $0";
});

document.getElementById("modo-toggle").addEventListener("click", () => {
document.body.classList.toggle("dark");
});
