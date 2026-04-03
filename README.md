# 🛡️ GigShield – Risk-Based Insurance for Gig Workers

## 📌 Overview

**GigShield** is a smart, location-aware insurance platform designed for gig workers such as delivery partners (Zomato, Swiggy, etc.).
It calculates **personalized risk scores** based on real-world conditions and provides **dynamic insurance premiums** along with automated claim processing.

The system aims to ensure **financial protection, fairness, and fast claim settlement** using data-driven insights.

---

## 🎯 Key Features

### 🔐 Authentication System

* Secure login and registration
* Separate roles: **Worker** and **Admin**
* Demo accounts available for testing

---

### 📍 Location-Based Risk Assessment

* Users select:

  * State
  * District
  * Area
* Risk is calculated based on hyper-local data

---

### 📊 AI Risk Calculation

The risk score is computed using:

* 🌊 Flood Risk
* ☀️ Heat Risk
* 😷 Air Pollution (AQI)
* 🚫 Strike / Curfew Risk

Each factor contributes to a **composite risk score (0–100)**.

---

### 💰 Dynamic Premium Calculation

Premium is determined using:

* Risk Score
* Platform (Zomato, Swiggy, etc.)
* Weekly Earnings

Plans available:

* Basic
* Standard
* Premium

---

### 📋 Worker Dashboard

* View active policy
* Track claims
* Check risk score
* View weekly premium

---

### ⚡ Automated Claims System

* Parametric insurance model
* Claims triggered automatically when:

  * Rainfall exceeds threshold
  * Temperature crosses limit
  * AQI becomes hazardous
* Reduces manual paperwork

---

### 🌧️ Real-Time Alerts

* Weather and disruption alerts
* Area-specific notifications
* Trigger-based claim indication

---

### 🛠️ Admin Dashboard

* Monitor all workers
* Manage claims
* Fraud detection system
* Analytics & insights

---

## 🧠 How It Works

1. User registers and selects location
2. System calculates risk score using predefined factors
3. Premium is dynamically generated
4. User purchases policy
5. If disruption occurs → claim is triggered automatically

---

## 🏗️ Tech Stack

* **Frontend:** React.js
* **Language:** JavaScript
* **Styling:** CSS (Custom UI)
* **State Management:** React Hooks (`useState`)
* **Data Handling:** Mock Database (JSON-based)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/gigshield.git
cd gigshield
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the application

```bash
npm start
```

### 4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🔑 Demo Credentials

### 👤 Worker Login

```
Email: ravi@gmail.com  
Password: ravi123
```

### 👨‍💼 Admin Login

```
Email: admin@gigshield.in  
Password: admin123
```

---

## 📈 Future Enhancements

* Integration with real-time weather APIs (IMD)
* GPS-based live tracking
* Mobile application version
* Payment gateway integration
* Firebase / Backend authentication

---

## 🎓 Use Case

This project is ideal for:

* Academic projects
* Hackathons
* Insurance-tech innovation
* Gig economy solutions

---

## 📌 Conclusion

GigShield demonstrates how **technology + data + AI** can transform traditional insurance into a **smart, automated, and fair system** for gig workers.

---



This project is for educational purposes.
