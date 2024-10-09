// Obtener elementos del DOM
const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");

// Función para cargar comentarios del localStorage
function loadComments() {
  // Obtener comentarios del localStorage
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Limpiar la lista actual
  commentsList.innerHTML = "";

  // Renderizar cada comentario
  comments.forEach((comment, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Especie:</strong> ${comment.especie} <br />
      <strong>Comentario:</strong> ${comment.mensaje} <br />
      <strong>Ubicación:</strong> ${comment.ubicacion} <br />
      <button onclick="deleteComment(${index})">Eliminar</button>
      <hr />
    `;
    commentsList.appendChild(li);
  });
}

// Función para guardar un comentario en el localStorage
function saveComment(comment) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Función para eliminar un comentario
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1); // Eliminar el comentario por índice
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments(); // Recargar la lista de comentarios
}

// Manejador de envío del formulario
commentForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir la acción por defecto del formulario

  // Obtener los datos del formulario
  const especie = document.getElementById("fname").value;
  const mensaje = document.getElementById("message").value;
  const ubicacion = document.getElementById("ubicacion").value;

  // Crear un objeto de comentario
  const comment = {
    especie: especie,
    mensaje: mensaje,
    ubicacion: ubicacion,
  };

  // Guardar comentario en localStorage
  saveComment(comment);

  // Limpiar el formulario
  commentForm.reset();

  // Recargar los comentarios para mostrarlos
  loadComments();
});

// Cargar los comentarios al cargar la página
window.onload = loadComments;
