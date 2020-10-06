//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let userLogged = localStorage.getItem("User-Logged");
if(!userLogged){
    alert("Debes estar registrado para ver esta página")
    window.location = "index.html"
}

document.addEventListener("DOMContentLoaded", function (e) {

});