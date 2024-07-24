import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  query,
  orderBy,
  limit,
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import photoUrl from "./assets/landingImg.svg";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDU5yMANIAFoQQgA85LhWk1_WDWiw0Rd0U",
  authDomain: "reconnect-8aca6.firebaseapp.com",
  projectId: "reconnect-8aca6",
  storageBucket: "reconnect-8aca6.appspot.com",
  messagingSenderId: "1053270580895",
  appId: "1:1053270580895:web:cc9673341212730fdcccaa",
  measurementId: "G-PDLS1THD3L",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      // Store user in local storage
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove user from local storage
      localStorage.removeItem("user");
    }
  }, [user]);
  console.log(user);

  return (
    <>
      <div>
        {/* <LandingPage /> */}
        {/* <Register /> */}

        <ChatRoom></ChatRoom>

        <div>
          {!user && <SignIn />}
          {user && <SignOut />}
        </div>
      </div>
    </>
  );
}

function ChatRoom() {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      text: formValue,
      createdAt: serverTimestamp(),
    };
    await addDoc(messagesRef, newMessage);

    setFormValue("");
  };

  return (
    <div>
      <div>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const user = JSON.parse(localStorage.getItem("user"));
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={user.photoURL} alt="Photo here" />
      <p>{text}</p>;
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the result (e.g., access token, user info)
      console.log(result);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
