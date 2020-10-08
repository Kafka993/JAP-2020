//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
document.getElementById('submitBtn').addEventListener("click",function(e){
let inputEmail = document.getElementById("email");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;
    

    if (inputEmail.value === ""){
        inputEmail.classList.add("invalid")
        camposCompletos = false;
        alert("Ingresar Email");
    
    }
    if( inputPassword.value === ''){
        inputPassword.classList.add("invalid");
        camposCompletos = false;
        alert("Ingresar Password")
    }

    if(camposCompletos){
            window.location.href = "inicio.html"
            localStorage.setItem("User-Logged", JSON.stringify({email: inputEmail.value}));
          

};

});

});
