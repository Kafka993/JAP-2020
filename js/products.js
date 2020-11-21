//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ODER_ASC_BY_PRICE = "price -> PRICE";
const ODER_DESC_BY_PRICE = "PRICE -> price";  
const ORDER_DESC_BY_SOLD = "SOLD -> sold";


var productArray = [];

var minPrecio = undefined
var maxPrecio = undefined
var buscar = undefined


function sortProducts (criterio, array){
    let result =[];

    if(criterio === ODER_ASC_BY_PRICE){
        result = array.sort(function(a,b){
            if (a.cost < b.cost){ return -1;}
            if (a.cost > b.cost){ return 1;}
            return 0
        });
    } else if (criterio === ODER_DESC_BY_PRICE){
        result = array.sort(function(a,b){
            if (a.cost > b.cost){ return -1;}
            if (a.cost < b.cost){ return 1;}
            return 0
        });
    }
    else if (criterio === ORDER_DESC_BY_SOLD){
        result = array.sort(function(a,b){
        if (a.soldCount > b.soldCount){ return -1;}
        if (a.soldCount < b.soldCount){ return 1;}
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
 
            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) !=-1 || product.description.toLowerCase().indexOf(buscar) !=-1   ){

        htmlContentToAppend += `
        
        
        <div class="col-sm-6"> 
        <div class="card">                    
        <img src="${product.imgSrc}" alt="" class="card-img-top">
                <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description} </p>
                            <small class="text-muted">` + "Precio: " + " " + product.currency   +" "+product.cost + ` </small>
                            <small class="text-muted">` + product.soldCount  + ` Vendidos </small>
                           <a href="product-info.html" class="list-group-item list-group-item-action" class="btn btn-success btn-sm">Ver Producto</a><br>
                          </div>
                         </div>
                    </div>

        `
        
    }
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
            productArray = sortProducts(ODER_ASC_BY_PRICE, productArray);
        }
    });


document.getElementById("rangeFilterCount").addEventListener("click", function() {

    minPrecio=document.getElementById("rangeFilterCountMin").value;
    maxPrecio=document.getElementById("rangeFilterCountMax").value;

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

document.getElementById("clearRangeFilter").addEventListener("click", function() {

    minPrecio=document.getElementById("rangeFilterCountMin").value = ""
    maxPrecio=document.getElementById("rangeFilterCountMax").value = ""

    minPrecio = undefined;
    maxPrecio = undefined;
    
    showProductList(productArray);
});

document.getElementById("sortPriceAsc").addEventListener("click", function (){
    productArray = sortProducts(ODER_ASC_BY_PRICE, productArray);

    showProductList(productArray);
});

document.getElementById("sortPriceDesc").addEventListener("click", function (){
    productArray = sortProducts(ODER_DESC_BY_PRICE, productArray);

    showProductList(productArray);
});

document.getElementById("sortsolddes").addEventListener("click", function (){
    productArray = sortProducts(ORDER_DESC_BY_SOLD, productArray);

    showProductList(productArray);

});

document.getElementById("search").addEventListener("input", function(){
    buscar = document.getElementById("search").value.toLowerCase();
showProductList(productArray);

});


document.getElementById("clean").addEventListener("click", function() {
    document.getElementById("search").value = ""
    buscar = undefined;
    showProductList(productArray)

});

});