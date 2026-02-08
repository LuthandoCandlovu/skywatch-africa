# 🌍 SkyWatch Africa

<div align="center">

![SkyWatch Africa Banner](https://img.shields.io/badge/SkyWatch-Africa-blue?style=for-the-badge&logo=satellite&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9+-green.svg?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)

**Empowering citizen scientists across Africa to track environmental changes through satellite imagery** 🛰️

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

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

- 🎯 **Africa-Focused**: Tailored datasets and analysis for African environmental challenges
- 🚀 **Real-Time Processing**: Instant satellite imagery analysis and visualization
- 🗺️ **Interactive Maps**: Intuitive geospatial exploration with GPS integration
- 📊 **Smart Analytics**: AI-powered insights from multi-source satellite data
- 🌐 **Accessible**: Browser-based platform requiring no specialized software

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛰️ **Multi-Source Satellite Data**
- Landsat 8/9 imagery
- Sentinel-2 data integration
- MODIS datasets
- Custom data pipeline support

</td>
<td width="50%">

### 🗺️ **Interactive Mapping**
- Real-time GPS tracking
- Dynamic layer overlays
- Time-series visualization
- Export capabilities (PNG, GeoJSON)

</td>
</tr>
<tr>
<td width="50%">

### 📈 **Advanced Analytics**
- NDVI (vegetation health)
- Land use classification
- Change detection algorithms
- Temporal trend analysis

</td>
<td width="50%">

### 🔐 **Enterprise Ready**
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
    
    style A fill:#61DAFB,stroke:#333,stroke-width:2px
    style B fill:#009688,stroke:#333,stroke-width:2px
    style C fill:#FF6B6B,stroke:#333,stroke-width:2px
    style D fill:#4ECDC4,stroke:#333,stroke-width:2px
    style E fill:#FFE66D,stroke:#333,stroke-width:2px
    style F fill:#FFE66D,stroke:#333,stroke-width:2px
```

### Data Flow

```
User Request → Authentication → Rate Limiting → Data Fetching → Processing → Analysis → Visualization
     ↓              ↓                ↓              ↓              ↓            ↓            ↓
  Browser      JWT Token      Queue Check    Satellite API    Algorithms   Results    Interactive Map
```

---

## 🛠️ Technology Stack

<div align="center">

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white) | 3.9+ | Core backend language |
| ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white) | 0.100+ | REST API framework |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql&logoColor=white) | 15+ | Database management |
| ![Redis](https://img.shields.io/badge/Redis-7+-DC382D?logo=redis&logoColor=white) | 7+ | Caching & rate limiting |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black) | 18+ | UI framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white) | 5+ | Type safety |
| ![Leaflet](https://img.shields.io/badge/Leaflet-1.9+-199900?logo=leaflet&logoColor=white) | 1.9+ | Interactive maps |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?logo=tailwindcss&logoColor=white) | 3+ | Styling framework |

### Data Sources

| Source | Purpose | Update Frequency |
|--------|---------|------------------|
| 🛰️ **Landsat 8/9** | High-res multispectral imagery | 16 days |
| 🌍 **Sentinel-2** | European Space Agency data | 5 days |
| 🔭 **MODIS** | Daily global coverage | Daily |

</div>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
# Check Python version (3.9 or higher required)
python --version

# Check Node.js version (16 or higher required)
node --version

# Check npm version
npm --version

# Optional: Check Git
git --version
```

### Installation Steps

#### 1️⃣ **Clone the Repository**

```bash
# Clone with HTTPS
git clone https://github.com/yourusername/skywatch-africa.git

# Or clone with SSH
git clone git@github.com:yourusername/skywatch-africa.git

# Navigate to project directory
cd skywatch-africa
```

---

### Backend Setup

#### 2️⃣ **Set Up Python Environment**

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

#### 3️⃣ **Install Backend Dependencies**

```bash
# Install all required packages
pip install -r requirements.txt

# Verify installation
pip list
```

#### 4️⃣ **Configure Environment Variables**

```bash
# Create .env file
cp .env.example .env

# Edit .env with your preferred editor
nano .env
```

**Required Environment Variables:**

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/skywatch_db
POSTGRES_USER=skywatch_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=skywatch_db

# API Keys
LANDSAT_API_KEY=your_landsat_api_key
SENTINEL_API_KEY=your_sentinel_api_key
MODIS_API_KEY=your_modis_api_key

# Security
SECRET_KEY=your_super_secret_key_here_generate_with_openssl
JWT_SECRET=your_jwt_secret_key
API_KEY=your_api_authentication_key

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Application Settings
DEBUG=False
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
RATE_LIMIT_PER_MINUTE=60
```

#### 5️⃣ **Initialize Database**

```bash
# Run database migrations
alembic upgrade head

# Optional: Seed initial data
python scripts/seed_data.py
```

#### 6️⃣ **Start Backend Server**

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

✅ **Backend should now be running at:** `http://127.0.0.1:8000`
📚 **API Documentation:** `http://127.0.0.1:8000/docs`

---

### Frontend Setup

#### 7️⃣ **Install Frontend Dependencies**

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install npm packages
npm install

# Optional: Audit for security vulnerabilities
npm audit fix
```

#### 8️⃣ **Configure Frontend Environment**

```bash
# Create .env file
cp .env.example .env

# Edit .env
nano .env
```

**Frontend Environment Variables:**

```env
# API Configuration
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_API_KEY=your_api_authentication_key

# Map Configuration
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_DEFAULT_ZOOM=5
REACT_APP_DEFAULT_CENTER_LAT=0.0236
REACT_APP_DEFAULT_CENTER_LNG=37.9062

# Feature Flags
REACT_APP_ENABLE_GPS=true
REACT_APP_ENABLE_ANALYTICS=true
```

#### 9️⃣ **Start Frontend Development Server**

```bash
# Start development server
npm start

# The app will automatically open in your browser
```

✅ **Frontend should now be running at:** `http://localhost:3000`

---

### 🐳 Docker Setup (Alternative)

For a containerized setup:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Docker Services:**
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

---

## 📖 API Documentation

### Authentication

All API requests require authentication via API key:

```bash
# Include in headers
Authorization: Bearer YOUR_API_KEY
```

### Core Endpoints

#### 🗺️ **Get Satellite Imagery**

```http
POST /api/v1/satellite/query
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "coordinates": {
    "lat": -1.2921,
    "lon": 36.8219
  },
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
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

#### 📊 **Calculate NDVI**

```http
POST /api/v1/analysis/ndvi
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "image_id": "img_12345",
  "region": {
    "type": "Polygon",
    "coordinates": [[...]]
  }
}
```

#### 🔍 **Change Detection**

```http
POST /api/v1/analysis/change-detection
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "before_date": "2023-01-01",
  "after_date": "2024-01-01",
  "coordinates": {...},
  "threshold": 0.15
}
```

### Rate Limits

| Plan | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 300 | 10,000 |
| Enterprise | Custom | Custom |

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
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 Map/
│   │   │   │   ├── MapContainer.tsx
│   │   │   │   ├── LayerControl.tsx
│   │   │   │   └── GPS.tsx
│   │   │   ├── 📂 Analysis/
│   │   │   │   ├── NDVIChart.tsx
│   │   │   │   └── ChangeDetection.tsx
│   │   │   └── 📂 UI/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       └── Modal.tsx
│   │   ├── 📂 hooks/
│   │   │   ├── useMap.ts
│   │   │   ├── useGPS.ts
│   │   │   └── useAPI.ts
│   │   ├── 📂 services/
│   │   │   └── api.ts
│   │   ├── 📂 utils/
│   │   ├── 📂 styles/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── 📂 docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
├── 📂 scripts/
│   ├── seed_data.py
│   └── backup.sh
├── 📄 docker-compose.yml
├── 📄 .gitignore
├── 📄 LICENSE
└── 📄 README.md
```

---

## 🔐 Security Best Practices

### Production Checklist

- [ ] **Enable CORS Properly**
  ```python
  # backend/app/core/config.py
  ALLOWED_ORIGINS = [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
  ]
  ```

- [ ] **Add API Authentication**
  ```python
  # Implement JWT token authentication
  # Use bcrypt for password hashing
  # Add refresh token mechanism
  ```

- [ ] **Validate Inputs Strictly**
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

- [ ] **Rate-Limit Endpoints**
  ```python
  from slowapi import Limiter
  
  limiter = Limiter(key_func=get_remote_address)
  
  @app.get("/api/data")
  @limiter.limit("60/minute")
  async def get_data():
      ...
  ```

- [ ] **Store Secrets in Environment Variables**
  ```bash
  # Never commit .env files
  # Use secrets management (AWS Secrets Manager, HashiCorp Vault)
  # Rotate keys regularly
  ```

- [ ] **Enable HTTPS**
- [ ] **Implement Request Logging**
- [ ] **Add Input Sanitization**
- [ ] **Use Prepared SQL Statements**
- [ ] **Regular Security Audits**

---

## 🐛 Troubleshooting

### Backend Issues

#### ❌ **Backend Won't Start**

**Symptom:** `ModuleNotFoundError` or import errors

**Solution:**
```bash
cd backend
pip install -r requirements.txt --upgrade
pip install --upgrade setuptools wheel

# If issues persist, recreate virtual environment
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### ❌ **Database Connection Error**

**Symptom:** `sqlalchemy.exc.OperationalError`

**Solution:**
```bash
# Check PostgreSQL is running
sudo service postgresql status  # Linux
brew services list  # macOS

# Test connection
psql -U skywatch_user -d skywatch_db -h localhost

# Reset database
dropdb skywatch_db
createdb skywatch_db
alembic upgrade head
```

### Frontend Issues

#### ❌ **Frontend Can't Connect to Backend**

**Symptom:** Network errors in console

**Solution:**
1. Confirm backend is running:
   ```bash
   curl http://127.0.0.1:8000/health
   ```

2. Check CORS configuration in `backend/app/core/config.py`

3. Verify `.env` settings:
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```

4. Open browser console (F12) and check for errors

#### ❌ **GPS Doesn't Work**

**Symptom:** "Location access denied"

**Solution:**
1. Grant browser location permissions
2. Use `localhost` or HTTPS (required by browsers)
3. Check browser settings:
   - Chrome: `chrome://settings/content/location`
   - Firefox: `about:preferences#privacy`

#### ❌ **Map Tiles Not Loading**

**Symptom:** Gray squares instead of map

**Solution:**
```javascript
// Check Mapbox token in .env
REACT_APP_MAPBOX_TOKEN=pk.your_token_here

// Try alternative tile provider
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
```

### Performance Issues

#### 🐌 **Slow API Responses**

**Diagnosis:**
```bash
# Check backend logs
tail -f backend/logs/app.log

# Profile slow queries
# Add to backend/app/core/config.py
SQLALCHEMY_ECHO=True
```

**Solutions:**
- Enable Redis caching
- Add database indexes
- Optimize satellite data queries
- Use CDN for static imagery

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Bug Fixes**: Fix issues and improve stability
- ✨ **UI Improvements**: Enhance user experience and design
- 🚀 **API Enhancements**: Add new endpoints and features
- 📚 **Documentation**: Improve guides and tutorials
- 🔬 **Research Features**: Add new analysis algorithms

### Contribution Workflow

1. **Fork the Repository**
   ```bash
   # Click 'Fork' on GitHub
   git clone https://github.com/YOUR_USERNAME/skywatch-africa.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link related issues
   - Wait for review ✅

### Coding Standards

- **Python**: Follow PEP 8
- **TypeScript/React**: Use ESLint configuration
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)
- **Tests**: Maintain >80% code coverage

### Development Setup for Contributors

```bash
# Install development dependencies
pip install -r requirements-dev.txt
npm install --save-dev

# Run tests
pytest backend/tests/
npm test

# Check code quality
flake8 backend/
black backend/ --check
eslint src/
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SkyWatch Africa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## ⭐ Support

### Show Your Support

If you find SkyWatch Africa useful, please:

- ⭐ **Star this repository** to help others discover it
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/yourusername/skywatch-africa/issues)
- 💡 **Suggest features** in [Discussions](https://github.com/yourusername/skywatch-africa/discussions)
- 📢 **Share with your network** on social media

### Get Help

- 📖 **Documentation**: [docs.skywatch.africa](https://docs.skywatch.africa)
- 💬 **Community Forum**: [community.skywatch.africa](https://community.skywatch.africa)
- 📧 **Email Support**: support@skywatch.africa
- 🐦 **Twitter**: [@SkywatchAfrica](https://twitter.com/SkywatchAfrica)

### Acknowledgments

Built with contributions from:
- African research institutions
- Environmental NGOs
- Open-source satellite data providers
- The amazing open-source community

---

<div align="center">

### 🌍 Making Satellite Data Accessible to Everyone

<sub>Built with ❤️ by citizen scientists, for citizen scientists across Africa</sub>

**[Website](https://skywatch.africa)** • **[Documentation](https://docs.skywatch.africa)** • **[API](https://api.skywatch.africa)** • **[Community](https://community.skywatch.africa)**

---

<sub>SkyWatch Africa © 2024 • Empowering environmental monitoring through technology</sub>

</div>



