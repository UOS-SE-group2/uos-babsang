const sort = document.getElementById("sort");
const lists = document.querySelectorAll(".list_restaurant__list");

const sortByStars = () => {
    var i, shouldSwitch;
    var switching = true;
    while(switching) {
        switching = false;
        shouldSwitch = false;
        for(i = 1; i < (lists.length - 1); i++) {
            const list_textBefore = lists[i].querySelector(".list_restaurant__list__text");
            const list_textAfter = lists[i+1].querySelector(".list_restaurant__list__text");
            const starAfter = list_textAfter.querySelector(".list_star");
            const starBefore = list_textBefore.querySelector(".list_star");
            if(starAfter.innerText > starBefore.innerText) {
                shouldSwitch = true;
                break;
            }
            console.log(i, shouldSwitch, switching);
        }
        if(shouldSwitch) {
            lists[i].parentNode.insertBefore(lists[i], lists[i+1]);
            switching = true;
        }
    }
}


const sortByDefault = () => {

}


const handleOptions = function(event) {
    const value = sort.value;
    if(value == "stars") {
        sortByStars();
    }
    else {
        sortByDefault();
    }
}


if(lists) {
    sort.addEventListener("change", handleOptions);
}