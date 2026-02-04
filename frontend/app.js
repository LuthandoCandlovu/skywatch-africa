// ====== Config ======
// Start backend first: uvicorn app.main:app --reload
const API_BASE = "http://127.0.0.1:8000";

// ====== Helpers ======
function $(id) { return document.getElementById(id); }

function toUtcLocalInputValue(date) {
  // Convert Date -> 'YYYY-MM-DDTHH:MM' in UTC for datetime-local input
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth()+1)}-${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

function parseUtcLocalInput(value) {
  // value looks like 'YYYY-MM-DDTHH:MM'
  // Treat it as UTC (not local), then return ISO string.
  if (!value) return null;
  const [d, t] = value.split("T");
  const [Y, M, D] = d.split("-").map(Number);
  const [h, m] = t.split(":").map(Number);
  const dt = new Date(Date.UTC(Y, M-1, D, h, m, 0));
  return dt.toISOString();
}

// ====== Map setup ======
const map = L.map("map").setView([-32.0, 26.0], 5); // South Africa-ish default
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

function markerPopup(r) {
  const when = new Date(r.observed_at).toUTCString();
  return `
    <b>${r.event_type.toUpperCase()}</b><br/>
    ${r.description ? r.description + "<br/>" : ""}
    <small>${when}</small><br/>
    <small>(${r.latitude.toFixed(5)}, ${r.longitude.toFixed(5)})</small>
  `;
}

async function loadReports() {
  $("status").textContent = "";
  const res = await fetch(`${API_BASE}/reports?limit=200`);
  if (!res.ok) throw new Error("Failed to load reports");
  const data = await res.json();

  // List
  const container = $("reports");
  container.innerHTML = "";
  data.slice(0, 20).forEach(r => {
    const div = document.createElement("div");
    div.className = "report";
    div.innerHTML = `
      <div class="tag">${r.event_type}</div>
      <div class="meta">
        <div class="when">${new Date(r.observed_at).toUTCString()}</div>
        <div class="where">${r.latitude.toFixed(5)}, ${r.longitude.toFixed(5)}</div>
        ${r.description ? `<div class="desc">${r.description}</div>` : ""}
      </div>
    `;
    div.addEventListener("click", () => {
      map.setView([r.latitude, r.longitude], 9);
    });
    container.appendChild(div);
  });

  // Map markers
  markersLayer.clearLayers();
  data.forEach(r => {
    const m = L.marker([r.latitude, r.longitude]).addTo(markersLayer);
    m.bindPopup(markerPopup(r));
  });
}

// ====== Form logic ======
// default observed time = now (UTC)
$("observedAt").value = toUtcLocalInputValue(new Date());

$("btnLocation").addEventListener("click", () => {
  $("status").textContent = "Getting location...";
  if (!navigator.geolocation) {
    $("status").textContent = "Geolocation not supported by your browser.";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      $("lat").value = pos.coords.latitude.toFixed(6);
      $("lon").value = pos.coords.longitude.toFixed(6);
      $("status").textContent = "Location added.";
      map.setView([pos.coords.latitude, pos.coords.longitude], 10);
    },
    () => {
      $("status").textContent = "Could not get GPS. Please type coordinates.";
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

$("btnSubmit").addEventListener("click", async () => {
  const eventType = $("eventType").value;
  const description = $("description").value.trim();
  const lat = Number($("lat").value);
  const lon = Number($("lon").value);
  const observedAtIso = parseUtcLocalInput($("observedAt").value);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    $("status").textContent = "Please provide valid latitude and longitude.";
    return;
  }

  const payload = {
    event_type: eventType,
    description: description || null,
    latitude: lat,
    longitude: lon,
    observed_at: observedAtIso ? observedAtIso : new Date().toISOString()
  };

  $("status").textContent = "Submitting...";
  const res = await fetch(`${API_BASE}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const msg = await res.text();
    $("status").textContent = "Submit failed: " + msg;
    return;
  }

  $("status").textContent = "Saved! Refreshing...";
  $("description").value = "";
  await loadReports();
  $("status").textContent = "Done ✅";
});

$("btnRefresh").addEventListener("click", async () => {
  try {
    await loadReports();
  } catch (e) {
    $("status").textContent = "Could not refresh reports. Is the backend running?";
  }
});

// Initial load
(async () => {
  try {
    await loadReports();
  } catch (e) {
    $("status").textContent = "Backend not running yet. Start it, then click Refresh reports.";
  }
})();
