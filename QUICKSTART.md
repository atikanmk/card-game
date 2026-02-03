# 🎮 Card Game - Quick Start Guide

## สถานะปัจจุบัน (Current Status)
✅ **แอปพลิเคชันพร้อมใช้งานแล้ว!** (Application is ready!)

## 🚀 การใช้งานด่วน (Quick Start)

### 1. ติดตั้ง Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. รัน Server (Terminal 1)
```bash
cd server
npm start
```
> Server จะรันที่ http://localhost:3001

### 3. รัน Client (Terminal 2)
```bash
cd client
npm start
```
> Client จะรันที่ http://localhost:3000

### 4. เปิดเบราว์เซอร์
ไปที่: **http://localhost:3000**

## 📸 ตัวอย่างหน้าจอ (Screenshots)

### หน้าเข้าสู่ระบบ (Login Page)
![Login](https://github.com/user-attachments/assets/dfbc4234-8e7f-476e-ada3-ae847e968b91)

### หน้าสมัครสมาชิก (Register Page)
![Register](https://github.com/user-attachments/assets/c01db023-09b3-407f-8153-a522431b4be7)

### ห้องรอเกม (Game Lobby)
![Lobby](https://github.com/user-attachments/assets/2b0dfa80-4259-4078-974b-556f7d4fbced)

### สร้างห้องเกม (Create Room)
![Create Room](https://github.com/user-attachments/assets/f1fbc7c1-4b52-4e6c-9b09-f0687e5bcf95)

## 🎯 วิธีการเล่น (How to Play)

1. **สมัครสมาชิก**: กรอก username และ password เพื่อสร้างบัญชี
2. **เข้าสู่ระบบ**: Login ด้วยบัญชีที่สร้างไว้
3. **สร้างหรือเข้าห้อง**: คลิก "สร้างห้องใหม่" หรือเข้าร่วมห้องที่มีอยู่
4. **รอผู้เล่น**: ต้องมีผู้เล่นอย่างน้อย 2 คน
5. **เริ่มเกม**: ผู้สร้างห้องกดปุ่ม "เริ่มเกม"
6. **เล่นไพ่**: คลิกที่ไพ่เมื่อถึงตาของคุณ

## 🔗 ลิงก์สำคัญ (Important Links)

- **เว็บแอป:** http://localhost:3000
- **API Server:** http://localhost:3001
- **GitHub Repository:** https://github.com/atikanmk/card-game

## ⚡ ฟีเจอร์หลัก (Main Features)

✅ ระบบสมัครสมาชิกและเข้าสู่ระบบ
✅ สร้างและเข้าร่วมห้องเกม
✅ เล่นไพ่แบบ Real-time ด้วย Socket.IO
✅ รองรับผู้เล่น 2-4 คนพร้อมกัน
✅ สำรับไพ่มาตรฐาน 52 ใบ
✅ UI สวยงามรองรับภาษาไทย

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

**Frontend:**
- React.js
- Socket.IO Client
- CSS3

**Backend:**
- Node.js + Express
- Socket.IO
- In-memory Storage

## 📝 หมายเหตุ (Notes)

- แอปพลิเคชันรันบน localhost (เครื่องของคุณเอง)
- ข้อมูลผู้ใช้เก็บใน memory (จะหายเมื่อปิด server)
- ต้องรัน server และ client พร้อมกันจึงจะใช้งานได้

## 🐛 การแก้ปัญหา (Troubleshooting)

**ปัญหา: Cannot connect to server**
- ตรวจสอบว่า server รันอยู่ที่ port 3001
- ลองรีสตาร์ท server

**ปัญหา: Port already in use**
- ปิดโปรแกรมที่ใช้ port 3000 หรือ 3001
- หรือเปลี่ยน port ในไฟล์ config

## 👥 ทดสอบ Multiplayer

เปิด browser หลายๆ tab/window:
1. Tab 1: สร้างบัญชี "Player1" และสร้างห้อง
2. Tab 2: สร้างบัญชี "Player2" และเข้าห้อง
3. กดเริ่มเกมและทดสอบเล่นไพ่

---

**สนุกกับการเล่นไพ่! 🎴**
