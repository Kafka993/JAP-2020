//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var  product={};

function showProductImg(array){

    let htmlContentToAppend = "";
    
    for (let i = 0; i < array.length; i++ ){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    
    }
}
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
        
            product = resultObj.data;

         let productNameHTML  = document.getElementById("productName");
         let productDescriptionHTML = document.getElementById("productDescription");
         let productCostHTML = document.getElementById("productCost");
         let productCountHTML = document.getElementById("productCount");
         
     
         productNameHTML.innerHTML = product.name;
         productDescriptionHTML.innerHTML = product.description;
         productCostHTML.innerHTML = product.currency +" " + product.cost;
         productCountHTML.innerHTML = product.soldCount;
         

         //Muestro las imagenes en forma de galería
         showProductImg(product.images);
     }
 });
});
    
    
     

