# React Native Authentication App 📱

## 📌 Objective

Create a React Native app with **Login and Signup** functionality using **React Context API** to manage the authentication state.

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

### 📄 User Authentication 

<img width="1148" alt="Screenshot 2025-05-18 at 4 03 16 AM" src="https://github.com/user-attachments/assets/080327cf-2131-4ae9-b119-12166e78c3ed" />

### 📄 Firestore Users 

<img width="1152" alt="Screenshot 2025-05-18 at 4 03 39 AM" src="https://github.com/user-attachments/assets/61d29299-846f-4573-944b-824ca53870e6" />

---

## 🎥 Demo Video

[▶️ Watch Demo](https://github.com/user-attachments/assets/7d257d8d-4c19-433f-a695-0a4498611a84)


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
Mobile Application Developer 
[GitHub Profile](https://github.com/uzairiqbal91)
