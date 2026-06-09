<div align="center">

# 🚇 Chennai Metro NLP Whatsapp chatbot

### Smart Metro Information System Powered by WhatsApp

<br/>

[![License](https://img.shields.io/badge/License-MIT-0d1117?style=for-the-badge&labelColor=f97316&color=0d1117)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-0d1117?style=for-the-badge&labelColor=22c55e&color=0d1117)](#)
[![Node](https://img.shields.io/badge/Node.js-v20+-0d1117?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=3d7a3d&color=0d1117)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-Backend-0d1117?style=for-the-badge&logo=express&logoColor=white&labelColor=000000&color=0d1117)](https://expressjs.com)
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-0d1117?style=for-the-badge&logo=twilio&logoColor=white&labelColor=F22F46&color=0d1117)](https://www.twilio.com)

<br/>

> *A smart WhatsApp-based transit assistant that helps Chennai Metro commuters find routes, calculate fares, estimate travel times, and check train schedules directly from chat.*

<br/>

[**✦ Features**](#-features) ·
[**✦ Architecture**](#️-architecture) ·
[**✦ Quick Start**](#-quick-start) ·
[**✦ Twilio Setup**](#-twilio-whatsapp-setup) ·
[**✦ API Docs**](#-api-reference)

</div>

---

## ✨ Features

<br/>

### 🚇  Route Planning Engine

| Capability | Description |
|---|---|
| Route Calculation | Calculates routes between Chennai Metro stations |
| Interchange Detection | Identifies line changes automatically |
| Distance Estimation | Calculates approximate travel distance |
| Travel Time Calculation | Estimates journey duration |
| Fare Calculation | Returns fare information for the selected route |

<br/>

### 💬  Conversational Interface

```text
  ┌────────────────────────────────────────────────────┐
  │  USER MESSAGE  →  Intent Detection                 │
  │  Intent        →  Route / Fare / Time / Timings    │
  │  Response      →  WhatsApp Reply                   │
  └────────────────────────────────────────────────────┘
```

➤ Supports menu-based navigation

➤ Supports natural language queries

➤ Session-aware conversations

➤ Back and Main Menu navigation

<br/>

### 🧠  Station Recognition System

| Capability | Description |
|---|---|
| Fuzzy Matching | Handles spelling mistakes in station names |
| Station Normalization | Converts user input into valid stations |
| Error Handling | Prevents failed searches due to typos |
| Query Recovery | Allows route lookup even with incorrect spellings |

Examples:

```text
airpolt      → Airport
vaadapalani  → Vadapalani
centrall     → MGR Central
aegmoore     → Egmore
```

<br/>

### 📱  WhatsApp Experience

| Feature | Description |
|---|---|
| Menu Navigation | Guided interaction using numbered options |
| Direct Queries | Supports free-text metro requests |
| Main Menu Access | Return to home using `0` |
| Back Navigation | Return to previous step using `9` |
| Twilio Integration | WhatsApp messaging through Twilio Sandbox |

<br/>

### 🚆  Metro Information Services

| Service | Output |
|---|---|
| Route Finder | Route, Stops, Distance, Interchanges |
| Fare Calculator | Fare, Stops, Distance |
| Travel Time | Estimated Journey Duration |
| Train Timings | First Train, Last Train |

---

## 🏗️ Architecture

<br/>

```text
╔══════════════════════════════════════════════════════╗
║                    USER LAYER                        ║
║                WhatsApp Application                  ║
╚═══════════════════════╤══════════════════════════════╝
                        │
                        ▼
╔══════════════════════════════════════════════════════╗
║              TWILIO WHATSAPP SANDBOX                ║
║         Messaging Gateway & Webhook Layer           ║
╚═══════════════════════╤══════════════════════════════╝
                        │
                        ▼
╔══════════════════════════════════════════════════════╗
║                EXPRESS.JS BACKEND                   ║
║         Routing · Sessions · Processing             ║
╚══════╤══════════════╤══════════════╤════════════════╝
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Route      │ │ Chat       │ │ Session    │
│ Engine     │ │ Parser     │ │ Manager    │
└─────┬──────┘ └────────────┘ └────────────┘
      │
      ▼
┌────────────────────────────────────────────┐
│         Chennai Metro Dataset              │
│ Stations · Routes · Fares · Timings        │
└────────────────────────────────────────────┘
```

<br/>

### Service Map

| Service | Stack | Responsibility |
|---|---|---|
| WhatsApp Interface | Twilio Sandbox | Message delivery |
| Backend Server | Node.js + Express | Routing & processing |
| Route Engine | JavaScript | Route calculations |
| Chat Parser | NLP Rules | Intent detection |
| Session Manager | In-Memory Storage | Conversation tracking |
| Metro Dataset | JSON | Stations, routes, fares, timings |

---

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18
npm  >= 9
```

You'll also need:

- Twilio Account
- Twilio WhatsApp Sandbox
- ngrok
- Git

<br/>

### 1 — Clone

```bash
git clone https://github.com/YOUR_USERNAME/Simple-NLP-Chennai-Metro-Whatsapp-Bot.git
cd Simple-NLP-Chennai-Metro-Whatsapp-Bot
```

<br/>

### 2 — Install Dependencies

```bash
npm install
```

<br/>

### 3 — Configure Environment

Create `.env`:

```env
PORT=5000
```

<br/>

### 4 — Start Application

```bash
npm start

# ✓ Server running on http://localhost:5000
```

<br/>

### 5 — Start ngrok

```bash
ngrok http 5000
```

Example:

```text
https://abcd-1234.ngrok-free.app
```

<br/>

> Application running? Continue to Twilio setup below.

<br/>

---

## 📱 Twilio WhatsApp Setup

### 1 — Create Twilio Account

Create a free Twilio account and activate the WhatsApp Sandbox.

<br/>

### 2 — Configure Webhook

Start ngrok and copy your public URL.

Set:

```text
https://YOUR-NGROK-URL.ngrok-free.app/whatsapp
```

Method:

```text
POST
```

<br/>

### 3 — Join Sandbox

Send the Twilio-provided join code to:

```text
+1 415 523 8886
```

<br/>

### 4 — Test

Send:

```text
hi
```

Expected:

```text
Chennai Metro Bot

1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train
```
---

## 📡 API Reference

<br/>

### Route Services

```text
POST  /chat                      → Route Planning
POST  /chat                      → Fare Calculation
POST  /chat                      → Travel Time Estimation
POST  /chat                      → Train Timings
```

### WhatsApp Integration

```text
POST  /whatsapp                  → Twilio WhatsApp Webhook
```

### Sample Queries

```text
Airport to Vadapalani

Fare from Airport to Vadapalani

Time from Airport to Vadapalani

Timings Airport
```

<br/>

---

## 🛠 Tech Stack

<br/>

<div align="center">

### Messaging Platform

![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-F22F46?style=flat-square&logo=twilio&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)

### Development & Deployment

![ngrok](https://img.shields.io/badge/ngrok-1F1E37?style=flat-square)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)

### Core Modules

![Route Engine](https://img.shields.io/badge/Route-Engine-2563EB?style=flat-square)
![Chat Parser](https://img.shields.io/badge/Chat-Parser-7C3AED?style=flat-square)
![Session Manager](https://img.shields.io/badge/Session-Manager-059669?style=flat-square)
![Metro Dataset](https://img.shields.io/badge/Metro-Dataset-D97706?style=flat-square)

</div>

<br/>

---

## 📂 Project Structure

```text
Simple-NLP-Chennai-Metro-Whatsapp-Bot/
│
├── data/
│   ├── stations.js
│   └── timings.js
│
├── services/
│   ├── routeFinder.js
│   ├── chatParser.js
│   ├── stationHelper.js
│   └── sessionManager.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

<br/>
---

## OUTPUT SCREENSHOTS

<img width="1133" height="408" alt="image" src="https://github.com/user-attachments/assets/03cd7d4b-f540-48dc-aa40-a2322bedcc59" />
<img width="1153" height="417" alt="image" src="https://github.com/user-attachments/assets/287e210e-1536-45df-a29d-ba7b31f8ed4c" />
<img width="376" height="678" alt="image" src="https://github.com/user-attachments/assets/092eb3d0-85d3-45e3-a171-a85dae6c0996" />

