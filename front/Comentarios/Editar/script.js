const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../../Login/index.html";
}
function getparam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(param);
  return myParam;
}
const idcomentario = getparam("idcomentario");
const idtarea = getparam("idtarea");
if (!idcomentario || !idtarea) {
  window.location.href = "../index.html";
}
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const idtoken = JSON.parse(atob(token.split(".")[1]));
class Comentario {
  constructor(titulo, descripcion, id_tarea, id_usuario) {
    this.id_tarea = id_tarea;
    this.id_usuario = id_usuario;
    this.fecha_ingresado = new Date().toISOString();
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}
console.log("acá llego");
document
  .getElementById("editarform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (tituloInput.value != "" || descripcionInput.value != "") {
      const data = new Comentario(
        tituloInput.value,
        descripcionInput.value,
        idtarea,
        idtoken.id_usuario
      );
      console.log(JSON.stringify(data));
      const resultado = await fetchdatos(data);
      if (resultado) {
        tituloInput.value = "";
        descripcionInput.value = "";
        window.location.href = "../";
      } else {
        alert("Por favor, corrija los errores.");
      }
    }
  });

async function fetchdatos(dataf) {
  try {
    response = await fetch(
      `http://localhost/back/comentarios/${idcomentario}`,
      {
        method: "PUT",
        body: JSON.stringify(dataf),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("No funciona");
    }

    return true;
  } catch (error) {
    console.log(error);
  }
}
