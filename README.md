# Booking App

This is the **Booking micro-frontend application** built with **Next.js**.  
It works as a remote app (exposed via Module Federation) and integrates with the **Host Container App**.  

---

## 🔗 Flow

- A user must **log in** through the **Auth App** before accessing the Booking screen.  
- Once logged in, the user can navigate to:  
http://localhost:3002/booking

- On the booking page:  
1. The user sees a **"Book Now"** button.  
2. When clicked, a **Booking Form** appears.  
3. The user fills in the details and submits the form.  
4. Currently, the booking form is a **static design only** (no backend integration yet).  

---

## 🚀 Features
- Protected route → only accessible after login  
- Booking page (`/booking`)  
- "Book Now" button to display booking form  
- Static booking form design (placeholder for future API integration)  
- Ready to be consumed by the **Host Container App**  

---

## 📦 Installation & Setup

### 1. Clone the Booking App
```bash
git clone https://github.com/sangeethaarasu01-bot/booking-app.git

cd booking-app

npm install

npm run dev