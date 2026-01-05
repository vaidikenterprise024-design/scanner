// 🔴 PASTE YOUR WEB APP URL
const API_URL = "https://script.google.com/macros/s/AKfycbwc9hxa8zjayFTdgWaoOryTj7rIpyptY4Smr_GoOUAJSGBz2MbLO8_dtrOFN8IDTpD9CQ/exec";

function processPDFs() {
  const status = document.getElementById("status");
  status.innerText = "Processing 1 PDF...";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "PROCESS_PDFS" })
  })
  .then(res => res.text())
  .then(msg => {
    status.innerText = msg;
  })
  .catch(() => {
    status.innerText = "❌ Failed";
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
    img.style.display = data.imageUrl ? "block" : "none";
    if (data.imageUrl) img.src = data.imageUrl;

    document.getElementById("popup").classList.remove("hidden");
  });
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

