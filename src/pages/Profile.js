import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup, Table } from "react-bootstrap";
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

  const Delete = async (id) => {
    try {
      await deleteDoc(
        doc(db, "users", `${auth.currentUser?.uid}`, "friends", `${id}`)
      );

      await deleteDoc(
        doc(db, "users", `${id}`, "friends", `${auth.currentUser?.uid}`)
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
              className="bg-dark text-light"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,

                height: "100%",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    fontFamily: "monospace",
                  }}
                >
                  <h3>User Name:&nbsp;</h3>{" "}
                  <h3>
                    {filteredItems.map((x) => {
                      return x.data().username;
                    })}
                  </h3>
                </p>
                <Button variant="danger" onClick={logOut}>
                  Log Out
                </Button>{" "}
              </span>
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="outline-primary"
                  disabled={page}
                  onClick={() => setPage(true)}
                >
                  Show Friends
                </Button>{" "}
                <Button
                  variant="outline-primary"
                  disabled={!page}
                  onClick={() => setPage(false)}
                >
                  Show Liked Posts
                </Button>
              </span>
            </div>

            {page ? (
              <div
                style={{
                  flexShrink: 1,
                  height: "100%",
                  fontFamily: "monospace",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    width: "100%",
                    borderBottom: "dotted",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  Friend List
                </h1>

                <Table striped bordered hover style={{ overflow: "scroll" }}>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((x) => {
                      return (
                        <tr style={{ width: "100%" }} key={Math.random()}>
                          {" "}
                          <td style={{ width: "80%" }}>
                            {" "}
                            {x.data().username}{" "}
                          </td>
                          <td style={{ width: "20%" }}>
                            {" "}
                            <Button
                              onClick={() => Delete(x.id)}
                              variant="danger"
                            >
                              Delete Friend
                            </Button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <ul></ul>
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
