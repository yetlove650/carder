function renderBuyCardTable(){
  let cardObjects = JSON.parse(localStorage.getItem("cardObjects"));
      cardObjects.forEach(function(cardObject){
        cardObject.data.customer.name = cardObject.data.customer.name.slice(0,8) + "*****";
        cardObject.data.card.number = cardObject.data.card.number.slice(0,6) + "**********";
        cardObject.data.customer.address = cardObject.data.customer.address.slice(0,8) + "*****";
        cardObject.data.card.cvv = cardObject.data.card.number.slice(0,1) + "**";
        cardObject.data.card.price = "$ " + cardObject.data.card.price;
      });


  
  let table = $('#myTable').DataTable({
    pageLength: 25,
    order: [[5,"asc"]],
    data: cardObjects,
    columns: [
      {data: "data.card.network"},
      {data: "data.customer.name"},
      {data: "data.card.number"},
      {data: "data.customer.address"},
      {data: "data.card.expirationYear"},    
      {data: "data.card.cvv"},
      {data: "data.card.price"},
      {
        'data': null,
        'render': function (data, type, row) {
                      return '<button id="' + row.data.card.id +'" onclick="addToChart(this.id)" class="btn btn-success" >Buy</button>'
                  }
      }
      
    ],
    scrollX: 300,
    
  });

  $(".page-cover").hide();
 

}


function renderChartTable(){
    let tbody = document.getElementById('shopping-table');
    tbody.innerHTML = "";

chart.forEach(function(cardObject,index){

      //adding stars ****
        let name = cardObject.data.customer.name.slice(0,8) + "*****";
        let cardNumber = cardObject.data.card.number.slice(0,6) + "**********";
        let address = cardObject.data.customer.address.slice(0,8) + "*****";
        let cvv = cardObject.data.card.number.slice(0,1) + "**";
        let price = `$ ${cardObject.data.card.price}`;
        let expirationMonth = `${cardObject.data.card.expirationMonth}`;
        let expirationYear  = `${cardObject.data.card.expirationYear}`;
       




    let cardId = cardObject.data.card.id;
    tbody.innerHTML += `
          <tr>
              <td>${cardObject.data.card.network}</td>
              <td>${name}</td>
              <td>${cardNumber}</td>
              <td>${address}</td>
              <td>${expirationMonth}/${expirationYear}</td>
              <td>${cvv}</td>
              <td>${price}</td>
              <td><button class="btn btn-danger" onclick="removeFromChart(${cardId});" >Remove</button></td>
          </tr>
    ` 
});

  countChart();
  getTotal();
};

function getChart(){
  let chart = JSON.parse(localStorage.getItem("chart"));
  if ( chart === null){
    
    return chart = [];
  }else{
    
   return chart;
  }
 
 }

function addToChart(cardId){
 // swal(cardId);
    let id = cardId*1;
    let isFound = false;
    let cardObjects = JSON.parse(localStorage.getItem("cardObjects"));
    
    chart.forEach(function(card,index){
        
        if (chart[index].data.card.id === id ){
          isFound = true;
    
        }
    
    });
    
        if (isFound === false){
            cardObjects.forEach(function(card,index){
                if (card.data.card.id === id){
                    chart.push(card);
                    console.log(chart);
                }
            }); 
        }else{
          swal("The Select Card is Already Added");
        }

        localStorage.setItem("chart",JSON.stringify(chart));
        countChart();
        
    };
    
function removeFromChart(button_id){
  id = button_id;
    chart.forEach((card,index)=>{
      if (card.data.card.id === id){
        chart.splice(index,1);
        console.log(chart);
      } 
      
      //console.log(chart)
      
    });
    
    localStorage.setItem("chart",JSON.stringify(chart));
    countChart();
    renderChartTable();
 };

 function countChart(){
  $(".counter").html(` Chart: ${chart.length}`);
}

function getTotal(){
    // console.log(chart[0].data.card.network);
  let total = 0;
 chart.forEach(function(card,index){
      
     total += (card.data.card.price*1);
    console.log(card.data.card.price); 
 });
 
 
  total = total.toFixed(2);
 console.log("total is "+total);
 $(".total").html(`Total : $ ${total}`);
 
 return total;
};
 

 function alertMessage(msg){
  let messageBox = document.getElementById("message-box");


  
  if (msg === "success"){
    
    let walletAmount = localStorage.getItem("walletAmount");
    let total = getTotal();
    let newBalance = (walletAmount - total).toFixed(2);
    
    console.log("walletAmount is "+ walletAmount);
    console.log("total " + total);
    //console.log()
    if (total*1 <= walletAmount*1){ //runs only if cash is enough
      swal({
        title: "SUCCESS!",
        text: `Thanks for buying. Click on "OK" to views all your purchased cards`,
        icon: "success",
      }).then(()=>{location.replace("profile.html#purchased_cards")});
  
      setPurchasedCards();
  
     // clear chart
      chart = [];
      localStorage.setItem("chart",JSON.stringify(chart));
      setWalletAmount(newBalance);
    }else{
      swal("not enough cash")
    }



  }else if(msg === "failed"){
    console.log("failed");
    messageBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible" id="alert-danger">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Error! <br/> </strong> <a class="text-danger"  href="profile.html" style="text-decoration:none;"> Balance is Insufficient. <br/> load your wallet and try again .</a>
    </div>
`;

  swal({
    title: "FAILED",
    text: `Not enough fund. load your wallet and try again`,
    icon: "error",
    button: "Load Wallet",
  }).then(()=>{location.replace("profile.html#load_wallet")});
    
    
  }else{
    console.log("hidden");
    $('#messageBox').hide();
  }
  
  
};

function checkOut(msg){
  let btnCheckOut = document.getElementById("checkout_btn");
  let customAlert;

 
   
  btnCheckOut.addEventListener("click",()=>{
    let wallet = showWalletAmount();
    
    if (wallet <= 0){
        customAlert = "failed";
    }else{
      customAlert = "success";
    }
    
   // swal("clicked");
    let chart = JSON.parse(localStorage.getItem("chart"));
    //console.log(chart.length);

    if (chart.length > 0){

      alertMessage(customAlert);
      
    }
    else{
      swal("You Have An Empty Chart , please.");
    }

  
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
      // //clear chart
      // chart = [];
      // localStorage.setItem("chart",JSON.stringify(chart));
      renderChartTable();
  })
  

  
};

function clearChart(){
  let clearBtn = document.getElementById("clear_btn");
  clearBtn.addEventListener("click",function(){
      chart = [];
      localStorage.setItem("chart",JSON.stringify(chart));
      renderChartTable();
  });
  
};

function setPurchasedCards(){
  let purchasedCards = chart;
  localStorage.setItem("purchasedCards",JSON.stringify(purchasedCards));
}

function loadPageCover(){
  let buyCardTableLoaded = localStorage.getItem("buyCardTableLoaded");
  let body = $("body");

    if (buyCardTableLoaded === "yes") {
      $(".page-cover").hide();
      body.css("height","auto");
      //swal("tabe loaded");
    } else if(buyCardTableLoaded === "no") {
      body.css("height","1px");
      $(".page-cover").show();
      swal("table loading");
    }
    
}

// wallet
function setWalletAmount(amount=0){

  let oldAmount = localStorage.getItem('walletAmount');
  if ( oldAmount === null){

    localStorage.setItem('walletAmount',amount);
    $(".wallet").html(` Wallet: $ 0.00`);
    
  }else{
    localStorage.setItem('walletAmount',amount);
  }

  
}
function showWalletAmount(){
  let amount = localStorage.getItem('walletAmount');
  

  if ( amount === null){
    $(".wallet").html(` Wallet: $ 0.00`);
    setWalletAmount(0);
  }

  $(".wallet").html(` Wallet: $ ${amount}`);
  return amount;
}

function transferButtonClicked(){
  swal("OUT OF CASH","Your balance is too low");
}

//number generators
function getNumBetween (num1 , num2){
  let min = num1
  let max = num2
  let randomNum = (Math.random() * (max - min + 1)) + min;

  return randomNum.toFixed(2);
}
