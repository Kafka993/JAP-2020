//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
document.getElementById('submitBtn').addEventListener("click",function(e){
    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("imputPassword");
    let camposCompletos = true;

    if (inputEmail.value === ""){
        imputEmail.classList.add("invalid")
        camposCompletos = false;
    
    }
    if( inputPassword.value === ''){
        inputPassword.classList.add('invalid');
        camposCompletos = false;
    }

    if(camposCompletos){
            window.location = "index.html"
};

});
});
