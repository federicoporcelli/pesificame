$(document).ready(function() {



let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

    $.get(url, function (response, status) {
        const apiArray = response[0];
        const datos = Object.values(apiArray)
        if (status === "success") {
            for (const dato of datos) {
              $('body').append(`<h6>La cotizacion del dolar hoy es de :${dato.venta}</h6>`)
                .css ("marginLeft", "10px")
                const enJson5 = JSON.stringify(datos);
                localStorage.setItem('dolar', enJson5);
                
            }
        }
        
    })



let datoDolar = localStorage.getItem('dolar');
let dolar = JSON.parse(datoDolar);
let dolarVenta = dolar[0];
const iva = 0.21;
const impPais = 0.08;
const percepcion = 0.35;



let precio;

$('.precioJuego').on('input', () => {
  precio = parseInt($('.precioJuego').val());
})

function confirmar(){  
  Swal.fire({
      title: 'Conversion de dolares a pesos realizada con exito!!',                
      icon: 'success',
      confirmButtonText: 'VAMOOOOO',

  }).then((result) => {
      if (result.isConfirmed) {
      formularioConsultas.submit();
      }
  })
  
}


function precioFinal () {
  
  let precioDolarizado = precio * parseFloat(dolarVenta.venta)  ;
  let precioConIva = precioDolarizado * iva;
  let precioConPercepcion = precioDolarizado * percepcion;
  let precioConImpPais = precioDolarizado * impPais;
  let precioTotal = (precioDolarizado + precioConIva + precioConPercepcion + precioConImpPais);
  return (precioTotal.toFixed(2))

}

let formulario = $('.formularioConsultas');
let nombreJuego = $('.nombreJuego');
let precioJuego = $('.precioJuego') 

function Consulta(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

let listaConsulta = [];

if (sessionStorage.getItem('consultas')) {
  listaConsulta = JSON.parse(sessionStorage.getItem('consultas'));
}

function agregarAlStorage(key, consulta) {
  listaConsulta.push(consulta);
  sessionStorage.setItem(key, JSON.stringify(listaConsulta));
}

function obtenerConsultaDeStorage(key) {
  if(sessionStorage.getItem(key)){
    return JSON.parse(sessionStorage.getItem(key));
  }
}

$("#botonPlay").click((e) => {
  e.preventDefault();
  confirmar();

  
  
  let nombre =  nombreJuego.val();
  //let precio = precioJuego.val();

  const total =  precioFinal()
  let consulta = new Consulta(nombre, total)
;

  if(!sessionStorage.getItem('consultas')){
    crearTabla('body', 'user-table');
    crearHeader(['Nombre', 'Precio Final'], '#user-table');
  }

  agregarAlStorage('consultas', consulta);

  crearFiladeConsulta(consulta, '#user-table');

});

if(sessionStorage.getItem('consultas')){
  crearTabla('body', 'user-table');
  crearHeader(['Nombre','Precio Final'], '#user-table');
  filas(obtenerConsultaDeStorage('consultas'), '#user-table');
}


function crearTabla(element, nombre) {
  const table = `<table id=${nombre}></table>`;
  $(element).append(table);

$('#user-table').css({"textAlign": "center", 
                      "fontSize": "60px",
                      "marginTop": "40px",
                      "marginLeft": "30%",
                      
                      })
}

function crearHeader(data, element) { 
  const header = `<tr>${createDataHeader(data)}</tr>`;
  $(element).append(header);
}

function createDataHeader(data) {
  return data.map(headerData => `<th>${headerData}</th>`);
}

function crearFiladeConsulta(consulta, element){
  const row = `<tr id=tr-${consulta.nombre}>
    ${populateTableData(consulta.nombre, consulta.precio)}
  </tr>`;
  $(element).append(row);
}

function filas(data, element){
  data.map(consulta => {
      crearFiladeConsulta(consulta, element);
  });
}


function populateTableData(nombre, precio){ 
  return `
  <td>${nombre} </td>
  <td>${precio}</td>
  `
}

$('.mostrarConsultas').click(function(){
  $("#user-table").show()
})

$('.ocultarConsultas').click(function(){
$("#user-table").fadeOut()
})

$('.borrarConsultas').click(function(){
  localStorage.clear()
  sessionStorage.clear()
  location.reload()
})




})





  
  





  