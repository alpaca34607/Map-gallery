// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 匯入firebase
import{getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJpVoNmPTlHhwbGV01LK3k27--Km6dEVA",
  authDomain: "mystic-markers.firebaseapp.com",
  projectId: "mystic-markers",
  storageBucket: "mystic-markers.firebasestorage.app",
  messagingSenderId: "705157300195",
  appId: "1:705157300195:web:438c37496f807d26b3ead6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provide = new GoogleAuthProvider();

// 匯出
export { auth, provide };