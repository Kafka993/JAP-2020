
let comissionPercentage = 0.13;
let PERCENTAGE_SYMBOL = '%';
let MONEY_SYMBOL = "USD "
let SUCCESS_MSG = "¡Se ha realizado compra con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";


var itemsArray = [];

function updateTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal")
    
    for(let i=0; i< subs.length; i++ ){
        total += parseInt(subs[i].innerHTML)
    }
document.getElementById("productCostText").innerText = MONEY_SYMBOL + total;

    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");
    let totaltotalHTML = document.getElementById('totalCostText1')
    
    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow =  MONEY_SYMBOL + (Math.round(total * comissionPercentage * 100) / 100) 
    let totaltoaltoshow = MONEY_SYMBOL +  (Math.round(  total * comissionPercentage * 100) / 100 + total) 
   
   comissionCostHTML.innerHTML = comissionToShow;
   totalCostHTML.innerHTML = totalCostToShow;
   totaltotalHTML.innerHTML = totaltoaltoshow
}

function eliminar(i){
    itemsArray.splice(i,1);
}

function calcSubtotal(unitCost,i){
let count = parseInt(document.getElementById(`count${i}`).value);
    subtotal = count * unitCost
   
document.getElementById(`itemSubtotal${i}`).innerHTML= subtotal;
updateTotal()
}

function showItems(array){
    
    let contenido= "";
    for (let i=0; i<array.length; i++){
        let item = array[i];
        let moneda
        if(item.currency === "UYU"){
          moneda = item.unitCost / 40 
            
        }else{
            moneda = item.unitCost
        }
        
        let sub = item.count * moneda;
        
       contenido +=  `
        <tr>
        <td scope="row" ><img src='${item.src}' width="150px" alt="" class="img-thumbnail"></td>

        <th>${item.name}</th>

        <td>${item.currency} ${item.unitCost}</td>

        <td><input style= "width:60px;" onchange="calcSubtotal(${moneda}, ${i})"
                        
        type="number" id="count${i}" value="${item.count}" min="1"></td>

        <td><span class="subtotal" id="itemSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
        
        <td> USD </td>
        
        
        <td><button class= "btn btn-danger" onclick="eliminar(${i})">X</button><td>  
    </tr>
     `
    
    }    
    document.getElementById("listado").innerHTML= contenido;
    updateTotal()
}
updateTotal()
function eliminar(i){
    if (itemsArray.length > 1){
        itemsArray.splice(i,1);
        showItems(itemsArray);
    }else{
        document.getElementById("noitem").innerHTML=`
        <h2 class="text-center p-4">No hay Articulos<h2>
        <p class="lead text-center">Sugerimos que vaya a <a href="products.html">Productos</a></p>
        `

    }
}
    function selectpayment() {
    
        var payment = document.getElementsByName("payment");
        for( var i=0 ; i < payment.length; i++){
            if (payment[i].checked && (payment[i].value) == "1"){
            document.getElementById("A").classList.remove("d-none")
            document.getElementById("B").classList.add("d-none")
            
            
        
        }else if (payment[i].checked && (payment[i].value) == "2"){
        document.getElementById("A").classList.add("d-none")
        document.getElementById("B").classList.remove("d-none")
        
    }
    }
    }


function validatedPayment (){
   
    let cardholderInput = document.getElementById("cardholder").value;
    let dateInput = document.getElementById("date").value;
    let verificationInput = document.getElementById("verification").value;
    let cardnumberInput = document.getElementById("cardnumber").value
    let banktransferInput = document.getElementById("banktransfer").value
    let payment = document.getElementsByName("payment")
    let info = true;
    
    
    
    for (var i = 0 ;  i < payment.length; i++){
        if( payment[i].checked && (payment[i].value) == "1"){
            if (cardholderInput == "" || dateInput == "" || verificationInput == "" || cardnumberInput == ""){
                
                info = false;
            }else{
                
                info = true;
            }
    
        } else if(payment[i].checked && (payment[i].value) == "2"){
            if (banktransferInput == "" ){
                
                info = false;
            }else{
                
                info = true
            }
        }
    }
    return info
    }
      
document.addEventListener("DOMContentLoaded", function(e){
 
document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.13;
        
        updateTotal();
    });
    
    document.getElementById("expressradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        
        updateTotal();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.03;
        
        updateTotal();
    });
    
    

   
    
        

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
   
    
    
    
    var cartForm = document.getElementById("cart-info");

    
    cartForm.addEventListener("submit", function(e){

        let calleInput = document.getElementById("calle");
        let numeroInput = document.getElementById("numero");
        let paisInput = document.getElementById("pais");
        let esquinaInput = document.getElementById("esquina")
        let pago =  document.getElementById("formadepago")
        let infoMissing = false;

       
        calleInput.classList.remove('is-invalid');
        numeroInput.classList.remove('is-invalid');
        paisInput.classList.remove('is-invalid');
        esquinaInput.classList.remove("is-invalid")
        pago.classList.remove("d-none")
        

        if (calleInput.value === "")
        {
            calleInput.classList.add('is-invalid');
            pago.classList.add("d-none")
            infoMissing = true;
        }
        
       
        if (numeroInput.value === "")
        {
            pago.classList.add("d-none")
            numeroInput.classList.add('is-invalid');
            infoMissing = true;
        }

       
        if (paisInput.value === "")
        {
            pago.classList.add("d-none")
            paisInput.classList.add('is-invalid');
            infoMissing = true;
        }
        if (esquinaInput.value === ""){
            
            pago.classList.add("d-none")
            esquinaInput.classList.add('is-invalid');
            infoMissing = true;
        }
       if ( infoMissing === false){
        document.getElementById("btnpago").classList.remove("d-none")
       }
        
        if (e.preventDefault) e.preventDefault();
            return false;
    });
    let  form = document.getElementById("tarjeta");

      form.addEventListener("submit", function(e){
    
    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
      if (validatedPayment ()){
        document.getElementById("pay").innerHTML=`
    <br>
    <div class="alert alert-success alert-dismissible show" role="alert">
      <strong>Forma de pago  correcta</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
        `
      }else{
        e.preventDefault();
      e.stopPropagation();
        document.getElementById("pay").innerHTML=`
        <br>
    <div class="alert alert-danger alert-dismissible show" role="alert">
      <strong>Debe ingresar una forma de pago </strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    
        `
    }
    
    
    }else{
      if (validatedPayment ()){
       
          getJSONData(CART_BUY_URL).then(function(resultObj){
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";

        
        if (resultObj.status === 'ok')
        {
            msgToShow = resultObj.data.msg;
            
            document.getElementById("alertResult").classList.add('alert-success');
        }
        else if (resultObj.status === 'error')
        {
            msgToShow = ERROR_MSG;
            document.getElementById("alertResult").classList.add('alert-danger');
        }

        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById("alertResult").classList.add("show");
   
});

    
        

      }else{
        e.preventDefault();
      e.stopPropagation();
      document.getElementById("pay").innerHTML=`
      <br>
    <div class="alert alert-danger alert-dismissible show" role="alert">
      <strong>Debe ingresar una forma de pago </strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
      
      
      `
      }
    }
    form.classList.add("was-validated");

if (e.preventDefault) e.preventDefault();
    return false;
    
      });
 
    
});