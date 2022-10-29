import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  documentId,
  FieldValue,
  increment,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import CenterPage from "../components/CenterPage";
import NavBar from "../components/NavBar";
import { auth, db } from "../config/FirebaseConfig";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useIsLike } from "../hooks/hooks";
export default function Home() {
  const [state, setState] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setState(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    onSnapshot(
      collection(db, "users", `${auth.currentUser?.uid}`, "friends"),
      (snapshot) => {
        setFriends(snapshot.docs);
      }
    );
  }, []);

  const friendNames = friends.map((x) => {
    return x.data().username;
  });

  const FilterHomeContent = state.filter((x) => {
    return friendNames.includes(x.data().name);
  });

  const LIKE = async (id) => {
    const docRef = doc(
      db,
      "posts",
      `${id}`,
      "Likes",
      `${auth.currentUser?.uid}`
    );
    const docSnap = await getDoc(docRef);

    const docLikedPosts = doc(db, "posts", `${id}`);

    const docLikedPostsSnap = await getDoc(docLikedPosts);

    try {
      if (!docSnap.exists()) {
        await setDoc(
          doc(db, "posts", `${id}`, "Likes", `${auth.currentUser?.uid}`),
          {
            value: true,
          }
        );
        await setDoc(
          doc(db, "posts", `${id}`),
          {
            totlike: increment(1),
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "users", `${auth.currentUser?.uid}`, "likedposts", `${id}`),
          {
            postId: id,
            post: {
              ...docLikedPostsSnap.data(),
            },
          }
        );
      } else if (!docSnap.data().value) {
        await setDoc(
          doc(db, "posts", `${id}`),
          {
            totlike: increment(1),
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "posts", `${id}`, "Likes", `${auth.currentUser?.uid}`),
          {
            value: true,
          }
        );

        await setDoc(
          doc(db, "users", `${auth.currentUser?.uid}`, "likedposts", `${id}`),
          {
            postId: id,
            post: {
              ...docLikedPostsSnap.data(),
            },
          }
        );
      } else if (docSnap.data().value) {
      }
    } catch (err) {
      console.log(err);
    }
    if (!docSnap.data().value) {
      setDoc(
        doc(db, "posts", `${id}`),
        {
          totdislike: increment(-1),
        },
        { merge: true }
      );
    }
  };

  const DISLIKE = async (id) => {
    const docRef = doc(
      db,
      "posts",
      `${id}`,
      "Likes",
      `${auth.currentUser?.uid}`
    );
    const docSnap = await getDoc(docRef);

    try {
      if (!docSnap.exists()) {
        await setDoc(
          doc(db, "posts", `${id}`, "Likes", `${auth.currentUser?.uid}`),
          {
            value: false,
          }
        );
        await setDoc(
          doc(db, "posts", `${id}`),
          {
            totdislike: increment(1),
          },
          { merge: true }
        );
      } else if (docSnap.data().value) {
        await setDoc(
          doc(db, "posts", `${id}`),
          {
            totdislike: increment(1),
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "posts", `${id}`, "Likes", `${auth.currentUser?.uid}`),
          {
            value: false,
          }
        );
        deleteDoc(doc(db, "users", `${auth.currentUser?.uid}`, "likedposts", `${id}`));
        
      } else if (!docSnap.data().value) {
      }
    } catch (err) {
      console.log(err);
    }
    if (docSnap.data().value) {
      setDoc(
        doc(db, "posts", `${id}`),
        {
          totlike: increment(-1),
        },
        { merge: true }
      );
    }
  };

  const WaitDislike = async (id) => {
    await DISLIKE(id);

    document.getElementsByClassName(`${id}`).disabled = true;

    setTimeout(() => {
      document.getElementsByClassName(`${id}`).disabled = false;
    }, 1200);
  };

  const WaitLike = async (id) => {
    await LIKE(id);

    document.getElementsByClassName(`${id}`).disabled = true;

    setTimeout(() => {
      document.getElementsByClassName(`${id}`).disabled = false;
    }, 1200);
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
          {FilterHomeContent.map((x) => {
            return (
              <div key={x.id} style={{ marginBottom: 30 }}>
                <ListGroup style={{borderRadius: 0}} >
                  <ListGroup.Item active>
                    {x.data().name} - {x.data().showDate}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    <h4>{x.data().tittle}</h4>
                  </ListGroup.Item  >
                  <ListGroup.Item  variant="dark">{x.data().mainText}</ListGroup.Item>
                  <ListGroup.Item variant="dark" >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <Button
                          variant="light"
                          className={x.id}
                          onClick={() => WaitLike(x.id)}
                        >
                          <AiFillCaretUp color="green" size={17} />(
                          {x.data().totlike})
                        </Button>
                      </span>
                      <span>
                        <Button
                          variant="light"
                          className={x.id}
                          onClick={() => WaitDislike(x.id)}
                        >
                          <AiFillCaretDown color="red" size={17} />(
                          {x.data().totdislike})
                        </Button>{" "}
                      </span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            );
          })}
        </CenterPage>
      </div>
    </>
  );
}
