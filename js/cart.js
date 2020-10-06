//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsArray = [];

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal")
    
    for(let i=0; i< subs.length; i++ ){
        total += parseInt(subs[i].innerHTML)
    }
document.getElementById("total").innerText = total;
}




function calcSubtotal(unitCost,i){
let count = parseInt(document.getElementById(`count${i}`).value);
    subtotal = count * unitCost
   

document.getElementById(`itemSubtotal${i}`).innerHTML= subtotal;

calcTotal()
}


function showItems(array){
    let contenido= "";

    for (let i=0; i<array.length; i++){
        let item = array[i];
        let sub = item.count * item.unitCost;

        if(item.currency === "UYU"){
            item.unitCost = item.unitCost / 40
            item.currency = "USD"
        }

        contenido +=  `
        <tr>
        <td scope="row" ><img src='${item.src}' width="150px" alt="" class="img-thumbnail"></td>

        <th>${item.name}</th>

        <td>${item.currency}    ${item.unitCost}</td>

        <td><input style= "width:60px;" onchange="calcSubtotal(${item.unitCost }, ${i})"
                        
        type="number" id="count${i}" value="${item.count}" min="1"></td>

        <td><span class="subtotal" id="itemSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
        
        <td>${item.currency} </td>
        
        
        <td><button class= "btn-btn-danger" onclick="eliminar(${i})">x</button><td>  
    </tr>
     `

    document.getElementById("listado").innerHTML= contenido;

}
calcTotal()
}







document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            itemsArray = resultObj.data.articles;

            showItems(itemsArray)
        

        }
    });
});