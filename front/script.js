const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "./Login/index.html";
}
const idtoken = JSON.parse(atob(token.split(".")[1]));

fetchGET();
async function fetchGET() {
  try {
    response = await fetch(
      `http://localhost/back/usuarios/${idtoken.id_usuario}/tareas/asignadas/`,
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
    data.forEach((tarea) => {
      const añadirahtml = `
      <tr>
      <td>${tarea.nombre}</td>
      <td>${tarea.duracion}</td>
      <td>
        <button class="comentariobtn" data-idtarea="${tarea.id_tarea}">Ver comentarios</button>
      </td>
      </tr>`;
      document
        .querySelector("tbody")
        .insertAdjacentHTML("beforeend", añadirahtml);
    });
    const botones = document.querySelectorAll(".comentariobtn");
    for (const boton of botones) {
      boton.addEventListener("click", function () {
        const ingresarcomentario = this.getAttribute("data-idtarea");
        window.location.href = `./Comentarios/index.html?idtarea=${ingresarcomentario}`;
      });
    }
  } catch (error) {
    console.log(error);
  }
}
