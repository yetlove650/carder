showWalletAmount();
function displayUserEmail(){
    $("#carder_email").html(`${localStorage.getItem("carderEmail")}`);
}
displayUserEmail();

let chart = JSON.parse(localStorage.getItem("chart"));
let purchasedCards = JSON.parse(localStorage.getItem("purchasedCards"));
function renderPurchasedCards(){

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    purchasedCards.forEach( function(card,index) {
        console.log(card.data);

        tbody.innerHTML += `
                    <tr>
                        <td>${card.data.card.network}</td>
                        <td>${card.data.customer.name}</td>
                        <td>${card.data.card.number}</td>
                        <td>${card.data.card.expirationMonth}/${card.data.card.expirationYear}</td>
                        <td>${card.data.card.cvv}</td>
                        <td class="bg-success text-light">purchased</td>
                    </tr>
                 `
    });
    countChart();
}

countChart();
renderPurchasedCards();

