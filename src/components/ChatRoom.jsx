import React from "react";
import { db } from "../../firebase.config";
import {
  query,
  orderBy,
  limit,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatRoom = () => {
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
};

function ChatMessage(props) {
  const { text, uid } = props.message;

  // const [user] = useAuthState(auth)

  const user = JSON.parse(localStorage.getItem("user"));
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={user.photoURL} alt="Photo here" />
      <p>{text}</p>;
    </div>
  );
}

export default ChatRoom;
