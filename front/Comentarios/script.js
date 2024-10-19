const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../index.html";
}
const idtoken = JSON.parse(atob(token.split(".")[1]));

function getparam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(param);
  return myParam;
}
const idtarea = getparam("idtarea");
if (!idtarea) {
  window.location.href = "../index.html";
}

fetchGET();
async function fetchGET() {
  try {
    response = await fetch(
      `http://localhost/back/comentarios/usuario/tarea/${idtarea}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("No funciona");
    }
    data = await response.json();
    data.forEach((comentario) => {
      const añadirahtml = `
      <tr>
      <td>${comentario.fecha_ingresado}</td>
      <td>${comentario.titulo}</td>
      <td>${comentario.descripcion}</td>
      <td>
        <button class="editarbtn" data-idcomentario="${comentario.id_comentario}" data-idtarea="${comentario.id_tarea}">Editar </button>
        <button class="eliminarbtn" data-idcomentario="${comentario.id_comentario}">Eliminar </button>
      </td>
      </tr>`;
      document
        .querySelector("tbody")
        .insertAdjacentHTML("beforeend", añadirahtml);
    });

    const botones = document.querySelectorAll(".editarbtn");
    for (const boton of botones) {
      boton.addEventListener("click", function () {
        const idc = this.getAttribute("data-idcomentario");
        const idt = this.getAttribute("data-idtarea");
        window.location.href = `./Editar/index.html?idcomentario=${idc}&idtarea=${idt}`;
      });
    }

    const botones2 = document.querySelectorAll(".eliminarbtn");
    for (const boton of botones2) {
      boton.addEventListener("click", function () {
        const id = this.getAttribute("data-idcomentario");
        fetcheliminar(id);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function fetcheliminar(id) {
  try {
    response = await fetch(`http://localhost/back/comentarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("No funciona");
    }
  } catch (error) {
    console.log(error);
  }
}
