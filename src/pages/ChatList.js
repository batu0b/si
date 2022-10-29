import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { RandomContext } from "../context/RandomFriend";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { UserContext } from "../context/UserContext";

export default function ChatList() {
  const { friends } = useContext(RandomContext);
  const { filteredItems } = useContext(UserContext);

  const navigation = useNavigate();

  const me = filteredItems.map((x) => {
    return x.data().username;
  });

  console.log(me.toString());
  const navigateChat = async (id, user) => {
    const docRef = doc(db, "Chats", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      navigation(`Chat/${user}`, { state: { chatId: id, me: me } });
    } else {
      try {
        await setDoc(doc(db, "Chats", `${id}`), {
          users: [user, me.toString()],
        });
        navigation(`Chat/${user}`, { state: { chatId: id, me: me } });
      } catch (err) {
        console.log(err);
      }
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
          justifyContent: "center",
        }}
      >
        <List
          sx={{ width: "70%", bgcolor: "background.paper", marginTop: "10px" }}
        >
          {friends.map((x) => (
            <ListItem key={x.id} disableGutters>
              <ListItemButton
                onClick={() => navigateChat(x.id, x.data().username)}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText id={x.id} primary={` ${x.data().username}`} />
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
