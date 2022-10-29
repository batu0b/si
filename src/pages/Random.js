import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CenterPage from "../components/CenterPage";
import NavBar from "../components/NavBar";
import { auth, db } from "../config/FirebaseConfig";
import { RandomContext } from "../context/RandomFriend";
import { UserContext } from "../context/UserContext";

export default function RandomPage() {
  const [myName, setMyName] = useState("");

  const { filteredItems } = useContext(UserContext);
  const { randomFriends, FilterRandom, show } = useContext(RandomContext);
  useEffect(() => {
    filteredItems.map((x) => {
      return setMyName(x.data().username);
    });
  }, []);

  const addFriend = async (id, name) => {
    try {
      await setDoc(
        doc(db, "users", `${auth.currentUser?.uid}`, "friends", `${id}`),
        {
          username: name,
          userId: id,
        }
      );

      await setDoc(
        doc(db, "users", `${id}`, "friends", `${auth.currentUser?.uid}`),
        {
          username: myName,
          userId: auth.currentUser.uid,
        }
      );
    } catch (err) {
      console.log(err);
    }
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
              height: "100%",
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
              alignItems: "",
              flexDirection: "column",
            }}
          >
            <div
              className="border_bottom"
              style={{
                padding: 20,
                margin: 17,
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {show ? (
                <>
                  <span>{randomFriends?.username}</span>
                  <Button
                    onClick={() =>
                      addFriend(randomFriends?.userId, randomFriends?.username)
                    }
                  >
                    Add Friend{" "}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CenterPage>
      </div>
    </>
  );
}
