import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CenterPage from "../components/CenterPage";
import NavBar from "../components/NavBar";
import { auth, db } from "../config/FirebaseConfig";
import { UserContext } from "../context/UserContext";

export default function SharePost() {
  const [topic, setTopic] = useState("");
  const [mainText, setMainText] = useState("");
  const { filteredItems } = useContext(UserContext);

  const y = filteredItems.map((x) => {
    return x.data().username;
  });

  const CreatePost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        tittle: topic,
        mainText: mainText,
        name: y[0],
        showDate: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(),
        createdAt: serverTimestamp(),
        whoShare: auth.currentUser?.uid,
        totlike: 0,
        totdislike: 0,
      });
    } catch (err) {
      console.log(err);
    }
    setTopic("");
    setMainText("");
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CenterPage>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontFamily: "monospace" }}>SHARE ARTICLE</h1>
            <Form onSubmit={(e) => CreatePost(e)} style={{ width: "80%" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>TOPIC</Form.Label>
                <Form.Control
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  type="text"
                  placeholder="..."
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>MAIN TEXT</Form.Label>
                <Form.Control
                  value={mainText}
                  placeholder="..."
                  required
                  as="textarea"
                  rows={10}
                  onChange={(e) => setMainText(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="success">
                POST
              </Button>
            </Form>
          </div>
        </CenterPage>
      </div>
    </>
  );
}
