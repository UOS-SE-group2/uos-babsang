const orderContainer = document.querySelector(".orderContainer_manager");
const checkBtn = document.querySelectorAll(".confirmed");
const crossBtn = document.querySelectorAll(".denied");

const {orderId} = orderContainer.dataset;

const handleConfirm = async(event) => {
    const confirm_going = event.target.parentNode;
    const response = fetch(`/api/manager/orderlist/${orderId}/confirmed`, {
        method = "POST",
    });

    if(response.status === 300) {
        const takenOrderDetail = confirm_going.parentNode;
        takenOrderDetail.removeChild(confirm_going);

        const confirm_finished = document.createElement("div");
        confirm_finished.className = "confirm_finished";
        const h4 = document.createElement("h4");
        h4.innerText = "승인된 주문";
        confirm_finished.appendChild(h4);
    }
}

const handleDeny = async(event) => {
    fetch(`/api/manager/orderlist/${orderId}/denied`, {
        method = "POST",
    });
}


if(checkBtn) {
    checkBtn.forEach(function(check) {
        check.addEventListener("click", handleConfirm);
    })
}
if(crossBtn) {
    crossBtn.forEach(function(cross) {
        cross.addEventListener("click", handleDeny);
    })
}