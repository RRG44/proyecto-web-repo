var carrito=[];

var botones=document.querySelectorAll(".agregar");

botones.forEach(boton =>{
  boton.addEventListener("click", () => {
    
    var contenedor = boton.closest(".contenedor");
    
    var codigo=contenedor.querySelector(".codigo").textContent;
  
    var modelo=contenedor.querySelector(".modelo").textContent;

    var tipo=contenedor.querySelector(".tipo").textContent;
    
    var precio=contenedor.querySelector(".precio").textContent;
    
    //Creamos nuestro elemento
    var rin={
      codigo: codigo,
      modelo: modelo,
      tipo: tipo,
      precio: precio
    };

    carrito.push(rin);

    console.log(Array.from(carrito));
    //TODO: crear las  cajas en el carrito
  });
});


