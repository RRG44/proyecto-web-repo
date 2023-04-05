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

const carrito=[]

var botones=document.getElementsByClassName("agregar");

for (var i = 0; i < botones.length; i++){
  botones[i].addEventListener("click", function(){
    const boton = botones[i];
    const contenedor = boton.closest(".contenedor");
    
    const codigo="";
    
    const titulo="";
    
    const precio=0;
    
    const cantidad=0;
  })
}

function agregarCarrito(boton){
  var precio=boton.querySelector();
}

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

