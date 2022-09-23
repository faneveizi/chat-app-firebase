import { useState, useRef, useEffect } from "react";
import { db, auth, firebaseRef } from "../config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MessageCard from "./MessageCard";
const ChatRoom = ({ currentRoom }) => {
  const customRef = useRef();
  const messagesRef = db.collection("messages");
  /*const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').where("room", "==", currentRoom).orderBy('createdAt').limit(20).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    },)*/
    const query = messagesRef
    .where("room", "==", currentRoom)
    .orderBy("createdAt");
    const [messages] = useCollectionData(query, { idField: "id" });

  const [message, setMessage] = useState("");

  //.where("room", "==", currentRoom)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messagesRef.add({
      uid,
      photoURL,
      createdAt,
      text: message,
      room: currentRoom,
      userName: displayName,
    });
    setMessage("");
    customRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleDelete = (createdAt, id) => {
    db.collection("messages").doc(id).delete();
  };
  return (
    <>
      <div className="messages">
        {messages &&
          messages.map((message) => (
            <MessageCard
              message={message}
              key={message.id}
              handleDelete={handleDelete}
            />
          ))}
        <span ref={customRef}></span>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit" disabled={!message}>
          Send
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
