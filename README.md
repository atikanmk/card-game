# Card Game - Multiplayer
เว็บแอปพลิเคชันเล่นไพ่แบบ Multiplayer

## คุณสมบัติหลัก (Features)

### ระบบ Authentication
- **สมัครสมาชิก (Register)**: สร้างบัญชีผู้ใช้ใหม่ด้วย username และ password
- **เข้าสู่ระบบ (Login)**: ล็อกอินเข้าสู่ระบบเพื่อเข้าเล่นเกม

### ระบบ Game Lobby
- แสดงรายการห้องเกมที่มีอยู่ทั้งหมด
- สร้างห้องเกมใหม่ได้
- เข้าร่วมห้องเกมที่มีอยู่ได้
- แสดงจำนวนผู้เล่นในแต่ละห้อง (สูงสุด 4 คน)
- แสดงสถานะห้อง (รอผู้เล่น/กำลังเล่น)

### เกมไพ่ (Card Game)
- สำรับไพ่มาตรฐาน 52 ใบ
- แจกไพ่ให้ผู้เล่นแต่ละคนอย่างเท่าเทียม
- ระบบเล่นไพ่แบบตามลำดับ (turn-based)
- แสดงไพ่ที่ถูกเล่นบนโต๊ะพร้อมชื่อผู้เล่น
- Real-time update เมื่อมีผู้เล่นคนอื่นเล่นไพ่
- รองรับผู้เล่น 2-4 คนพร้อมกัน

## Tech Stack

### Frontend
- **React.js** - สร้าง UI components
- **Socket.io-client** - Real-time communication
- **CSS3** - สไตล์และ responsive design

### Backend
- **Node.js + Express** - REST API server
- **Socket.io** - WebSocket สำหรับ multiplayer real-time
- **In-memory Storage** - เก็บข้อมูลผู้ใช้และห้องเกม

## โครงสร้างโปรเจกต์ (Project Structure)

```
card-game/
├── client/                 # Frontend React Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Lobby.js
│   │   │   └── Game.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Lobby.css
│   │   │   ├── Game.css
│   │   │   └── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Backend Node.js Server
│   ├── routes/
│   │   └── auth.js        # User authentication
│   ├── socket/
│   │   └── gameSocket.js  # Socket.io handlers
│   ├── game/
│   │   ├── cardGame.js    # Card game logic
│   │   └── roomManager.js # Room management
│   ├── index.js           # Main server file
│   └── package.json
├── package.json           # Root package.json
├── .gitignore
└── README.md
```

## 🚀 การติดตั้งและรันโปรเจกต์ (Installation & Running)

### ข้อกำหนดเบื้องต้น (Prerequisites)
- Node.js (version 14 หรือสูงกว่า)
- npm หรือ yarn
- เบราว์เซอร์ที่รองรับ WebSocket (Chrome, Firefox, Safari, Edge)

### 📦 วิธีการติดตั้ง (Installation Steps)

1. **Clone repository**
```bash
git clone https://github.com/atikanmk/card-game.git
cd card-game
```

2. **ติดตั้ง dependencies ทั้งหมด**
```bash
# ติดตั้ง dependencies สำหรับ server
cd server
npm install

# ติดตั้ง dependencies สำหรับ client
cd ../client
npm install
```

### ▶️ วิธีการรันโปรเจกต์ (Running the Application)

**⚠️ สำคัญ: ต้องรัน Server และ Client แยกกันใน Terminal คนละอัน**

#### Terminal 1 - รัน Backend Server:
```bash
cd server
npm start
```
✅ Server จะรันที่: **http://localhost:3001**

#### Terminal 2 - รัน Frontend Client:
```bash
cd client
npm start
```
✅ Client จะรันที่: **http://localhost:3000**

### 🌐 เข้าใช้งานแอปพลิเคชัน
เปิดเบราว์เซอร์และไปที่: **http://localhost:3000**

### 🎮 ลิงก์สำหรับใช้งาน (Access Links)
- **เว็บแอปพลิเคชัน (Frontend):** http://localhost:3000
- **API Server (Backend):** http://localhost:3001
- **API Health Check:** http://localhost:3001/

## วิธีการเล่น (How to Play)

1. **สมัครสมาชิก**: สร้างบัญชีใหม่ด้วย username และ password
2. **เข้าสู่ระบบ**: Login ด้วยบัญชีที่สร้างไว้
3. **สร้างหรือเข้าห้อง**: 
   - สร้างห้องเกมใหม่ หรือ
   - เข้าร่วมห้องที่มีอยู่แล้ว
4. **รอผู้เล่น**: รอให้มีผู้เล่นอย่างน้อย 2 คน
5. **เริ่มเกม**: ผู้สร้างห้องสามารถกดเริ่มเกมได้
6. **เล่นไพ่**: เล่นไพ่ตามลำดับเมื่อถึงตาของคุณ

## การพัฒนา (Development)

### Structure Overview

- **Authentication**: ใช้ in-memory storage สำหรับเก็บข้อมูลผู้ใช้
- **Real-time Communication**: ใช้ Socket.io สำหรับ WebSocket connection
- **Game Logic**: จัดการการ์ด, ห้อง, และเทิร์นของผู้เล่น
- **UI/UX**: Responsive design ใช้งานได้ทั้ง desktop และ mobile

### Socket Events

#### Client → Server
- `user:authenticate` - ยืนยันตัวตนผู้ใช้
- `rooms:get` - ขอรายการห้องทั้งหมด
- `room:create` - สร้างห้องใหม่
- `room:join` - เข้าร่วมห้อง
- `room:leave` - ออกจากห้อง
- `game:start` - เริ่มเกม
- `game:play-card` - เล่นไพ่

#### Server → Client
- `user:authenticated` - ยืนยันการ authenticate
- `rooms:list` - รายการห้องทั้งหมด
- `rooms:update` - อัพเดทรายการห้อง
- `room:created` - ห้องถูกสร้างสำเร็จ
- `room:joined` - เข้าร่วมห้องสำเร็จ
- `room:player-joined` - มีผู้เล่นเข้าร่วม
- `room:player-left` - มีผู้เล่นออกจากห้อง
- `game:started` - เกมเริ่มแล้ว
- `game:card-played` - มีการเล่นไพ่
- `game:error` - เกิดข้อผิดพลาด

## License
MIT
