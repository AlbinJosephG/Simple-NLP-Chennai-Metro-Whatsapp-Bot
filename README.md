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

### Transit Information Services

| Service | Description |
|----------|------------|
| Route Planning | Calculates metro routes between Chennai Metro stations and provides route summaries with line information, interchanges, travel time, fare, and distance. |
| Fare Calculation | Provides fare estimates between source and destination stations along with stop count and travel distance. |
| Travel Time Estimation | Calculates approximate journey duration using predefined metro route data. |
| Train Timings | Returns first and last train timings for supported Chennai Metro stations. |

### Conversational Interface

| Capability | Description |
|------------|------------|
| Menu-Based Navigation | Guided WhatsApp interaction through numbered menu options. |
| Natural Language Queries | Supports direct requests without requiring menu navigation. |
| Session Management | Maintains user context during multi-step interactions. |
| Error Recovery | Allows users to return to previous steps or the main menu. |

### Station Recognition Engine

| Capability | Description |
|------------|------------|
| Fuzzy Matching | Handles common spelling mistakes in station names |
| Station Normalization |	Maps user input to valid station names |
| Suggestion Handling |	Improves route discovery even with incorrect input |

### WhatsApp Navigation

> 1. Find Route
> 2. Check Fare
> 3. Travel Time
> 4. First & Last Train




