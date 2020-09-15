//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = [];
var commentsArray = [];
var autosarray= [];

function showProductImg(array) {

    let htmlContentToAppend = ""

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <a href="${imageSrc}" target="_blank">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

}
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCountHTML.innerHTML = product.soldCount;


            //Muestro las imagenes en forma de galería
            showProductImg(product.images);
        };
    });
});

function showRelated(arrayl, arrayRelated){
let contenido ="<hr>";
arrayRelated.forEach(function(i){

contenido += `
<a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + arrayl[i].imgSrc + `" alt="` + arrayl[i].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ arrayl[i].name +`</h4>
                            <small class="text-muted">` + "Precio: " + " " + product.currency   +" "+ product.cost + ` </small>
                        </div>
                        <p class="mb-1">` + arrayl[i].description + `</p>
                    </div>
                </div>
            </a>
            `


})

document.getElementById("related").innerHTML = contenido


}




function showco(commentsA) {
let comments = ""
commentsA.forEach(function (comment) {
       
let score = ""

        comments += ` <strong>` + comment.user + `</strong> dice:<br> <p>` + comment.description + `</p>`
        
        for (let i = 1; i <= comment.score; i++) {
            score += `<i class="fa fa-star checked"></i> `;
        }
        for (let i = comment.score + 1; i <= 5; i++) {
            score += `<i class="fa fa-star"></i> `;
        }

        comments += `<sub>` + comment.dateTime + `</sub><br> `
        comments += `<div style="text-align: right;">` + score + `</div><br><hr> `

    });  
        document.getElementById("commentsUser").innerHTML = comments;
     
     
    
};



    
document.addEventListener("DOMContentLoaded", function () {
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            commentsArray = resultObj.data;

            showco(commentsArray)

        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            autosarray = resultObj.data;

            showRelated(autosarray,product.relatedProducts)

        }
    });
});

let userLogged = localStorage.getItem("User-Logged");

if (userLogged){
    document.getElementById("newCo").style = "display:inline-block";

}
document.getElementById("sendCo").addEventListener("click",function(){

    let now = new Date();

    let dateTime =  `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} `;
    dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} `

    let newComment = {
 score: parseInt(document.getElementById("NewScore").value),
 description: document.getElementById("newComment").value,
 user: JSON.parse(localStorage.getItem("User-Logged")).email,
 dateTime:dateTime
    }; 

commentsArray.push(newComment);
showco(commentsArray)



})
