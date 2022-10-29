import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import CenterPage from "../components/CenterPage";
import NavBar from "../components/NavBar";
import { auth, db, logOut } from "../config/FirebaseConfig";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { filteredItems } = useContext(UserContext);
  const [state, setState] = useState([]);
  const [page, setPage] = useState(true);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, "users", `${auth.currentUser?.uid}`, "friends"),
      (snapshot) => {
        setState(snapshot.docs);
      }
    );
  }, []);

  useEffect(() => {
    onSnapshot(
      collection(db, "users", `${auth.currentUser?.uid}`, "likedposts"),
      (snapshot) => {
        setLiked(snapshot.docs);
      }
    );
  }, []);

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
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 5,
                height: "100%",
                textAlign: "center"
              }}
            >
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                {" "}
                <p>User Name: </p>{" "}
                <p>
                   {filteredItems.map((x) => {
                    return x.data().username;
                  })}
                </p>
              </span>
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="info"
                  disabled={page}
                  onClick={() => setPage(true)}
                >
                  Show Friends
                </Button>{" "}
                <Button
                  variant="info"
                  disabled={!page}
                  onClick={() => setPage(false)}
                >
                  Show Liked Posts
                </Button>
                <Button variant="danger" onClick={logOut}>
                  Log Out
                </Button>{" "}
              </span>
            </div>

            {page ? (
              <div style={{ flexShrink: 1, height: "100%" }}>
                <h1>Friends List Test</h1>
                <ul>
                  {state.map((x) => {
                    return <li key={Math.random()}> {x.data().username} </li>;
                  })}
                </ul>
              </div>
            ) : (
              <div style={{ flexShrink: 1, height: "100%" }}>
                {liked.map((x) => {
                  return (
                    <div key={x.id} style={{ marginBottom: 30 }}>
                      <ListGroup>
                        <ListGroup.Item active>
                          {x.data().post.name} - {x.data().post.showDate}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <h4>{x.data().post.tittle}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {x.data().post.mainText}
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CenterPage>
      </div>
    </>
  );
}
