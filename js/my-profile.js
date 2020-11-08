//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let userLogged = localStorage.getItem("User-Logged");
if(!userLogged){
    alert("Debes estar registrado para ver esta página")
    window.location = "index.html"
}

document.addEventListener("DOMContentLoaded", function (e) {
let profile = localStorage.getItem("profile");
 
if(profile){

    profile = JSON.parse(profile)
    
    if(profile.imgUrl !=""){
    document.getElementById("imgProfile").src = profile.imgUrl
}
document.getElementById("imgUrl").value=profile.imgUrl
document.getElementById("nombre").value=profile.nombre
document.getElementById("numero").value=profile.edad
document.getElementById("email").value=profile.email
document.getElementById("telefono").value=profile.telefono
}

document.getElementById("saveProfile").addEventListener("click",function (e){
    let infomissing = false
    let imgUrl = document.getElementById("imgUrl")
    let nombre = document.getElementById("nombre");
    let edad = document.getElementById("numero");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");

    if(nombre.value === ""){
        nombre.classList.add("is-invalid");
        infomissing = true;
    }else{
        nombre.classList.remove("is-invalid")
    }
    if(edad.value === ""){
        edad.classList.add("is-invalid");
        infomissing = true;
    }else{
        edad.classList.remove("is-invalid");
    }
    if(email.value === ""){
        email.classList.add("is-invalid");
        infomissing = true;
    }else{
        email.classList.remove("is-invalid");
    }
    if(telefono.value === ""){
        telefono.classList.add("is-invalid");
        infomissing = true;
    }else{
        telefono.classList.remove("is-invalid");
    }
if(!infomissing){
    localStorage.setItem("profile",JSON.stringify({
       imgUrl: imgUrl.value,
        nombre: nombre.value,
        edad: edad.value,
        email : email.value,
        telefono : telefono.value
    }));
    document.getElementById("success").innerHTML=`
    <br>
    <div class="alert alert-success alert-dismissible show" role="alert">
      <strong>Datos guardados correctamente</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>`
}

})
document.getElementById("clean").addEventListener("click", function() {
    document.getElementById("imgUrl").value=""
    document.getElementById("nombre").value = ""
    document.getElementById("numero").value = ""
    document.getElementById("email").value = ""
    document.getElementById("telefono").value = ""
    localStorage.removeItem('profile')

});
});