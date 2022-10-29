import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { GiftedChat , } from "react-gifted-chat";
import { useLocation, useParams } from "react-router-dom";
import { auth, db } from "../config/FirebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export default function Chat() {
  const [messages, setMessages] = useState();
  const username = useParams();
  const { state } = useLocation();

  console.log(state.chatId);

  useEffect(() => {
    const messageId = doc(db, "Chats/" + state.chatId);

    return onSnapshot(messageId, (snapshot) => {
      setMessages(snapshot.data()?.messages ?? []);
    });
  }, [state.chatId]);

  const onSend = (m = []) => {
    setDoc(
      doc(db, "Chats/" + state.chatId),
      {
        messages: GiftedChat.append(messages, m),
      },
      { merge: true }
    );
  };

  return (
    <>
      <NavBar />
      <div
        className="getOutNav"
        style={{
          background: "#eee",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GiftedChat
            
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: auth.currentUser.uid,
            name: state.me
          }}
        />
      </div>
    </>
  );
}
