````md
<!-- =========================================================
   🌌 SkyWatch Africa — README.md 
   ========================================================= -->

<div align="center">

  <!-- Title -->
  <h1>🌌 SkyWatch Africa</h1>
  <p><b>Citizen-science astronomy reports • Live map • Real-time feed • Research-ready MVP</b></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/status-MVP-orange" />
    <img src="https://img.shields.io/badge/license-MIT-blue" />
    <img src="https://img.shields.io/badge/python-3.10%2B-blue" />
    <img src="https://img.shields.io/badge/FastAPI-ready-green" />
    <img src="https://img.shields.io/badge/SQLite-local-lightgrey" />
    <img src="https://img.shields.io/badge/Leaflet-maps-brightgreen" />
  </p>

  <!-- Animated header (typing SVG) -->
  <p>
    <img
      src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=900&center=true&vCenter=true&width=760&lines=Citizen+Science+Astronomy+Platform+for+Africa;Submit+Observations+%E2%86%92+Instant+Map+%E2%86%92+Real-time+Feed;Built+with+FastAPI+%2B+SQLite+%2B+Leaflet"
      alt="Typing SVG"
    />
  </p>

  <!-- Hero image placeholder (replace with your banner) -->
  <p>
    <img src="https://user-images.githubusercontent.com/0000000/000000000-hero-placeholder.png" width="92%" alt="SkyWatch Africa Banner" />
  </p>

  <p>
    <a href="#-demo">Demo</a> •
    <a href="#-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-setup">Setup</a> •
    <a href="#-api">API</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>

</div>

---

## 🌍 Why SkyWatch Africa?

**SkyWatch Africa** is a lightweight citizen-science platform that helps people across Africa collect and explore astronomy observations in real time.

It’s an MVP designed to grow into a research-grade system with:
- **photo uploads**
- **AI classification**
- **quality scoring**
- **open datasets**
- **research exports**

---

## ✨ Demo

> Add screenshots/GIFs here for a strong GitHub look.

<div align="center">
  <img src="https://user-images.githubusercontent.com/0000000/000000000-map-demo.gif" width="85%" alt="Map Demo GIF"/>
  <br/>
  <sub><i>Replace the GIF links with your own screenshots / recordings.</i></sub>
</div>

---

## ✅ Features

### 🔭 Citizen-science reporting
- Submit observation type (e.g., meteor, aurora, comet, UFO? 😄)
- Description + time + coordinates (GPS supported)

### 🗺️ Live interactive map
- Reports show instantly on a Leaflet map (OpenStreetMap tiles)
- Click markers to view report details

### 📰 Real-time feed
- A clean “Recent Observations” list updates after submissions

### 💾 Local persistence
- All reports stored in **SQLite** (`backend/skywatch.db`)

---

## 🧱 Architecture

### High-level overview
```mermaid
flowchart LR
  U[User in Browser] -->|Submit Observation| FE[Frontend: HTML/CSS/JS + Leaflet]
  FE -->|POST /reports| API[Backend: FastAPI]
  API -->|SQLAlchemy ORM| DB[(SQLite Database)]
  API -->|GET /reports| FE
  FE -->|Render markers + list| U
````

### Backend request flow

```mermaid
sequenceDiagram
  participant B as Browser
  participant F as Frontend JS
  participant A as FastAPI
  participant D as SQLite

  B->>F: Fill form + click Submit
  F->>A: POST /reports (JSON)
  A->>D: INSERT report row
  D-->>A: ok
  A-->>F: 201 Created + report data
  F->>A: GET /reports (refresh map/list)
  A->>D: SELECT reports ORDER BY created_at DESC
  D-->>A: rows
  A-->>F: reports[]
  F-->>B: Update map markers + recent list
```

---

## 📁 Project Structure

```text
skywatch-africa/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app & endpoints
│   │   ├── database.py      # SQLAlchemy models + db session
│   │   └── schemas.py       # Pydantic validation models
│   ├── requirements.txt
│   └── skywatch.db          # Created automatically
├── frontend/
│   ├── index.html           # UI (map + form + list)
│   ├── css/style.css        # Styling
│   └── js/app.js            # Frontend logic (fetch + map)
├── README.md
└── LICENSE
```

---

## ⚙️ Setup

### ✅ Requirements

* **Python 3.10+** (3.11 recommended)
* **Git**
* (Recommended) VS Code + Live Server extension

---

## 🚀 Run Locally

### 1️⃣ Backend (FastAPI)

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend URLs:

* API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### 2️⃣ Frontend

**Option A (simple):** open `frontend/index.html` in your browser
**Option B (best):** VS Code → right-click `frontend/index.html` → **Open with Live Server**

---

## 🧪 Test the MVP

1. Start backend
2. Open frontend
3. Click **Use my GPS** (or type coordinates)
4. Fill in the observation details
5. Click **Submit report**
6. See it appear on the map + recent list ✅

---

## 🧩 API

### Base URL

`http://127.0.0.1:8000`

### Endpoints

| Method | Endpoint   | Description         |
| -----: | ---------- | ------------------- |
|    GET | `/health`  | Health check        |
|    GET | `/reports` | List all reports    |
|   POST | `/reports` | Create a new report |

### Example POST payload

```json
{
  "obs_type": "Meteor",
  "description": "Bright streak moving east to west, lasted ~2 seconds.",
  "latitude": -33.9249,
  "longitude": 18.4241,
  "observed_at": "2026-02-08T20:15:00"
}
```

---

## 🎬 Animations (Frontend UI)

This project is already a clean MVP — but you can make it feel “premium” with small animations.

✅ In the starter, you can add:

* button hover effects
* “toast” notifications after submit
* smooth list fade-in
* subtle card lift animations
* map marker bounce on new report

**Tip:** Make the UI “feel alive” without heavy frameworks.

---

## 📤 Push to GitHub

```bash
git init
git add .
git commit -m "SkyWatch Africa MVP: reports + live map"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skywatch-africa.git
git push -u origin main
```

---

## 🔮 Roadmap (Research-Level Features)

### Phase 1 — Better Data

* [ ] Photo/video upload (FastAPI `UploadFile`)
* [ ] Quality checks (blur/dark/cloud heuristics)
* [ ] Reporter confidence score + metadata

### Phase 2 — AI & Classification

* [ ] Simple ML model to classify sky events
* [ ] AI-assisted tagging (meteor / satellite / plane / etc.)
* [ ] “Possible match” clustering (same event from many users)

### Phase 3 — Research & Community

* [ ] CSV export endpoint (`/reports.csv`)
* [ ] Public dataset snapshots
* [ ] User accounts, moderation, admin dashboard
* [ ] API keys + rate limiting

### Phase 4 — Mobile

* [ ] Android app (Kotlin/Flutter)
* [ ] Offline capture + later sync
* [ ] Push notifications for events

---

## 🛡️ Security Notes (MVP)

This is an MVP and intentionally simple. For production:

* enable CORS properly
* add API authentication
* validate inputs more strictly
* rate-limit endpoints
* store secrets in env vars

---

## 🐛 Troubleshooting

**Backend won’t start**

```bash
cd backend
pip install -r requirements.txt --upgrade
```

**Frontend can’t connect**

* Confirm backend runs at `http://127.0.0.1:8000`
* Check Console (F12) for errors

**GPS doesn’t work**

* Grant browser location permissions
* Use localhost / HTTPS

---

## 🤝 Contributing

Contributions are welcome:

* bug fixes
* UI improvements
* API enhancements
* research features

Fork → create branch → PR ✅

---

## 📄 License

MIT — see `LICENSE`.

---

## ⭐ Support

If you like SkyWatch Africa, please give the repo a ⭐
It helps visibility and encourages development.

---

<div align="center">
  <sub>Built with ❤️ for citizen scientists across Africa 🌍✨</sub>
</div>
```



