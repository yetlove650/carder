


  
    let walletAmount = localStorage.getItem('walletAmount');
    if (walletAmount != null){
      setWalletAmount(walletAmount)
      showWalletAmount();
    }
     
  

 let proveTest = function(){
  $("#proveBtn").hover( function(){
    setWalletAmount(4.99);
    showWalletAmount();
      localStorage.setItem("alertMessage","success");
  });
}
proveTest();

let NoProveTest = function(){
  $("#noProveBtn").hover( function(){
    setWalletAmount(0);
    showWalletAmount();
      localStorage.setItem("alertMessage","failed");
  });
}
NoProveTest();





console.log(("report to us and we shall test it and replace it for you for free").length);
new TypeIt("#info-content", {
  strings: "We provide you with the best Credit Cards.",
  speed: 75,
  loop: true,
}).pause(1000)
.delete(-42)
.type("All cards are tested before posted here.")
.pause(1000)
.delete(-40)
.type("if your purchased card is not working ")
.type("report to us and we shall test and replace it for you for free")
.go();




// cardObjects = JSON.parse(localStorage.getItem("cardObjects"));   

//localStorage.setItem("cardObjects",JSON.stringify(cardObjects));

// localStorage.removeItem("chart");
 let chart = getChart(); 




//console.log(cardObjects[0].data.card.network);

renderBuyCardTable();


//renderChartTable();
 //removeFromChart();
 
// $("#alert-success").hide();


//alertMessage("success");


countChart();

//checkOut();
