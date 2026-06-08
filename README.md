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

◆ Supports menu-based navigation

◆ Supports natural language queries

◆ Session-aware conversations

◆ Back and Main Menu navigation

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

