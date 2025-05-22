if (localStorage.getItem('latestPenName')) {
    var latestPen = localStorage.getItem('latestPenName'); // Bic
    var penInfo = JSON.parse(localStorage.getItem(latestPen));
    console.table(penInfo);
    var pen = {
        name: penInfo.name,
        color: penInfo.color,
        price: penInfo.price
    };
    
} else {
    var pen = {
        name: "Default Pen",
        color: "Black",
        price: 0.99
    };
    console.log("No pen found in local storage. Using default values.");
}
// Populate the fields
document.getElementById('penName').textContent = pen.name;
document.getElementById('penColor').textContent = pen.color;
document.getElementById('penPrice').textContent = pen.price;

function showPopup(type) {
    const popupOverlay = document.getElementById('popupOverlay');
    const popupMessage = document.getElementById('popupMessage');
    if (type === 'price') {
        popupMessage.textContent = "The price is " + pen.price;
    } else if (type === 'color') {
        popupMessage.textContent = "The color is " + pen.color;
    }
    popupOverlay.classList.add('active');
}

function closePopup() {
    document.getElementById('popupOverlay').classList.remove('active');
}        

// Helper to update the main pen info card
function updatePenInfoCard(penObj) {
    document.getElementById('penName').textContent = penObj.name;
    document.getElementById('penColor').textContent = penObj.color;
    document.getElementById('penPrice').textContent = penObj.price;
    // Optionally update the global pen variable if needed
    pen = penObj;
}

// Populate All Pen card as a table
function renderAllPens() {
    const allPenList = document.getElementById('allPenList');
    let pens = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === "latestPenName") continue;
        try {
            const penObj = JSON.parse(localStorage.getItem(key));
            if (penObj && penObj.name && penObj.color && penObj.price) {
                pens.push(penObj);
            }
        } catch (e) {
            // skip
        }
    }
    if (pens.length === 0) {
        allPenList.innerHTML = "<em>No pens found.</em>";
        return;
    }
    // Build table
    let table = `<table class="all-pen-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            ${pens.map((p, idx) => `
                <tr data-pen-index="${idx}">
                    <td>${p.name}</td>
                    <td style="color:#1976d2">${p.color}</td>
                    <td>${p.price}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
    allPenList.innerHTML = table;

    // Add click event to each row
    const rows = allPenList.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const idx = this.getAttribute('data-pen-index');
            updatePenInfoCard(pens[idx]);
        });
    });
}

// Initial render
renderAllPens();