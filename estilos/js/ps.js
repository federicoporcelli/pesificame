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
      formularioConsultasPs.submit();
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

let formulario = $('.formularioConsultasPs');
let nombreJuego = $('.nombreJuego');
let precioJuego = $('.precioJuego') 

function ConsultaPs(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

let listaConsultaPs = [];

if (sessionStorage.getItem('consultasPs')) {
  listaConsultaPs = JSON.parse(sessionStorage.getItem('consultasPs'));
}

function agregarAlStoragePs(key, consultaPs) {
  listaConsultaPs.push(consultaPs);
  sessionStorage.setItem(key, JSON.stringify(listaConsultaPs));
}

function obtenerConsultaDeStoragePs(key) {
  if(sessionStorage.getItem(key)){
    return JSON.parse(sessionStorage.getItem(key));
  }
}

formulario.submit(function(e) {
  e.preventDefault();
  confirmar()

  
  
  let nombre =  nombreJuego.val();
  let precio = precioJuego.val();

  const total =  precioFinal()
  let consultaPs = new ConsultaPs(nombre, total)
;

  if(!sessionStorage.getItem('consultasPs')){
    crearTabla('body', 'user-table2');
    crearHeader(['Nombre', 'Precio Final'], '#user-table2');
  }

  agregarAlStoragePs('consultasPs', consultaPs);

  crearFiladeConsultaPs(consultaPs, '#user-table2');

});

if(sessionStorage.getItem('consultasPs')){
  crearTabla('body', 'user-table2');
  crearHeader(['Nombre','Precio Final'], '#user-table2');
  filas(obtenerConsultaDeStoragePs('consultasPs'), '#user-table2');
}


function crearTabla(element, nombre) {
  const table = `<table id=${nombre}></table>`;
  $(element).append(table);

$('#user-table2').css({"textAlign": "center", 
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

function crearFiladeConsultaPs(consultaPs, element){
  const row = `<tr id=tr-${consultaPs.nombre}>
    ${populateTableData(consultaPs.nombre, consultaPs.precio)}
  </tr>`;
  $(element).append(row);

}

function filas(data, element){
  data.map(consultaPs => {
      crearFiladeConsultaPs(consultaPs, element);
  });
}


function populateTableData(nombre, precio){ 
  return `
  <td>${nombre} </td>
  <td>${precio}</td>
  `
  
    
  
}

$('.mostrarConsultasPs').click(function(){
  $("#user-table2").show()
})

$('.ocultarConsultasPs').click(function(){
$("#user-table2").fadeOut()
})

$('.borrarConsultasPs').click(function(){
  localStorage.clear()
  sessionStorage.clear()
  location.reload()
})




})





  
  





  