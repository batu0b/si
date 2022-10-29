import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import Chat from "../pages/Chat";
import ChatList from "../pages/ChatList";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import RandomPage from "../pages/Random";
import SearchPage from "../pages/SearchPage";
import SharePost from "../pages/SharePost";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/signUp";

export default function RouterPage() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/Home*" element={<Home />} />
          <Route path="/Profile*" element={<Profile />} />
          <Route path="arama/:searchName" element={<SearchPage />} />
          <Route path="/share-post*" element={<SharePost />} />
          <Route path="/random*" element={<RandomPage />} />
          <Route path="/Chat-List*" element={<ChatList />}/>
          <Route path="/Chat-List/Chat/:username" element={<Chat />} />
       
        </Route>

        <Route path="/" element={<Navigate replace to="/Home" />} />

        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}
