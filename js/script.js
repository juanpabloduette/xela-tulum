document.getElementById("btn_menu").addEventListener("click", mostrar_menu);

document.getElementById("back_menu").addEventListener("click", ocultar_menu);

document.getElementById('close').addEventListener('click', ocultar_menu)

nav = document.getElementById("nav");
background_menu = document.getElementById("back_menu");

function mostrar_menu(){
    nav.style.right = "0px";
    background_menu.style.display = "block";
}

function ocultar_menu(){
    nav.style.right = "-250px";
    background_menu.style.display = "none";
}

// APENAS BAJA EL SCROLL PONE BACKGROUND AL MENU

window.addEventListener("scroll", function(){
    let header = document.querySelector("header");
    header.classList.toggle("header__abajo", window.scrollY > 0);
    //let button = this.document.getElementById("button");
    //button.classList.toggle("header__abajo__menu", window.scrollY > 0);
   
    //Menu a en colores con dropdown
    let greyMenuDown = document.querySelectorAll('a.gris');
    for (let item of greyMenuDown) {
        item.classList.toggle("header__abajo__menu", window.scrollY > 0);
    }

    let book = document.querySelector('a.book');
    book.classList.toggle("header__abajo__book", window.scrollY > 0);
    // let menu = document.querySelector("menu");
    // menu.style.color = "red";
    // header.style.opacity = '0.5';
    let buttonBars = document.getElementById("btn_menu");
    buttonBars.classList.toggle("buttonbars", window.scrollY > 0);
    // buttonBars.style.color = "red";

    let logo = document.querySelector('.logo');
    logo.classList.toggle("header__abajo__logo", window.scrollY > 0);


});


/*MODAL POP UP*/

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

/* FORM */

// FORMULARIO
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input, textarea');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s-Z0-9]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^([0-9]){1,20}$/, // Solo números
	mensaje: /^[a-zA-ZÀ-ÿ\d\S\s]{1,120}$/
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	mensaje: false,
  fecha: false,
  fechato: false,
  fechaTovalor: null
}

// let fechitaDesde = 

const grupoIncorrectoFecha = () => {
  document.getElementById(`grupo__fecha`).classList.add('formulario__grupo-incorrecto');
  document.getElementById(`grupo__fecha`).classList.remove('formulario__grupo-correcto');
  document.querySelector(`#grupo__fecha i`).classList.add('fa-times-circle');
  document.querySelector(`#grupo__fecha i`).classList.remove('fa-check-circle');
  document.querySelector(`#grupo__fecha .formulario__input-error`).classList.add('formulario__input-error-activo');
  campos.fecha = false;
};

const grupoIncorrectoFechaTo = () => {
  document.getElementById(`grupo__fechato`).classList.add('formulario__grupo-incorrecto');
  document.getElementById(`grupo__fechato`).classList.remove('formulario__grupo-correcto');
  document.querySelector(`#grupo__fechato i`).classList.add('fa-times-circle');
  document.querySelector(`#grupo__fechato i`).classList.remove('fa-check-circle');
  document.querySelector(`#grupo__fechato .formulario__input-error`).classList.add('formulario__input-error-activo');
  campos.fechato = false;
};

const validarFecha = (fecha) => {
  const fechitaFrom = fecha.value
    
  let fechaIngresada = new Date(`${fechitaFrom}T00:00:00`);
  let fechaActual = new Date();

  campos.fechaTovalor = fechaIngresada;
   
  // Verificar si el valor ingresado no es una fecha válida o Verificar si la fecha ingresada es anterior a la fecha actual
  if (isNaN(fechaIngresada.getTime()) || (fechaIngresada < fechaActual) ) {
    grupoIncorrectoFecha();
    return;
  };
 
  // Verificar si el mes de febrero tiene 29 días en caso de ser año bisiesto
  let año = fechaIngresada.getFullYear();
  if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
    if (fechaIngresada.getMonth() === 1 && fechaIngresada.getDate() !== 29) {
      campos.fecha = false;
      return;
    };
  };
  // COMO HaGO PARA CORRER EL CODIGO CON LA VARIABLE INGRESADA POR EL USUARIO
  // validarFechaTo(campos.fechaTovalor)
  console.log('llega hasta aca')

  // validarFechaTo(fecha);
  // console.log(validarFechaTo(fecha))
    
  // Si pasa todas las validaciones, la fecha es válida
  document.getElementById(`grupo__fecha`).classList.remove('formulario__grupo-incorrecto');
  document.getElementById(`grupo__fecha`).classList.add('formulario__grupo-correcto');
  document.getElementById(`grupo__fecha`).classList.remove('formulario__grupo-incorrectoo');
  document.getElementById(`grupo__fecha`).classList.add('formulario__grupo-correctoo');
  document.querySelector(`#grupo__fecha i`).classList.add('fa-check-circle');
  document.querySelector(`#grupo__fecha i`).classList.remove('fa-times-circle');
  document.querySelector(`#grupo__fecha .formulario__input-error`).classList.remove('formulario__input-error-activo');
  campos.fecha = true;
  return;
};


const validarFechaTo = (fecha) => {
  const fechita = fecha.value
  
  let fechaIngresada = new Date(`${fechita}T00:00:00`);
  let fechaActual = new Date();
 
  // Verificar si el valor ingresado no es una fecha válida o Verificar si la fecha ingresada es anterior a la fecha actual
  if (isNaN(fechaIngresada.getTime()) || (fechaIngresada < fechaActual) ) {
    grupoIncorrectoFechaTo();
    return;
  };
 
  // Verificar si el mes de febrero tiene 29 días en caso de ser año bisiesto
  let año = fechaIngresada.getFullYear();
  if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
    if (fechaIngresada.getMonth() === 1 && fechaIngresada.getDate() !== 29) {
        grupoIncorrectoFechaTo();
        return; 
        };
    };

   /* VERIFICA QUE LA FECHA To sea mayor a la fecha From*/
   
    console.log(campos.fechaTovalor)
    console.log(fechaIngresada)

    if(campos.fechatovalor === null || campos.fechatovalor > fechaIngresada || campos.fechatovalor === "" || campos.fechatovalor === '[object Date]'){
      
      grupoIncorrectoFechaTo();
      console.log('ENTRA')
      return
    }
    // Si pasa todas las validaciones, la fecha es válida
  document.getElementById(`grupo__fechato`).classList.remove('formulario__grupo-incorrecto');
  document.getElementById(`grupo__fechato`).classList.add('formulario__grupo-correcto');
  // document.getElementById(`grupo__fechato`).classList.remove('formulario__grupo-incorrectoo');
  // document.getElementById(`grupo__fechato`).classList.add('formulario__grupo-correctoo');
  document.querySelector(`#grupo__fechato i`).classList.add('fa-check-circle');
  document.querySelector(`#grupo__fechato i`).classList.remove('fa-times-circle');
  document.querySelector(`#grupo__fechato .formulario__input-error`).classList.remove('formulario__input-error-activo');
  campos.fechato = true;
  return;
};

const validarFormulario = (e) => {
  switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
        break;
    case "fecha":
          validarFecha(e.target, 'fecha');
    break;
    case "fechato":
          validarFechaTo(e.target, 'fechato');
    break;
  };
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value) && (input.value.trim()!="") ){
   	document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		// document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrectoo');
		// document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correctoo');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	  campos[campo] = true;
  } else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
  }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


formulario.addEventListener('submit', (e) => {
	e.preventDefault();
  

	if(campos.nombre && campos.correo && campos.telefono && campos.mensaje && campos.fecha){
		
    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

    formulario.submit();
    formulario.reset();

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
		
	}
});

