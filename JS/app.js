
// Team Filter
const teamFilter = document.getElementById("teamFilter");
const matchRows = document.querySelectorAll("#matchTable tr");

teamFilter.addEventListener("change", function () {
    const selectedTeam = teamFilter.value;

    matchRows.forEach(function (row) {
        const teams = row.getAttribute("data-teams");

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


// Booking Summary
const match = document.getElementById("match");
const category = document.getElementById("category");
const quantity = document.getElementById("quantity");

function updateSummary() {
    const prices = {
        "CSK vs MI": { General: 800, Premium: 1500, VIP: 3000 },
        "RCB vs KKR": { General: 900, Premium: 1600, VIP: 3200 },
        "MI vs DC": { General: 850, Premium: 1500, VIP: 3100 }
    };

    const selectedMatch = match.value;
    const selectedCategory = category.value;
    const ticketQuantity = Number(quantity.value) || 0;

    const price = prices[selectedMatch]?.[selectedCategory] || 0;
    const total = price * ticketQuantity;

    document.getElementById("summaryMatch").textContent = selectedMatch || "-";
    document.getElementById("summaryCategory").textContent = selectedCategory || "-";
    document.getElementById("ticketPrice").textContent = price;
    document.getElementById("summaryQuantity").textContent = ticketQuantity;
    document.getElementById("totalPrice").textContent = total;
}

match.addEventListener("change", updateSummary);
category.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);


// Confirm Booking
const bookingForm = document.getElementById("bookingForm");
const bookingTable = document.getElementById("bookingTable");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const selectedMatch = match.value;
    const selectedCategory = category.value;
    const ticketQuantity = Number(quantity.value);
    const total = document.getElementById("totalPrice").textContent;

    const emptyRow = bookingTable.querySelector("td[colspan]");
    if (emptyRow) {
        emptyRow.parentElement.remove();
    }

    const newRow = bookingTable.insertRow();

    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = selectedMatch;
    newRow.insertCell(2).textContent = selectedCategory;
    newRow.insertCell(3).textContent = ticketQuantity;
    newRow.insertCell(4).textContent = "₹" + total;

    showToast("Booking confirmed successfully!");

    bookingForm.reset();
    updateSummary();
});
// Toast Notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}
// Smooth Scrolling to Booking Form
const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Redirecting to booking form!");
    });
});
