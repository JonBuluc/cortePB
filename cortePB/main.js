const btnLimpiarInflables = document.getElementById('btnLimpiarInflables');
const btnCopiarInflables = document.getElementById('btnCopiarInflables');
const btnLimpiarBicis = document.getElementById('btnLimpiarBicis');
const btnCopiarBicis = document.getElementById('btnCopiarBicis');

const btnMostrarInflables = document.getElementById("btnMostrarInflables");
const btnMostrarBicis = document.getElementById("btnMostrarBicis");
function removerClaseActiveDeTodos() {
  btnMostrarInflables.classList.remove("active");
  btnMostrarBicis.classList.remove("active");
  btnMostrarAdmin.classList.remove("active");
}
  
const textoPlanoInflables = document.getElementById('textoPlanoInflables');
const textoPlanoBicis = document.getElementById('textoPlanoBicis');

function actualizarTextoPlano(tipo) {
  if (tipo === "inflables") {
    const { textoPlano } = generarTextoPlanoInflables(inputsInflables);
    textoPlanoInflables.textContent = textoPlano;
  } else if (tipo === "bicis") {
    const { textoPlano } = generarTextoPlanoBicis(inputsBicis);
    textoPlanoBicis.textContent = textoPlano;
  }
}

import {
  loginConGoogle,
  registrarseConGoogle,
  onAuthStateChangedListener,
  cargarUsuariosPendientes,
  autorizarUsuario,
  rechazarUsuario,
  cargarRolesUsuarios,
  cambiarPermiso,
  puedeGuardarEnArea,
  usuarioID,
  cerrarSesionUsuario,
} from './firebase/authService.js';

import { inputsInflables, inputsBicis } from './selectors/inputsSelectors';


import {
  generarTextoPlanoInflables,
  generarTextoPlanoBicis,
  guardarCorteInflables,
  guardarCorteBicis
} from "./services/corteService.js";


// Referencias DOM
const contenedorLoginGoogle = document.querySelector(".login-google-contenedor");
const botonRegistrarseConGoogle = document.getElementById("btnRegistrarseConGoogle");
const btnMostrarAdmin = document.getElementById("btnMostrarAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const panelAdminRoles = document.getElementById("panelAdminRoles");
const listaUsuariosPendientes = document.getElementById("listaUsuariosPendientes");
const listaRolesUsuarios = document.getElementById("listaRolesUsuarios");

// Escucha estado de usuario
onAuthStateChangedListener((user, estados) => {
  if (user) {
    console.log("Usuario activo:", estados.usuarioID);
    if (estados.usuarioAutorizado) {
      contenedorLoginGoogle.style.display = "none";
      botonRegistrarseConGoogle.style.display = "none";

      if (estados.esAdmin) {
        btnMostrarAdmin.style.display = "inline-block";

        cargarUsuariosPendientesYUI();
        cargarRolesUsuariosYUI();
      } else {
        btnMostrarAdmin.style.display = "none";
        panelAdmin.style.display = "none";
        panelAdminRoles.style.display = "none";
      }
    } else {
      console.warn("Usuario NO autorizado");
      contenedorLoginGoogle.style.display = "none";
      botonRegistrarseConGoogle.style.display = "inline-block";
      btnMostrarAdmin.style.display = "none";
      panelAdmin.style.display = "none";
      panelAdminRoles.style.display = "none";
    }
  } else {
    console.log("No hay usuario logueado");
    contenedorLoginGoogle.style.display = "block";
    botonRegistrarseConGoogle.style.display = "block";
    btnMostrarAdmin.style.display = "none";
    panelAdmin.style.display = "none";
    panelAdminRoles.style.display = "none";
  }
});

// Funciones UI para usuarios pendientes
async function cargarUsuariosPendientesYUI() {
  const usuariosPendientes = await cargarUsuariosPendientes();
  listaUsuariosPendientes.innerHTML = "";

  if (usuariosPendientes.length === 0) {
    listaUsuariosPendientes.innerHTML = "<li>No hay usuarios pendientes.</li>";
    return;
  }

  usuariosPendientes.forEach(usuario => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${usuario.nombre || "Sin nombre"}</strong> (${usuario.correo || "Sin correo"})
      <button onclick="autorizarUsuarioYUI('${usuario.id}')">Autorizar</button>
      <button onclick="rechazarUsuarioYUI('${usuario.id}')">Eliminar</button>
    `;
    listaUsuariosPendientes.appendChild(li);
  });
}

window.autorizarUsuarioYUI = async function(uid) {
  const exito = await autorizarUsuario(uid);
  if (exito) {
    alert("✅ Usuario autorizado");
    cargarUsuariosPendientesYUI();
  }
};

window.rechazarUsuarioYUI = async function(uid) {
  await rechazarUsuario(uid);
  alert("❌ Usuario eliminado");
  cargarUsuariosPendientesYUI();
};

// Funciones UI para roles de usuarios
async function cargarRolesUsuariosYUI() {
  const usuarios = await cargarRolesUsuarios();
  listaRolesUsuarios.innerHTML = "";

  usuarios.forEach(usuario => {
    const roles = usuario.roles || {};
    const uid = usuario.id;
    const nombre = usuario.nombre || "(Sin nombre)";
    const correo = usuario.correo || "(Sin correo)";

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${nombre}</strong> (${correo})<br>
      ${generarControlesDePermiso(uid, roles)}
      <hr>
    `;
    listaRolesUsuarios.appendChild(li);
  });
}

function generarControlesDePermiso(uid, roles) {
  const areas = ["bicis", "inflables"];
  let html = "";
  areas.forEach(area => {
    const permiso = roles[area] || { leer: false, escribir: false };
    html += `
      <div style="margin-bottom: 0.5rem">
        <strong>${area.toUpperCase()}</strong><br>
        <label><input type="checkbox" onchange="cambiarPermisoYUI('${uid}', '${area}', 'leer', this.checked)" ${permiso.leer ? "checked" : ""}> Leer</label>
        <label><input type="checkbox" onchange="cambiarPermisoYUI('${uid}', '${area}', 'escribir', this.checked)" ${permiso.escribir ? "checked" : ""}> Escribir</label>
      </div>
    `;
  });
  return html;
}

window.cambiarPermisoYUI = async function(uid, area, tipoPermiso, valor) {
  try {
    await cambiarPermiso(uid, area, tipoPermiso, valor);
    alert("✅ Permisos actualizados para " + uid);
    cargarRolesUsuariosYUI();
  } catch (error) {
    alert(error.message);
    cargarRolesUsuariosYUI();
  }
};

// Exporta para usarse desde HTML (botones)
window.loginConGoogle = loginConGoogle;
window.registrarseConGoogle = registrarseConGoogle;
window.cargarUsuariosPendientesYUI = cargarUsuariosPendientesYUI;
window.cargarRolesUsuariosYUI = cargarRolesUsuariosYUI;
  
  
function limpiarInflables() {
    Object.values(inputsInflables).forEach(input => (input.value = ''));
    actualizarTextoPlano("inflables");
  }
  
function limpiarBicis() {
    Object.values(inputsBicis).forEach(input => (input.value = ''));
    actualizarTextoPlano("bicis");
  }
  
function copiarTextoPlano(texto) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado al portapapeles');
    });
  }
  

  

  
  // Eventos
Object.values(inputsInflables).forEach(input => {
    input.addEventListener("input", () => actualizarTextoPlano("inflables"));
  });
  
Object.values(inputsBicis).forEach(input => {
    input.addEventListener("input", () => actualizarTextoPlano("bicis"));
  });

  
btnLimpiarInflables.addEventListener('click', limpiarInflables);
btnLimpiarBicis.addEventListener('click', limpiarBicis);
  
  
btnCopiarInflables.addEventListener('click', () => copiarTextoPlano(textoPlanoInflables.textContent));
btnCopiarBicis.addEventListener('click', () => copiarTextoPlano(textoPlanoBicis.textContent));
  
btnMostrarInflables.addEventListener("click", () => {
  document.getElementById("seccionInflables").style.display = "block";
  document.getElementById("seccionBicis").style.display = "none";
  document.getElementById("panelAdmin").style.display = "none";
  document.getElementById("panelAdminRoles").style.display = "none";

  removerClaseActiveDeTodos();
  btnMostrarInflables.classList.add("active");
});

btnMostrarBicis.addEventListener("click", () => {
  document.getElementById("seccionInflables").style.display = "none";
  document.getElementById("seccionBicis").style.display = "block";
  document.getElementById("panelAdmin").style.display = "none";
  document.getElementById("panelAdminRoles").style.display = "none";

  removerClaseActiveDeTodos();
  btnMostrarBicis.classList.add("active");
});

btnMostrarAdmin.addEventListener("click", () => {
  document.getElementById("seccionInflables").style.display = "none";
  document.getElementById("seccionBicis").style.display = "none";
  document.getElementById("panelAdmin").style.display = "block";
  document.getElementById("panelAdminRoles").style.display = "block";

  removerClaseActiveDeTodos();
  btnMostrarAdmin.classList.add("active");
});

  
document.getElementById("btnGuardarInflables").addEventListener("click", () => {
  if (puedeGuardarEnArea("inflables")) {
    guardarCorteInflables(usuarioID,inputsInflables);
    alert('Se guardo el corte de inflables en la nube');
  }
});

document.getElementById("btnGuardarBicis").addEventListener("click", () => {
  if (puedeGuardarEnArea("bicis")) {
    guardarCorteBicis(usuarioID,inputsBicis);
    alert('Se guardo el corte de bicis en la nube');
  }
});

document.getElementById("btnRegistrarseConGoogle").addEventListener("click", registrarseConGoogle);
document.getElementById("botonCerrarSesion").addEventListener("click",cerrarSesionUsuario);


  actualizarTextoPlano("inflables");
  actualizarTextoPlano("bicis");