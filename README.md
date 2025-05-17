# React Native Authentication App 📱

## 📌 Assignment Objective

Create a React Native app with **Login and Signup** functionality using **React Context API** to manage the authentication state. This assignment will test your understanding of:

- 🔐 Authentication flows
- 🧠 State management using Context API
- ✍️ Form handling and validation
- 🧭 Navigation using React Navigation

---

# UserAuthApp 🔐

**UserAuthApp** is a simple and clean mobile authentication app built with **React Native** and **Firebase**. It supports secure user sign-up, login, and profile storage using Firebase Authentication and Firestore.

---

## ✨ Features

- User Registration (Sign Up)
- Email and Password Login
- User profile stored in Firestore
- Session persistence using AsyncStorage
- Logout and session cleanup
- Clean UI and responsive design

---

## 🧪 Tech Stack

- React Native (CLI)
- Firebase Authentication
- Firebase Firestore
- AsyncStorage
- React Navigation

---

## 📸 Screenshots

### 🔐 Signup Screen
![Signup Screen](./assets/screenshots/Screenshot%202025-05-18%20at%203.50.37%20AM.png)

### 📄 Firestore User Document
![Firestore Data](./assets/screenshots/Screenshot%202025-05-18%20at%203.51.23%20AM.png)

---

## 🎥 Demo Video

[▶️ Watch Demo](./assets/demo/Screen%20Recording%202025-05-18%20at%203.49.18%20AM.mov)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/uzairiqbal91/UserAuthApp.git
cd UserAuthApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Configuration

- Add your `google-services.json` file inside `android/app/`  
- Firestore rules (development only):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. iOS Setup (if using Mac)

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### 5. Run on Android

```bash
npx react-native run-android
```

---

## 🙌 Author

**Uzair Iqbal**  
React Native Developer  
[GitHub Profile](https://github.com/uzairiqbal91)
