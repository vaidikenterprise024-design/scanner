// 🔴 PASTE YOUR APPS SCRIPT WEB APP URL
const API_URL = "https://script.google.com/macros/s/AKfycbxNO0kTQku15Wes_X1_Md5JbS8BrdmcKtUcfrjYpnNmwutoXOXZ8dI1WOzwLIrPenniyw/exec";

function processPDFs() {
  document.getElementById("status").innerText = "Processing...";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "PROCESS_PDFS" })
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("status").innerText = msg;
  });
}

function scan() {
  const barcode = document.getElementById("barcode").value.trim();
  if (!barcode) return alert("Enter barcode");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ barcode })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) return alert("Order not found");

    document.getElementById("sku").innerText = "SKU: " + data.sku;
    document.getElementById("qty").innerText = "Quantity: " + data.quantity;
    document.getElementById("scanStatus").innerText =
      data.scanned ? "⚠ Already Scanned" : "🆕 First Scan";

    const img = document.getElementById("img");
    if (data.imageUrl) {
      img.src = data.imageUrl;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    document.getElementById("popup").classList.remove("hidden");
  });
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
