import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBKbByQAVc_0S-Jmp7_2uaqAKQ9VYeie34",
    authDomain: "ai-writing-108ca.firebaseapp.com",
    projectId: "ai-writing-108ca",
    storageBucket: "ai-writing-108ca.firebasestorage.app",
    messagingSenderId: "193908941635",
    appId: "1:193908941635:web:1ef1a6b57ae7d0d64e45f6",
    measurementId: "G-D23JRMYJW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics =
    typeof window !== "undefined"
        ? getAnalytics(app)
        : null;

// Export Auth
export const auth =
    getAuth(app);

// Export Google Provider
export const provider =
    new GoogleAuthProvider();

export default app;
