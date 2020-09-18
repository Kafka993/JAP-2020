//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = [];
var commentsArray = [];
var carArray= [];



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
document.getElementById("imgs1").src=product.images[0]
document.getElementById("imgs2").src=product.images[1]
document.getElementById("imgs3").src=product.images[2]
document.getElementById("imgs4").src=product.images[3]
document.getElementById("imgs5").src=product.images[4]


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

            carArray = resultObj.data;

            showRelated(carArray,product.relatedProducts)

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
