import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/style-cussitech.css'; // crea este archivo para los estilos personalizados (mapear clases originales)
 


import ImageMonitor from "../Ing/monitor.png";
import ImageWebCam from "../Ing/webcam.png";
import ImageMouse from "../Ing/mouse.png";
import ImageTeclado from "../Ing/teclado.png";
import ImageRTX from "../Ing/rtx.png";
import ImageRyzen from "../Ing/ryzen.png";
import ImageSSD from "../Ing/SSD.png";
import ImagePC from "../Ing/pc.png";
import ImageLogo from "../Ing/logo_EnzerJack.png";





// Desafio: componente simple que replica el HTML "Desafio"
export function Desafio() {
return (
<div className="container py-4">
<div className="d-flex justify-content-center mb-3">
<div className="box d-flex gap-2 align-items-center">
<div className="c1 rounded" style={{width:48, height:48}}></div>
<div className="c2 rounded" style={{width:48, height:48}}></div>
<div className="c3 rounded" style={{width:48, height:48}}></div>
</div>
</div>
<div className="text-center">
<a href="/" className="btn btn-outline-primary">🐢 Ir al inicio</a>
</div>
</div>
);
}

export default function CussiTech() {
const products = [
{ id: 1, img: ImageMonitor, title: 'Monitor 8k', price: '400.000' },
{ id: 2, img: ImagePC, title: 'PC Prearmada RTX5070', price: '800.000' },
{ id: 3, img: ImageWebCam, title: 'Webcam 4k', price: '50.000' }, 
{ id: 4, img: ImageMouse, title: 'Mouse Gamer', price: '60.000' },
{ id: 5, img: ImageTeclado, title: 'Teclado magnetico inalambrico 25%', price: '100.000' },
{ id: 6, img: ImageRTX, title: 'Placa de video RTX5080', price: '1.500.000' },
{ id: 7, img: ImageRyzen, title: 'Procesador Ryzen 9990X3D', price: '900.000' },
{ id: 8, img: ImageSSD, title: 'Memoria SSD NVMe 4TB', price: '450.000' },

];


return (
<div className="container-fluid p-0">
{/* Header */}
<header className="bg-light border-bottom py-2">
<div className="container d-flex align-items-center gap-3">
<img src={ImageLogo} alt="CussiTech" className="logo img-fluid" style={{width:64, height:64, objectFit:'contain'}} />
<h1 className="h4 m-0">CussiTech</h1>
</div>
</header>


{/* Navigation */}
<nav className="bg-dark text-white">
<div className="container">
<ul className="nav d-flex align-items-center justify-content-between">
<li className="nav-item"><a className="nav-link text-white" href="#1">Inicio</a></li>
<li className="nav-item"><a className="nav-link text-white" href="#2">Catalogo</a></li>
<li className="nav-item"><a className="nav-link text-white" href="#3">Ofertas</a></li>
<li className="nav-item"><a className="nav-link text-white" href="#4">Blog</a></li>
<li className="nav-item"><a className="nav-link text-white" href="#5">Registrarse</a></li>
</ul>
</div>
</nav>


{/* Main layout: sidebar + content */}
<div className="container my-4">
<div className="row">
<aside className="col-12 col-md-3 mb-3">
<div className="list-group">
<a className="list-group-item list-group-item-action" href="#1">Arma tu PC</a>
<a className="list-group-item list-group-item-action" href="#2">Componentes de PC</a>
<a className="list-group-item list-group-item-action" href="#3">Notebook</a>
<a className="list-group-item list-group-item-action" href="#4">Monitores</a>
<a className="list-group-item list-group-item-action" href="#5">Perifericos</a>
<a className="list-group-item list-group-item-action" href="#6">Cables y conectividad</a>
<a className="list-group-item list-group-item-action" href="#7">Telefonia</a>
<a className="list-group-item list-group-item-action" href="/desafio">Desafio</a>
</div>
</aside>


<main className="col-12 col-md-9">
<section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 product-container">
{products.map(p => (
<article key={p.id} className="col">
<a href={`#${p.id}`} className="card h-100 product-card text-decoration-none text-body">
<img src={p.img} className="card-img-top" alt={p.title} style={{objectFit:'contain', height:160}} />
<div className="card-body">
<h5 className="card-title">{p.title}</h5>
<p className="card-text">{p.price}</p>
</div>
</a>
</article>
))}
</section>
</main>
</div>
</div>


{/* Footer */}
<footer className="bg-light border-top py-4">
<div className="container">
<div className="row">
<div className="col-6 col-md-2 mb-3">
<h6>Informacion</h6>
<ul className="list-unstyled">
<li><a href="#">Empresa</a></li>
<li><a href="#">Contacto</a></li>
</ul>
</div>


<div className="col-6 col-md-2 mb-3">
<h6>Enlaces utiles</h6>
<ul className="list-unstyled">
<li><a href="#">Garantias</a></li>
<li><a href="#">Formas de Pago</a></li>
</ul>
</div>


<div className="col-6 col-md-2 mb-3">
<h6>Novedades</h6>
<ul className="list-unstyled">
<li><a href="#">Suscripcion</a></li>
<li><a href="#">Blog</a></li>
</ul>
</div>


<div className="col-6 col-md-3 mb-3">
<h6>Atencion</h6>
<p className="mb-1">Lun a Vie 08:30 a 12:30 y de 16:30 a 20:30 hrs</p>
<p>Sáb 08:30 a 13:00 hrs</p>
</div>


<div className="col-12 col-md-3 mb-3">
<h6>Desarrollado por</h6>
<a href="#">Espinosa Lautaro Eduardo</a>
</div>
</div>
</div>
</footer>
</div>
);
}