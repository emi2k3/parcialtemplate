const usuarioInput = document.getElementById("username");
const contraseñaInput = document.getElementById("contraseña");

class Usuario {
  constructor(username, contraseña) {
    this.username = username;
    this.contraseña = contraseña;
  }
}

function error(input, errorm) {
  const containerform = input.parentElement;
  const small = containerform.querySelector("small");
  small.innerText = errorm;
  containerform.className = "containerform-error";
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (usuarioInput.value != "" || contraseñaInput.value != "") {
      const data = new Usuario(usuarioInput.value, contraseñaInput.value);
      console.log(JSON.stringify(data));
      await fetchdatos(data);
      if (
        localStorage.getItem("token") != null ||
        localStorage.getItem("token") != undefined
      ) {
        usuarioInput.value = "";
        contraseñaInput.value = "";
        window.location.href = "../";
      }
    } else {
      alert("Por favor, corrija los errores.");
    }
  });

async function fetchdatos(dataf) {
  try {
    response = await fetch("http://localhost/back/auth/", {
      method: "POST",
      body: JSON.stringify(dataf),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 401) {
      error(usuarioInput, "Usuario o contraseña incorrectos.");
      error(contraseñaInput, "");
      usuarioInput.value = "";
      contraseñaInput.value = "";
      return;
    }
    if (!response.ok) {
      throw new Error("No funciona");
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error);
  }
}
