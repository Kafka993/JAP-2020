//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsArray = [];

function calcSubtotal(unitCost,i){
let count = parseInt(document.getElementById(`count${i}`).value);
    subtotal = count * unitCost
   
document.getElementById(`itemSubtotal${i}`).innerHTML= subtotal;
}

function showItems(array){
    
    let contenido= "";
    for (let i=0; i<array.length; i++){
        let item = array[i];
        if(item.currency === "UYU"){
            item.unitCost /= 40 
            item.currency = "USD"
        }
        
        let sub = item.count * item.unitCost;
        
       contenido +=  `
        <tr>
        <td scope="row" ><img src='${item.src}' width="150px" alt="" class="img-thumbnail"></td>

        <th>${item.name}</th>

        <td>${item.currency} ${item.unitCost}</td>

        <td><input style= "width:60px;" onchange="calcSubtotal(${item.unitCost}, ${i})"
                        
        type="number" id="count${i}" value="${item.count}" min="1"></td>

        <td><span class="subtotal" id="itemSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
        
        <td>${item.currency} </td>
        
        
        <td><button class= "btn-btn-danger" onclick="eliminar(${i})">x</button><td>  
    </tr>
     `
    
         
    document.getElementById("listado").innerHTML= contenido;
    
}

}

document.addEventListener("DOMContentLoaded", function(e){
    let userLogged = localStorage.getItem("User-Logged");

    if(!userLogged){
        localStorage.setItem("login-need", JSON.stringify({
            from: "cart.html",
            }));
            alert("Debes estar resgistrado para finalizar la compra")
        window.location = "index.html"
        
    }
    
    getJSONData(CART_INFO_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {

            itemsArray = resultObj.data.articles;

            showItems(itemsArray)
            

        }
    });
});