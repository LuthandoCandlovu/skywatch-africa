# SkyWatch Africa (MVP)
A simple citizen-science astronomy app:
- Users submit a sky observation (type, description, location, time)
- Reports are saved to SQLite
- A web page shows a live map + latest reports

This is an **MVP** you can push to GitHub and improve (photo upload + AI detection later).

## 1) Requirements
- Python 3.10+ (3.11 is perfect)
- VS Code

## 2) Run the backend (FastAPI)
Open terminal in the project folder:

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend:
- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs
- Health: http://127.0.0.1:8000/health

A SQLite file `skywatch.db` will be created inside `backend/`.

## 3) Run the frontend
Option A (easy): open `frontend/index.html` in your browser.

Option B (recommended): use VS Code extension **Live Server**
- Right click `frontend/index.html` -> **Open with Live Server**

## 4) Test it
1. Start backend
2. Open frontend
3. Click **Use my GPS** (or type latitude/longitude)
4. Click **Submit report**
5. You’ll see it on the map and in the list

## 5) Push to GitHub
In the project root:

```bash
git init
git add .
git commit -m "SkyWatch Africa MVP: reports + map"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skywatch-africa.git
git push -u origin main
```

## Next upgrades (to make it research-level)
- Add photo/video upload (FastAPI UploadFile)
- Add validation (cloud/blur/dark checks)
- Add simple ML detection/classification
- Add export endpoint: `/reports.csv` for researchers
- Add user accounts + moderation
