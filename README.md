<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=SkyWatch%20Africa&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Satellite%20Imagery%20for%20Citizen%20Scientists&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<!-- Typing Animation -->
<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=600&size=22&duration=3000&pause=800&color=FF6B35&center=true&vCenter=true&multiline=true&width=700&height=80&lines=🛰️+Track+environmental+change+across+Africa;📊+Real-time+NDVI%2C+change+detection+%26+more;🌍+Open+to+researchers%2C+scientists+%26+curious+minds" alt="Typing SVG" />

<br/>

<!-- Badges -->
[![Python](https://img.shields.io/badge/Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFD166?style=for-the-badge)](LICENSE)

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/skywatch-africa?style=flat-square&color=FF6B35&label=⭐%20Stars)](https://github.com/yourusername/skywatch-africa/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/skywatch-africa?style=flat-square&color=06D6A0&label=🍴%20Forks)](https://github.com/yourusername/skywatch-africa/network)
[![Issues](https://img.shields.io/github/issues/yourusername/skywatch-africa?style=flat-square&color=FFD166&label=🐛%20Issues)](https://github.com/yourusername/skywatch-africa/issues)

</div>

---

<!-- Hero Screenshot -->
<img src="https://github.com/user-attachments/assets/d0b73f87-3c00-4e35-a2f8-da81f3a02054" alt="SkyWatch Africa Dashboard" width="100%"/>

<br/>

---

<div align="center">

## 🌍 &nbsp;What is SkyWatch Africa?

</div>

SkyWatch Africa is an open platform for people who want to **actually understand** what's happening to the land around them — not just read reports about it. Pull satellite imagery from three major providers, run vegetation and change-detection analysis on any region, and explore everything on an interactive map. No GIS degree required.

Built with African environmental challenges in mind, but the data doesn't stop at any border.

---

<div align="center">

## ✨ &nbsp;Features

</div>

<table>
<tr>
<td width="50%" valign="top">

### 🛰️ Multi-Source Imagery
Pull from Landsat 8/9, Sentinel-2, and MODIS without juggling three different portals. One clean API, three data streams.

### 🗺️ Interactive Maps
Real-time GPS, layer overlays, time-series scrubbing, and one-click export to PNG or GeoJSON. Fast, Leaflet-powered.

</td>
<td width="50%" valign="top">

### 📊 Analysis Engine
NDVI for vegetation health, land-use classification, and temporal change detection — with configurable thresholds so you tune the sensitivity yourself.

### 🔐 Production-Ready Auth
JWT + refresh token rotation, bcrypt password hashing, Redis rate limiting, Pydantic input validation. Secure from day one.

</td>
</tr>
</table>

---

<div align="center">

## 🛰️ &nbsp;Data Sources

</div>

| &nbsp; | Source | Resolution | Refresh |
|:------:|--------|:----------:|:-------:|
| 🛰️ | **Landsat 8/9** | 30 m | Every 16 days |
| 🌍 | **Sentinel-2** | 10 m | Every 5 days |
| 🔭 | **MODIS** | 250 m – 1 km | Daily |

---

<div align="center">

## 🚀 &nbsp;Getting Started

</div>

### Prerequisites

```bash
python --version   # 3.9+
node --version     # 16+
docker --version   # optional but recommended
```

---

### 🐳 Docker (Recommended)

Spin up the full stack — frontend, backend, Postgres, Redis — in one command:

```bash
git clone https://github.com/yourusername/skywatch-africa.git
cd skywatch-africa
docker-compose up -d
```

| Service | URL |
|---------|-----|
| 🖥️ Frontend | http://localhost:3000 |
| ⚡ Backend API | http://localhost:8000 |
| 📚 API Docs | http://localhost:8000/docs |

---

### 🛠️ Manual Setup

**Backend**

```bash
cd backend
python -m venv venv && source venv/bin/activate
# Windows: venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env        # fill in your API keys
alembic upgrade head        # run database migrations
uvicorn main:app --reload --port 8000
```

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env        # point REACT_APP_API_URL at your backend
npm start
```

---

### 🔑 Environment Variables

```env
# ── Database ─────────────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/skywatch_db

# ── Satellite API Keys ───────────────────────────────
LANDSAT_API_KEY=your_key_here
SENTINEL_API_KEY=your_key_here
MODIS_API_KEY=your_key_here

# ── Security (generate with: openssl rand -hex 32) ───
SECRET_KEY=...
JWT_SECRET=...

# ── Redis ────────────────────────────────────────────
REDIS_URL=redis://localhost:6379/0

# ── Frontend ─────────────────────────────────────────
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_DEFAULT_CENTER_LAT=0.0236
REACT_APP_DEFAULT_CENTER_LNG=37.9062
```

> ⚠️ **Never commit `.env`** — it's already in `.gitignore`. Use AWS Secrets Manager or HashiCorp Vault in production.

---

<div align="center">

## 📡 &nbsp;API Reference

</div>

All requests require a Bearer token:

```http
Authorization: Bearer YOUR_API_KEY
```

<details>
<summary><b>🗺️&nbsp; POST /api/v1/satellite/query — Fetch imagery</b></summary>

<br/>

**Request:**
```json
{
  "coordinates": { "lat": -1.2921, "lon": 36.8219 },
  "date_range": { "start": "2024-01-01", "end": "2024-01-31" },
  "sources": ["landsat8", "sentinel2"],
  "bands": ["red", "green", "blue", "nir"]
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "imagery_url": "https://storage.skywatch.africa/images/xyz.tif",
    "metadata": {
      "cloud_cover": 5.2,
      "resolution": 30,
      "acquisition_date": "2024-01-15T10:30:00Z"
    }
  }
}
```
</details>

<details>
<summary><b>📊&nbsp; POST /api/v1/analysis/ndvi — Vegetation index</b></summary>

<br/>

```json
{
  "image_id": "img_12345",
  "region": {
    "type": "Polygon",
    "coordinates": [[...]]
  }
}
```
</details>

<details>
<summary><b>🔍&nbsp; POST /api/v1/analysis/change-detection — Compare time periods</b></summary>

<br/>

```json
{
  "before_date": "2023-01-01",
  "after_date":  "2024-01-01",
  "coordinates": { "lat": -1.2921, "lon": 36.8219 },
  "threshold": 0.15
}
```
</details>

<br/>

**Rate Limits**

| Plan | Per Minute | Per Day |
|------|:----------:|:-------:|
| 🆓 Free | 60 | 1,000 |
| ⚡ Pro | 300 | 10,000 |
| 🏢 Enterprise | Custom | Custom |

---

<div align="center">

## 📁 &nbsp;Project Structure

</div>

```
skywatch-africa/
├── 📂 backend/
│   ├── app/
│   │   ├── api/v1/         → satellite.py, analysis.py, auth.py
│   │   ├── core/           → config, security, rate_limiter
│   │   ├── models/         → user, imagery, analysis
│   │   └── services/       → satellite, analysis, storage
│   ├── migrations/
│   ├── tests/
│   └── main.py
│
├── 📂 frontend/
│   └── src/
│       ├── components/     → Map, Analysis, UI
│       ├── hooks/          → useMap, useGPS, useAPI
│       └── services/       → api.ts
│
├── 📂 scripts/
├── docker-compose.yml
└── README.md
```

---

<div align="center">

## 🐛 &nbsp;Troubleshooting

</div>

<details>
<summary><b>❌ &nbsp;Backend won't start — ModuleNotFoundError</b></summary>

<br/>

```bash
deactivate && rm -rf venv
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```
</details>

<details>
<summary><b>❌ &nbsp;Database connection error</b></summary>

<br/>

```bash
sudo service postgresql status     # Linux
brew services list                 # macOS

# Reset the database
dropdb skywatch_db && createdb skywatch_db
alembic upgrade head
```
</details>

<details>
<summary><b>❌ &nbsp;Map tiles not loading (gray squares)</b></summary>

<br/>

```env
# Check your .env file
REACT_APP_MAPBOX_TOKEN=pk.your_token_here
```

Or switch to free OpenStreetMap tiles — no token needed:
```js
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
```
</details>

<details>
<summary><b>🐌 &nbsp;Slow API responses</b></summary>

<br/>

- Enable Redis caching for repeated satellite queries
- Add indexes on `coordinates` and `date` columns in PostgreSQL
- Use a CDN for static imagery delivery
- Simplify large GeoJSON payloads with geometry simplification before sending to the client
</details>

---

<div align="center">

## 🤝 &nbsp;Contributing

</div>

We welcome contributions from developers, researchers, and environmental scientists.

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/skywatch-africa.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Run tests before pushing
pytest backend/tests/
npm test

# 4. Commit with conventional style
git commit -m "feat: describe your change"

# 5. Push and open a PR
git push origin feature/your-feature-name
```

| Type | Welcome |
|------|---------|
| 🐛 Bug fixes | Stability improvements |
| ✨ UI improvements | Better UX and design |
| 🔬 New algorithms | NDWI, EVI, burned area, etc. |
| 📚 Docs | Guides, tutorials, translations |

**Standards:** PEP 8 for Python · ESLint config for TypeScript · 80%+ test coverage · [Conventional Commits](https://www.conventionalcommits.org/)

---

<div align="center">

## 📄 &nbsp;License

MIT — see [LICENSE](LICENSE) for full details.

---

## 🌐 &nbsp;Get Help

[![Docs](https://img.shields.io/badge/Documentation-FF6B35?style=for-the-badge&logo=gitbook&logoColor=white)](https://docs.skywatch.africa)
[![Community](https://img.shields.io/badge/Community-4ECDC4?style=for-the-badge&logo=discourse&logoColor=white)](https://community.skywatch.africa)
[![Email](https://img.shields.io/badge/Email_Support-FFD166?style=for-the-badge&logo=gmail&logoColor=black)](mailto:support@skywatch.africa)
[![Twitter](https://img.shields.io/badge/@SkywatchAfrica-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/SkywatchAfrica)

<br/>

<!-- Animated Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=140&section=footer&animation=fadeIn&text=Making%20Satellite%20Data%20Accessible%20to%20Everyone&fontSize=16&fontColor=ffffff&fontAlignY=65" width="100%"/>

**SkyWatch Africa © 2026** — Built with ❤️ by Luthando Candlovu, for citizen scientists.

</div>



