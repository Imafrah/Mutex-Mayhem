// ─── FIREBASE CONFIG (shared across all pages) ─────────────────
// Using Firebase compat SDK via CDN for standalone HTML pages

const firebaseConfig = {
  apiKey: "AIzaSyC1hFMNYd5vBw7wYAKY-VNaV70Y_vphDSs",
  authDomain: "hackthon-cse2.firebaseapp.com",
  projectId: "hackthon-cse2",
  storageBucket: "hackthon-cse2.firebasestorage.app",
  messagingSenderId: "772346846265",
  appId: "1:772346846265:web:d6805a346cb65b3b7001e8",
  measurementId: "G-FKWXXZ8RTJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Exports
const db = firebase.firestore();
const auth = firebase.auth();
