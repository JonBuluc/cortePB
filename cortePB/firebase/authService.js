// authService.js
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./firebaseConfig.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

let usuarioID = null;
let usuarioAutorizado = false;
let usuarioRoles = {};
let esAdmin = false;

function loginConGoogle() {
  return signInWithPopup(auth, provider)
    .then(result => {
      usuarioID = result.user.uid;
      console.log("Usuario logueado con Google:", usuarioID);
      return usuarioID;
    })
    .catch(error => {
      console.error("Error en login Google:", error.message);
      throw error;
    });
}

function registrarseConGoogle() {
  return signInWithPopup(auth, provider)
    .then(async result => {
      const user = result.user;
      console.log("Usuario solicita registro:", user.uid);
      const referenciaUsuarioPendiente = doc(db, "usuariosPendientes", user.uid);
      await setDoc(referenciaUsuarioPendiente, {
        correo: user.email,
        nombre: user.displayName || "Sin nombre",
        timestamp: new Date(),
      });
      alert("Registro enviado. Espera a que un administrador confirme tu acceso.");
    })
    .catch(error => {
      console.error("Error en registro con Google:", error.message);
      throw error;
    });
}

function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      usuarioID = user.uid;
      try {
        const documentoUsuario = await getDoc(doc(db, "usuariosAutorizados", usuarioID));
        if (documentoUsuario.exists()) {
          const datosUsuario = documentoUsuario.data();
          usuarioAutorizado = true;
          esAdmin = datosUsuario.roles?.esAdmin === true;
          usuarioRoles = datosUsuario.roles || {};
        } else {
          usuarioAutorizado = false;
          esAdmin = false;
          usuarioRoles = {};
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error.message);
      }
    } else {
      usuarioID = null;
      usuarioAutorizado = false;
      esAdmin = false;
      usuarioRoles = {};
    }
    callback(user, { usuarioID, usuarioAutorizado, esAdmin, usuarioRoles });
  });
}

async function cargarUsuariosPendientes() {
  const snapshot = await getDocs(collection(db, "usuariosPendientes"));
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

async function autorizarUsuario(uid) {
  const docPendiente = await getDoc(doc(db, "usuariosPendientes", uid));
  if (!docPendiente.exists()) return false;
  const datos = docPendiente.data();
  await setDoc(doc(db, "usuariosAutorizados", uid), datos);
  await deleteDoc(doc(db, "usuariosPendientes", uid));
  return true;
}

async function rechazarUsuario(uid) {
  await deleteDoc(doc(db, "usuariosPendientes", uid));
  return true;
}

async function cargarRolesUsuarios() {
  const snapshot = await getDocs(collection(db, "usuariosAutorizados"));
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

async function cambiarPermiso(uid, area, tipoPermiso, valor) {
  if (esAdmin && uid === usuarioID) {
    throw new Error("No puedes cambiar tus propios permisos como administrador.");
  }
  const refUsuario = doc(db, "usuariosAutorizados", uid);
  const docUsuario = await getDoc(refUsuario);
  if (!docUsuario.exists()) return false;
  const data = docUsuario.data();
  const roles = data.roles || {};
  roles[area] = roles[area] || { leer: false, escribir: false };
  roles[area][tipoPermiso] = valor;
  await setDoc(refUsuario, { ...data, roles });
  return true;
}

function puedeGuardarEnArea(nombreArea) {
  if (!usuarioID) {
    alert("⛔ Debes iniciar sesión para guardar.");
    return false;
  }

  if (!usuarioAutorizado) {
    alert("🕒 Tu cuenta está en revisión. Espera autorización del administrador.");
    return false;
  }

  if (esAdmin) return true;

  const permisosEnArea = usuarioRoles[nombreArea];
  if (!permisosEnArea || !permisosEnArea.escribir) {
    alert("⛔ No tienes permisos para guardar en esta área: " + nombreArea);
    return false;
  }

  return true;
}

function cerrarSesionUsuario() {
  signOut(auth)
    .then(() => {
      console.log("Sesión cerrada correctamente");
      alert("Se cerro la sesión");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
}

export {
  loginConGoogle,
  registrarseConGoogle,
  onAuthStateChangedListener,
  cargarUsuariosPendientes,
  autorizarUsuario,
  rechazarUsuario,
  cargarRolesUsuarios,
  cambiarPermiso,
  puedeGuardarEnArea,
  cerrarSesionUsuario,
  usuarioID,
  usuarioAutorizado,
  esAdmin,
  usuarioRoles,
};
