const form = document.querySelector("form");
const penNameInput = document.getElementById("penName");
const penColorInput = document.getElementById("penColor");
const penPriceInput = document.getElementById("penPrice");

window.onload = function () {
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        const penName = penNameInput.value;
        const penColor = penColorInput.value;
        const penPrice = penPriceInput.value;

        // Create a new Pen object
        var pen = new Pen(penName, penColor, penPrice);
        // Store the pen object in local storage
        localStorage.setItem(pen.name, JSON.stringify(pen));
        // Store the latest pen name for retrieval
        localStorage.setItem("latestPenName", pen.name);
        // Clear the form inputs
        penNameInput.value = "";
        penColorInput.value = "";
        penPriceInput.value = "";
        // Redirect to "pen_display.html" page
        // Open "pen_display.html" in a the same tab
        window.location.href = "pen_display.html";
    })
}


class Pen {
    constructor(name, color, price) {
        this.name = name;
        this.color = color;
        this.price = "₦"+Number(price).toLocaleString();
    }
}
