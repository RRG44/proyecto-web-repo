const rines=[
  {
    "codigo": 123,
    "titulo": "H",
    "precio": 99,
    "cantidad": 0
  },
  {
    "codigo": "333",
    "titulo": "l",
    "precio": 50,
    "cantidad": 0
  }
];

// const carrito=[]

var botones=document.getElementsByClassName("agregar");

for (var i = 0; i <= botones.length; i++){
  botones[i].addEventListener("click", function(){

    cache=localStorage.getItem("carrito");

    if(cache==NULL){
      carrito=[]
    }else{
      carrito=JSON.parse(cache);
    }

    const boton = botones[i];
    const contenedor = boton.closest(".contenedor");
    
    const codigo=contenedor.getElementsByClassName("codigo").value;
    
    const titulo=contenedor.getElementsByClassName("titulo").value;
    
    const precio=contenedor.getElementsByClassName("precio").value;
    
    const cantidad=0;

    //Creamos nuestro elemento
    const rin={
      "codigo": codigo,
      "titulo": titulo,
      "precio": precio,
      "cantidad": cantidad
    }

    for(var j=0; j<= carrito.length; j++){
      if(carrito[j].codigo==rin.codigo){
        rin.cantidad++;
      }else{
        carrito.push(rin);
      }
      console.log(carrito);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    //TODO: crear las  cajas en el carrito
  })
}

// function agregarCarrito(boton){
//   var precio=boton.querySelector();
// }

//Agregamos que una función suceda cuando se de el evento click
// function agregar(codigo){
//   for (var i = 0; i < rines.length; i++){
//     var rin = rines[i]
//     if (rin["codigo"]==codigo) {
//       rin["cantidad"]++;     
//     }
//   }
//   console.log(rines);
// };

//TODO: Hacer esto mismo pero usando localstoge. Es decir, crear el arreglo al ejecutar el boton, como en el script de la ultima clase

