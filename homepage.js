import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"
import { getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCXVjAYiRhVD4y9VXMM4GYW4KdibSPMF04",
    authDomain: "login-form-82f3e.firebaseapp.com",
    projectId: "login-form-82f3e",
    storageBucket: "login-form-82f3e.firebasestorage.app",
    messagingSenderId: "36213474692",
    appId: "1:36213474692:web:647189de752dabe13049d1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

// Track user session
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid; // ✅ Use Firebase Auth's user ID directly

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        const firstNameEl = document.getElementById("loggedUserFName");
        const emailEl = document.getElementById("loggedUserEmail");
        const lastNameEl = document.getElementById("loggedUserLName");

        if (firstNameEl) firstNameEl.innerText = userData.firstName;
        if (emailEl) emailEl.innerText = userData.email;
        if (lastNameEl) lastNameEl.innerText = userData.lastName;
      } else {
        console.log("No document found for this user.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }

  } else {
    console.log("No user is currently signed in.");
    // Optionally redirect to login page
    // window.location.href = "login.html";
  }
});

// Logout logic
const logoutButton = document.getElementById("logout");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
}
