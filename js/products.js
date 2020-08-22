//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ODER_ASC_BY_PRE = "pag ->PAG";
const ODER_DESC_BY_PRE = "PAG -> pag";  



var productArray = [];



var minPrecio = undefined
var maxPrecio = undefined

function sortProducts (criterio, array){
    let result =[];

    if(criterio === ODER_ASC_BY_PRE){
        result = array.sort(function(a,b){
            if (a.cost < b.cost){ return -1;}
            if (a.cost > b.cost){ return 1;}
            return 0
        });
    } else if (criterio === ODER_DESC_BY_PRE){
        result = array.sort(function(a,b){
            if (a.cost > b.cost){ return -1;}
            if (a.cost < b.cost){ return 1;}
            return 0
        });
    }
    return result;
};

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if(((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio )) &&
        ((maxPrecio == undefined) ||(maxPrecio != undefined && parseInt(product.cost) <= maxPrecio ))){
 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                
                    </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <p class="mb-1"> `+ product.description +`</p>
                        <small class="text-muted">` + "Precio: " + " " + product.currency   +" "+ product.cost + ` </small>
                        <small class="text-muted">` + product.soldCount  + ` Vendidos </small>
                        
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
           
         //Muestro las categorías ordenadas
            showProductList(productArray);
            productArray = sortProducts(ODER_ASC_BY_PRE, productArray);
        }
    });


document.getElementById("filtrar").addEventListener("click", function() {

    minPrecio=document.getElementById("rango-min").value;
    maxPrecio=document.getElementById("rango-max").value;

    if((minPrecio != undefined) && (minPrecio !="") && (parseInt(minPrecio)) >= 0 ){
        minPrecio = parseInt(minPrecio);
    }
    else{
        minPrecio=undefined;
    }
    if((maxPrecio != undefined) && (maxPrecio !="") && (parseInt(maxPrecio)) >= 0 ){
        maxPrecio = parseInt(maxPrecio);
    }
    else{
        maxPrecio=undefined;
    }
showProductList(productArray);
});

document.getElementById("limpiar").addEventListener("click", function() {

    minPrecio=document.getElementById("rango-min").value = ""
    maxPrecio=document.getElementById("rango-max").value = ""

    minPrecio = undefined;
    maxPrecio = undefined;
    
    showProductList(productArray);
});

document.getElementById("sortPreAsc").addEventListener("click", function (){
    productArray = sortProducts(ODER_ASC_BY_PRE, productArray);

    showProductList(productArray);
});

document.getElementById("sortPreDesc").addEventListener("click", function (){
    productArray = sortProducts(ODER_DESC_BY_PRE, productArray);

    showProductList(productArray);
});

});
