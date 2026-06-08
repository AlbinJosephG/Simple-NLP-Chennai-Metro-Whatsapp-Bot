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
## Features

### Route Planning

The Route Planning Engine calculates metro routes between Chennai Metro stations and provides route summaries optimized for WhatsApp delivery.

Capabilities:

* Route calculation between stations
* Interchange detection
* Distance estimation
* Travel time estimation
* Fare calculation

---

### Fare Calculation

The Fare Calculation module provides fare information based on source and destination stations.

Capabilities:

* Fare estimation
* Distance calculation
* Stop count information

---

### Travel Time Estimation

Provides estimated journey duration for metro travel.

Capabilities:

* Travel duration calculation
* Stop count information
* Route-based estimation

---

### Train Timings

Provides first and last train timings for supported metro stations.

Capabilities:

* First train information
* Last train information
* Station timing lookup

---

### Station Recognition Engine

Handles user spelling mistakes and station name variations using fuzzy station matching.

Examples:

* airpolt → Airport
* vaadapalani → Vadapalani
* centrall → MGR Central
* aegmoore → Egmore

Capabilities:

* Fuzzy matching
* Station normalization
* Error handling
* Suggestion generation

---

### WhatsApp Conversation System

Provides both menu-driven and natural language interactions.

Menu Options:

1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train

Navigation Commands:

* 0 → Main Menu
* 9 → Back

Supported Queries:

* Airport to Vadapalani
* Fare from Airport to Vadapalani
* Time from Airport to Vadapalani
* Timings Airport

---

## Architecture

### System Flow

```text
WhatsApp User
      │
      ▼
Twilio WhatsApp Sandbox
      │
      ▼
Express.js Backend
      │
 ┌────┼─────────────┐
 ▼    ▼             ▼
Route Parser   Session Manager
Engine
 │
 ▼
Metro Dataset
```

### Component Overview

| Component       | Responsibility               |
| --------------- | ---------------------------- |
| Twilio Sandbox  | WhatsApp message delivery    |
| Express Server  | API and webhook handling     |
| Chat Parser     | Intent detection             |
| Route Engine    | Route calculation            |
| Station Helper  | Station recognition          |
| Session Manager | Multi-step conversations     |
| Metro Dataset   | Route and timing information |
