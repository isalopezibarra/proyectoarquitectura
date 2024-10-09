let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

let slider = document.querySelector(".slider");
let sliderList = slider.querySelector(".slider .list");
let thumbnail = document.querySelector(".slider .thumbnail");
let thumbnailItems = thumbnail.querySelectorAll(".item");

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button
nextBtn.onclick = function () {
  moveSlider("next");
};

// Function for prev button
prevBtn.onclick = function () {
  moveSlider("prev");
};

function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  slider.addEventListener(
    "animationend",
    function () {
      if (direction === "next") {
        slider.classList.remove("next");
      } else {
        slider.classList.remove("prev");
      }
    },
    { once: true }
  ); // Remove the event listener after it's triggered once
}

// Obtener el pop-up y los elementos a actualizar
let popup = document.getElementById("popup");
let buttons = document.querySelectorAll(".button button");
let closeButton = document.querySelector(".close-button");
let popupTitle = document.querySelector("#popup h2");
let popupCur = document.querySelector("#popup h3");
let popupDescription = document.querySelector("#popup p");
let popupVideo = document.querySelector("#popup video source");
let popupVideoElement = document.querySelector("#popup video");

// Función para abrir el pop-up con contenido dinámico
buttons.forEach((button) => {
  button.onclick = function () {
    let title = button.getAttribute("data-title");
    let cur = button.getAttribute("data-cur");
    let description = button.getAttribute("data-description");
    let videoSrc = button.getAttribute("data-video");

    // Actualizar el contenido del pop-up
    popupTitle.textContent = title;
    popupCur.textContent = cur;
    popupDescription.textContent = description;
    popupVideo.src = videoSrc;
    popupVideoElement.load(); // Recargar el video para el nuevo src

    // Mostrar el pop-up
    popup.classList.add("open-popup");
    popup.classList.remove("close-popup"); // Por si acaso se había agregado antes
  };
});

// Función para cerrar el pop-up
closeButton.onclick = function () {
  popup.classList.add("close-popup");
  popup.classList.remove("open-popup");

  // Esperar el fin de la animación antes de ocultar completamente el pop-up
  popup.addEventListener(
    "animationend",
    function () {
      if (popup.classList.contains("close-popup")) {
        popup.classList.remove("open-popup", "close-popup");
      }
    },
    { once: true }
  );
};

// Cerrar el pop-up cuando se hace clic fuera de él
window.onclick = function (event) {
  if (event.target == popup) {
    closeButton.onclick(); // Reutilizar la lógica de cierre
  }
};
