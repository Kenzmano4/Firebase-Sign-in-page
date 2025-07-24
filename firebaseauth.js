// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"
  import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


  const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

export default firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);

  if (!messageDiv) {
    console.warn(`Element with ID "${divId}" not found.`);
    return; // Exit the function if the element doesn't exist
  }

  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;

  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}


  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef , userData)
      .then(()=> {
        window.location.href='index.html';
      })
      .catch((error)=>{
        console.error("error writing document", error);
      })
    })
    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
        showMessage('Email Address Already Exists !!!', 'signUpMessage');

      }
      else{
          showMessage('Unable to create User', 'signUpMessage');
        }


    })
  });
  
  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
      showMessage('login is successful', 'signInmessage');
      const user=userCredential.user;
      localStorage.setItem('loggedInuserId',user.uid);
      window.location.href='homepage.html';
    })

    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', 'signInMessage');
      }

      else{
        showMessage('Account does not Exist','signInMessage' );
      }
    })
    

  })