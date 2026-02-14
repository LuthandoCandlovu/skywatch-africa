<div align="center">

# 🌍 SkyWatch Africa

![SkyWatch Africa](https://img.shields.io/badge/SkyWatch-Africa-FF6B35?style=for-the-badge&logo=satellite&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFD166?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

**Empowering citizen scientists across Africa to track environmental changes through satellite imagery** 🛰️

[Features](#-key-features) • [Architecture](#-system-architecture) • [Quick Start](#-getting-started) • [API Docs](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Docker Setup](#-docker-setup-alternative)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security Best Practices](#-security-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

SkyWatch Africa is a cutting-edge platform that democratizes access to satellite imagery analysis. Built for researchers, environmentalists, and citizen scientists, it provides real-time insights into environmental changes across the African continent.

### What Makes Us Different

| | |
|---|---|
| 🎯 **Africa-Focused** | Tailored datasets and analysis for African environmental challenges |
| 🚀 **Real-Time Processing** | Instant satellite imagery analysis and visualization |
| 🗺️ **Interactive Maps** | Intuitive geospatial exploration with GPS integration |
| 📊 **Smart Analytics** | AI-powered insights from multi-source satellite data |
| 🌐 **Accessible** | Browser-based platform requiring no specialized software |

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛰️ Multi-Source Satellite Data
- Landsat 8/9 imagery
- Sentinel-2 data integration
- MODIS datasets
- Custom data pipeline support

### 🗺️ Interactive Mapping
- Real-time GPS tracking
- Dynamic layer overlays
- Time-series visualization
- Export capabilities (PNG, GeoJSON)

</td>
<td width="50%">

### 📈 Advanced Analytics
- NDVI (vegetation health)
- Land use classification
- Change detection algorithms
- Temporal trend analysis

### 🔐 Enterprise Ready
- Secure API authentication
- Rate limiting & throttling
- CORS configuration
- Environment-based secrets

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[React Frontend<br/>Port: 3000]
        A1[Leaflet Maps]
        A2[Interactive UI]
        A3[GPS Handler]
    end

    subgraph "API Gateway"
        B[FastAPI Backend<br/>Port: 8000]
        B1[Authentication]
        B2[Rate Limiter]
        B3[CORS Handler]
    end

    subgraph "Data Processing"
        C[Satellite Data Processor]
        C1[Landsat API]
        C2[Sentinel Hub]
        C3[MODIS Interface]
    end

    subgraph "Analytics Engine"
        D[Analysis Pipeline]
        D1[NDVI Calculator]
        D2[Change Detection]
        D3[ML Models]
    end

    subgraph "Storage Layer"
        E[(PostgreSQL<br/>Metadata)]
        F[(Object Storage<br/>Imagery)]
    end

    A --> A1 & A2 & A3
    A1 & A2 & A3 --> B
    B --> B1 & B2 & B3
    B1 & B2 & B3 --> C
    C --> C1 & C2 & C3
    C1 & C2 & C3 --> D
    D --> D1 & D2 & D3
    D --> E & F

    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#009688,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#FF6B35,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#4ECDC4,stroke:#333,stroke-width:2px,color:#000
    style E fill:#FFD166,stroke:#333,stroke-width:2px,color:#000
    style F fill:#FFD166,stroke:#333,stroke-width:2px,color:#000
```

### Data Flow

```
User Request → Authentication → Rate Limiting → Data Fetching → Processing → Analysis → Visualization
     ↓               ↓               ↓               ↓              ↓           ↓            ↓
  Browser       JWT Token        Queue Check      Satellite       Algorithms   Results    Interactive
                                                    API                                     Map
```

---

## 🛠️ Technology Stack

### Backend

| Technology | Version | Purpose |
|:----------:|:-------:|---------|
| ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) | `3.9+` | Core backend language |
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white) | `0.100+` | Async REST API framework |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) | `15+` | Metadata & relational storage |
| ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white) | `7+` | Caching & rate limiting |

### Frontend

| Technology | Version | Purpose |
|:----------:|:-------:|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) | `18+` | UI framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | `5+` | Type safety |
| ![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white) | `1.9+` | Interactive maps |
| ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white) | `3+` | Utility-first styling |

### Data Sources

| Source | Resolution | Purpose | Refresh |
|--------|:----------:|---------|:-------:|
| 🛰️ **Landsat 8/9** | 30 m | High-res multispectral imagery | Every 16 days |
| 🌍 **Sentinel-2** | 10 m | ESA optical imagery, 13 bands | Every 5 days |
| 🔭 **MODIS** | 250 m–1 km | Daily global coverage | Daily |

---

## 🚀 Getting Started

### Prerequisites

Verify the following tools are installed before proceeding:

```bash
python --version   # 3.9 or higher required
node --version     # 16 or higher required
npm --version
git --version
```

### Installation

#### 1️⃣ Clone the Repository

```bash
# HTTPS
git clone https://github.com/yourusername/skywatch-africa.git

# SSH
git clone git@github.com:yourusername/skywatch-africa.git

cd skywatch-africa
```

---

### Backend Setup

#### 2️⃣ Set Up Python Environment

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # macOS / Linux
# venv\Scripts\activate           # Windows

pip install --upgrade pip
```

#### 3️⃣ Install Backend Dependencies

```bash
pip install -r requirements.txt
pip list   # verify installation
```

#### 4️⃣ Configure Environment Variables

```bash
cp .env.example .env
nano .env   # or your preferred editor
```

**Required `.env` variables:**

```env
# ── Database ──────────────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/skywatch_db
POSTGRES_USER=skywatch_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=skywatch_db

# ── Satellite API Keys ────────────────────────────────
LANDSAT_API_KEY=your_landsat_api_key
SENTINEL_API_KEY=your_sentinel_api_key
MODIS_API_KEY=your_modis_api_key

# ── Security ──────────────────────────────────────────
SECRET_KEY=your_super_secret_key_here_generate_with_openssl
JWT_SECRET=your_jwt_secret_key
API_KEY=your_api_authentication_key

# ── Redis ─────────────────────────────────────────────
REDIS_URL=redis://localhost:6379/0

# ── Application ───────────────────────────────────────
DEBUG=False
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
RATE_LIMIT_PER_MINUTE=60
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

#### 5️⃣ Initialize Database

```bash
alembic upgrade head              # run migrations
python scripts/seed_data.py       # optional: seed sample data
```

#### 6️⃣ Start the Backend Server

```bash
# Development (auto-reload)
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

✅ Backend running at: `http://127.0.0.1:8000`  
📚 Interactive API docs: `http://127.0.0.1:8000/docs`

---

### Frontend Setup

#### 7️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
npm audit fix   # optional: resolve vulnerabilities
```

#### 8️⃣ Configure Frontend Environment

```bash
cp .env.example .env
```

```env
# ── API ───────────────────────────────────────────────
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_API_KEY=your_api_authentication_key

# ── Map ───────────────────────────────────────────────
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_DEFAULT_ZOOM=5
REACT_APP_DEFAULT_CENTER_LAT=0.0236
REACT_APP_DEFAULT_CENTER_LNG=37.9062

# ── Feature Flags ─────────────────────────────────────
REACT_APP_ENABLE_GPS=true
REACT_APP_ENABLE_ANALYTICS=true
```

#### 9️⃣ Start the Development Server

```bash
npm start   # opens automatically at http://localhost:3000
```

✅ Frontend running at: `http://localhost:3000`

---

### 🐳 Docker Setup (Alternative)

Spin up the entire stack — frontend, backend, PostgreSQL, and Redis — with a single command:

```bash
docker-compose up -d        # start all services
docker-compose logs -f      # stream logs
docker-compose down         # stop services
docker-compose down -v      # stop + remove volumes
```

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:3000` |
| Backend | `http://localhost:8000` |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

---

## 📖 API Documentation

### Authentication

All requests require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Core Endpoints

#### 🗺️ Get Satellite Imagery

```http
POST /api/v1/satellite/query
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "coordinates": { "lat": -1.2921, "lon": 36.8219 },
  "date_range": { "start": "2024-01-01", "end": "2024-01-31" },
  "sources": ["landsat8", "sentinel2"],
  "bands": ["red", "green", "blue", "nir"]
}
```

<details>
<summary>📤 Sample Response</summary>

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

---

#### 📊 Calculate NDVI

```http
POST /api/v1/analysis/ndvi
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "image_id": "img_12345",
  "region": {
    "type": "Polygon",
    "coordinates": [[...]]
  }
}
```

---

#### 🔍 Change Detection

```http
POST /api/v1/analysis/change-detection
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "before_date": "2023-01-01",
  "after_date":  "2024-01-01",
  "coordinates": { ... },
  "threshold": 0.15
}
```

---

### Rate Limits

| Plan | Requests / Minute | Requests / Day |
|------|:-----------------:|:--------------:|
| 🆓 Free | 60 | 1,000 |
| ⚡ Pro | 300 | 10,000 |
| 🏢 Enterprise | Custom | Custom |

---

## 📁 Project Structure

```
skywatch-africa/
├── 📂 backend/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   ├── 📂 v1/
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── satellite.py
│   │   │   │   │   ├── analysis.py
│   │   │   │   │   └── auth.py
│   │   │   │   └── api.py
│   │   │   └── deps.py
│   │   ├── 📂 core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── rate_limiter.py
│   │   ├── 📂 models/
│   │   │   ├── user.py
│   │   │   ├── imagery.py
│   │   │   └── analysis.py
│   │   ├── 📂 services/
│   │   │   ├── satellite_service.py
│   │   │   ├── analysis_service.py
│   │   │   └── storage_service.py
│   │   └── 📂 utils/
│   │       ├── validators.py
│   │       └── helpers.py
│   ├── 📂 tests/
│   ├── 📂 migrations/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── 📂 frontend/
│   ├── 📂 public/
│   └── 📂 src/
│       ├── 📂 components/
│       │   ├── 📂 Map/
│       │   │   ├── MapContainer.tsx
│       │   │   ├── LayerControl.tsx
│       │   │   └── GPS.tsx
│       │   ├── 📂 Analysis/
│       │   │   ├── NDVIChart.tsx
│       │   │   └── ChangeDetection.tsx
│       │   └── 📂 UI/
│       │       ├── Button.tsx
│       │       ├── Card.tsx
│       │       └── Modal.tsx
│       ├── 📂 hooks/
│       │   ├── useMap.ts
│       │   ├── useGPS.ts
│       │   └── useAPI.ts
│       ├── 📂 services/
│       │   └── api.ts
│       ├── App.tsx
│       └── index.tsx
│
├── 📂 docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
├── 📂 scripts/
│   ├── seed_data.py
│   └── backup.sh
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔐 Security Best Practices

### Production Checklist

- [ ] **Enable CORS Properly**

  ```python
  # backend/app/core/config.py
  ALLOWED_ORIGINS = [
      "https://yourdomain.com",
      "https://www.yourdomain.com",
  ]
  ```

- [ ] **JWT Authentication with bcrypt**

  ```python
  # Implement JWT with access + refresh token rotation
  # Use bcrypt for all password hashing
  ```

- [ ] **Strict Input Validation**

  ```python
  from pydantic import BaseModel, validator

  class CoordinateInput(BaseModel):
      lat: float
      lon: float

      @validator('lat')
      def validate_latitude(cls, v):
          if not -90 <= v <= 90:
              raise ValueError('Invalid latitude')
          return v
  ```

- [ ] **Rate-Limit All Endpoints**

  ```python
  from slowapi import Limiter
  from slowapi.util import get_remote_address

  limiter = Limiter(key_func=get_remote_address)

  @app.get("/api/data")
  @limiter.limit("60/minute")
  async def get_data():
      ...
  ```

- [ ] **Store Secrets in Environment Variables**

  ```bash
  # Never commit .env files
  # Use AWS Secrets Manager or HashiCorp Vault in production
  # Rotate API keys regularly
  ```

- [ ] **Enable HTTPS in production**
- [ ] **Implement structured request logging**
- [ ] **Sanitize all user inputs**
- [ ] **Use SQLAlchemy ORM — no raw SQL strings**
- [ ] **Run regular security audits (`pip-audit`, `npm audit`)**

---

## 🐛 Troubleshooting

### Backend Issues

<details>
<summary>❌ <strong>Backend won't start</strong> — <code>ModuleNotFoundError</code></summary>

```bash
cd backend
pip install -r requirements.txt --upgrade
pip install --upgrade setuptools wheel

# If issues persist, recreate the virtual environment
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

</details>

<details>
<summary>❌ <strong>Database connection error</strong> — <code>sqlalchemy.exc.OperationalError</code></summary>

```bash
# Verify PostgreSQL is running
sudo service postgresql status     # Linux
brew services list                 # macOS

# Test connection
psql -U skywatch_user -d skywatch_db -h localhost

# Reset database
dropdb skywatch_db
createdb skywatch_db
alembic upgrade head
```

</details>

### Frontend Issues

<details>
<summary>❌ <strong>Frontend can't connect to backend</strong></summary>

1. Confirm the backend is running:
   ```bash
   curl http://127.0.0.1:8000/health
   ```
2. Check CORS settings in `backend/app/core/config.py`
3. Verify your `.env`:
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```
4. Open browser DevTools (F12) → Network tab for error details

</details>

<details>
<summary>❌ <strong>GPS doesn't work</strong> — "Location access denied"</summary>

1. Grant browser location permission when prompted
2. Ensure you're serving over `localhost` or HTTPS (browser requirement)
3. Check browser settings:
   - Chrome: `chrome://settings/content/location`
   - Firefox: `about:preferences#privacy`

</details>

<details>
<summary>❌ <strong>Map tiles not loading</strong> — gray squares</summary>

```javascript
// Verify your Mapbox token in .env
REACT_APP_MAPBOX_TOKEN=pk.your_token_here

// Or switch to the free OpenStreetMap provider
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
```

</details>

### Performance Issues

<details>
<summary>🐌 <strong>Slow API responses</strong></summary>

**Diagnose:**
```bash
tail -f backend/logs/app.log

# Enable SQL query logging
SQLALCHEMY_ECHO=True   # in backend/app/core/config.py
```

**Solutions:**
- Enable Redis caching for repeated satellite queries
- Add PostgreSQL indexes on `coordinates` and `date` columns
- Use a CDN for static imagery delivery
- Optimize large GeoJSON payloads with simplification

</details>

---

## 🤝 Contributing

We welcome contributions from developers, researchers, and environmental scientists! Here's how to get involved:

### Ways to Contribute

| Type | Description |
|------|-------------|
| 🐛 **Bug Fixes** | Fix issues and improve stability |
| ✨ **UI Improvements** | Enhance user experience and design |
| 🚀 **API Enhancements** | Add new endpoints and features |
| 📚 **Documentation** | Improve guides and tutorials |
| 🔬 **Research Features** | Add new analysis algorithms |

### Contribution Workflow

```bash
# 1. Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/skywatch-africa.git

# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes — write clean, tested code

# 4. Commit using Conventional Commits
git add .
git commit -m "feat: add amazing feature"

# 5. Push and open a Pull Request
git push origin feature/amazing-feature
```

### Development Setup for Contributors

```bash
# Install dev dependencies
pip install -r requirements-dev.txt
npm install --save-dev

# Run tests
pytest backend/tests/
npm test

# Lint and format
flake8 backend/
black backend/ --check
eslint src/
```

### Coding Standards

- **Python** — Follow [PEP 8](https://pep8.org/)
- **TypeScript / React** — Use the ESLint config provided
- **Commits** — Use [Conventional Commits](https://www.conventionalcommits.org/)
- **Tests** — Maintain >80% code coverage

---

## 📄 License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE) for full details.

```
MIT License

Copyright (c) 2024 SkyWatch Africa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## ⭐ Support

### Show Your Support

If SkyWatch Africa is useful to you, please:

- ⭐ **Star this repository** to help others discover it
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/yourusername/skywatch-africa/issues)
- 💡 **Suggest features** in [Discussions](https://github.com/yourusername/skywatch-africa/discussions)
- 📢 **Share** with your network and research community

### Get Help

| Channel | Link |
|---------|------|
| 📖 Documentation | [docs.skywatch.africa](https://docs.skywatch.africa) |
| 💬 Community Forum | [community.skywatch.africa](https://community.skywatch.africa) |
| 📧 Email Support | support@skywatch.africa |
| 🐦 Twitter / X | [@SkywatchAfrica](https://twitter.com/SkywatchAfrica) |

### Acknowledgments

Built with contributions from:

- African research institutions and universities
- Environmental NGOs across the continent
- Open-source satellite data providers (NASA, ESA)
- The amazing global open-source community 🌍

---

<div align="center">

### 🌍 Making Satellite Data Accessible to Everyone

Built with ❤️ by citizen scientists, for citizen scientists across Africa

[Website](https://skywatch.africa) • [Documentation](https://docs.skywatch.africa) • [API](https://api.skywatch.africa) • [Community](https://community.skywatch.africa)

---

**SkyWatch Africa © 2024** — Empowering environmental monitoring through technology.

![Visitors](https://img.shields.io/badge/dynamic/json?label=Visitors&query=value&url=https://api.countapi.xyz/hit/skywatch-africa/visits&color=FF6B35&style=flat-square)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/skywatch-africa?style=flat-square&color=FFD166)](https://github.com/yourusername/skywatch-africa/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/skywatch-africa?style=flat-square&color=06D6A0)](https://github.com/yourusername/skywatch-africa/network/members)

</div>



