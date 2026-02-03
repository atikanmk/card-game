# 🚀 คู่มือการ Deploy เว็บแอปพลิเคชัน (Deployment Guide)

## การ Deploy ขึ้นเว็บให้เข้าถึงได้จาก Internet

เอกสารนี้จะแนะนำวิธีการ deploy แอปพลิเคชันเล่นไพ่ Multiplayer ขึ้นเว็บให้คนอื่นๆ สามารถเข้าเล่นได้จากทุกที่

---

## 🎯 ตัวเลือกการ Deploy

### ตัวเลือกที่ 1: Render.com (แนะนำ - ฟรี และง่าย)

**ข้อดี:**
- ✅ ฟรี (Free tier)
- ✅ Deploy ทั้ง Backend และ Frontend ได้
- ✅ ตั้งค่าง่าย
- ✅ รองรับ Node.js และ Static sites

**ขั้นตอน:**

#### 1. สร้างบัญชี Render
1. ไปที่ https://render.com
2. Sign up ด้วย GitHub account
3. เชื่อมต่อ GitHub repository นี้

#### 2. Deploy Backend (Server)
1. ใน Render Dashboard คลิก **"New +"** → **"Web Service"**
2. เชื่อม GitHub repo: `atikanmk/card-game`
3. ตั้งค่าดังนี้:
   ```
   Name: card-game-server
   Region: Oregon (US West)
   Branch: main (or copilot/create-multiplayer-card-game)
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```
4. เพิ่ม Environment Variables:
   ```
   PORT: 10000 (Render จะตั้งให้อัตโนมัติ)
   NODE_ENV: production
   ALLOWED_ORIGINS: (รอจะเติมหลัง deploy frontend)
   ```
5. คลิก **"Create Web Service"**
6. รอจนกว่า deploy เสร็จ (3-5 นาที)
7. **บันทึก URL ของ backend** เช่น: `https://card-game-server-xxx.onrender.com`

#### 3. Deploy Frontend (Client)
1. กลับไปที่ Render Dashboard คลิก **"New +"** → **"Static Site"**
2. เชื่อม GitHub repo เดียวกัน
3. ตั้งค่าดังนี้:
   ```
   Name: card-game-client
   Branch: main (or copilot/create-multiplayer-card-game)
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: build
   ```
4. เพิ่ม Environment Variables:
   ```
   REACT_APP_SOCKET_URL: https://card-game-server-xxx.onrender.com
   (ใส่ URL ของ backend ที่ได้จากขั้นตอนที่ 2)
   ```
5. คลิก **"Create Static Site"**
6. รอจนกว่า deploy เสร็จ (3-5 นาที)
7. **บันทึก URL ของ frontend** เช่น: `https://card-game-client-xxx.onrender.com`

#### 4. อัพเดท Backend CORS
1. กลับไปที่ Backend service ใน Render
2. ไปที่ **"Environment"**
3. แก้ไข `ALLOWED_ORIGINS` เป็น:
   ```
   ALLOWED_ORIGINS: https://card-game-client-xxx.onrender.com
   ```
4. Save และรอให้ redeploy

#### 5. ทดสอบ
1. เปิด URL ของ frontend: `https://card-game-client-xxx.onrender.com`
2. ลองสมัครสมาชิกและเข้าสู่ระบบ
3. สร้างห้องเกมและทดสอบเล่น

**🎉 เสร็จสิ้น! แอปของคุณขึ้นเว็บแล้ว**

---

### ตัวเลือกที่ 2: Vercel (Frontend) + Render (Backend)

**ข้อดี:**
- ✅ Vercel เร็วมากสำหรับ React apps
- ✅ Auto-deploy เมื่อ push code ใหม่

**ขั้นตอน:**

#### 1. Deploy Backend ที่ Render
(ทำเหมือนตัวเลือกที่ 1 ข้อ 2)

#### 2. Deploy Frontend ที่ Vercel
1. ไปที่ https://vercel.com
2. Sign up ด้วย GitHub
3. คลิก **"Add New"** → **"Project"**
4. Import repository: `atikanmk/card-game`
5. ตั้งค่า:
   ```
   Framework Preset: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   ```
6. เพิ่ม Environment Variable:
   ```
   REACT_APP_SOCKET_URL: https://card-game-server-xxx.onrender.com
   ```
7. คลิก **"Deploy"**

#### 3. อัพเดท Backend CORS
(ทำเหมือนตัวเลือกที่ 1 ข้อ 4 แต่ใช้ URL จาก Vercel)

---

### ตัวเลือกที่ 3: Railway

**ข้อดี:**
- ✅ ฟรี $5/เดือน credit
- ✅ ใช้งานง่าย
- ✅ Deploy ได้ทั้ง Backend และ Frontend

**ขั้นตอน:**

1. ไปที่ https://railway.app
2. Sign up ด้วย GitHub
3. **"New Project"** → **"Deploy from GitHub repo"**
4. เลือก repository `atikanmk/card-game`
5. Railway จะ auto-detect และ deploy ทั้ง server และ client
6. ตั้งค่า Environment Variables คล้ายกับ Render

---

## 📝 Environment Variables สำคัญ

### Backend (.env)
```bash
PORT=10000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend (.env)
```bash
REACT_APP_SOCKET_URL=https://your-backend-url.com
```

---

## 🔧 แก้ปัญหาที่พบบ่อย

### ปัญหา: "Cannot connect to server"
**แก้:** 
- ตรวจสอบว่า `REACT_APP_SOCKET_URL` ตั้งค่าถูกต้อง
- ตรวจสอบว่า Backend service กำลังรันอยู่
- ตรวจสอบ CORS settings

### ปัญหา: "CORS Error"
**แก้:**
- เพิ่ม Frontend URL เข้าไปใน `ALLOWED_ORIGINS` ของ Backend
- Redeploy Backend หลังจากเปลี่ยน environment variable

### ปัญหา: "Build Failed"
**แก้:**
- ตรวจสอบว่า dependencies ติดตั้งถูกต้อง
- ลอง build ใน local ก่อน: `npm run build`
- ดู build logs ใน deployment platform

### ปัญหา: Backend "sleep" หลังไม่มีคนใช้งาน (Render Free tier)
**หมายเหตุ:** Render free tier จะ "sleep" service หลังไม่มี traffic 15 นาที
- Service จะ "wake up" เมื่อมีคนเข้าใช้ (ใช้เวลา 30-60 วินาที)
- ถ้าต้องการให้รันตลอด ต้องอัพเกรด plan

---

## 🎮 การใช้งานหลัง Deploy

1. แชร์ URL ของ Frontend ให้เพื่อนๆ
2. ให้แต่ละคนสมัครสมาชิกและ login
3. สร้างห้องเกมและเชิญเพื่อนเข้าร่วม
4. เริ่มเล่นได้เลย!

---

## 📊 ข้อจำกัดของ Free Tier

### Render Free Tier:
- ⚠️ Service จะ sleep หลังไม่มี traffic 15 นาที
- ⚠️ Bandwidth จำกัด (100 GB/เดือน)
- ⚠️ Build time จำกัด (500 minutes/เดือน)

### Vercel Free Tier:
- ✅ ไม่มี sleep
- ✅ Bandwidth 100 GB/เดือน
- ✅ Unlimited deployments

### Railway Free Tier:
- ⚠️ $5 credit/เดือน (~500 hours)
- ⚠️ Service จะหยุดเมื่อ credit หมด

---

## 🔐 ข้อควรระวัง

1. **อย่า commit .env files** ที่มี sensitive data
2. ตั้ง Environment Variables ผ่าน deployment platform
3. ใช้ HTTPS เสมอในการติดต่อระหว่าง Frontend-Backend
4. จำกัดจำนวนผู้เล่นพร้อมกันถ้าใช้ free tier

---

## 💡 Tips เพิ่มเติม

1. **Custom Domain:** 
   - สามารถเชื่อม domain ของคุณเองได้ใน Render, Vercel, หรือ Railway

2. **Auto Deploy:**
   - ทุก platform รองรับ auto-deploy เมื่อ push code ไปที่ GitHub

3. **Monitoring:**
   - ดู logs และ metrics ได้ใน dashboard ของแต่ละ platform

4. **Database:**
   - ถ้าต้องการเก็บข้อมูลถาวร ควรเชื่อมต่อ database (MongoDB, PostgreSQL)
   - ปัจจุบันใช้ in-memory storage (ข้อมูลจะหายเมื่อ restart)

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Socket.IO Deployment Guide](https://socket.io/docs/v4/deploying/)

---

## ✅ Checklist สำหรับ Deploy

- [ ] สร้างบัญชีบน deployment platform
- [ ] Deploy Backend service
- [ ] บันทึก Backend URL
- [ ] Deploy Frontend service
- [ ] ตั้งค่า REACT_APP_SOCKET_URL
- [ ] อัพเดท ALLOWED_ORIGINS ใน Backend
- [ ] ทดสอบการ login/register
- [ ] ทดสอบการสร้างห้องเกม
- [ ] ทดสอบ multiplayer ด้วยหลายๆ browser/device
- [ ] แชร์ URL ให้เพื่อนๆ

---

**🎉 ขอให้สนุกกับการเล่นเกมบนเว็บที่คุณ deploy เอง!**
