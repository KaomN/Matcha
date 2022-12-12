import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./containers/Index";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import PasswordReset from "./containers/PasswordReset";
import Home from "./containers/Home";
import CompleteProfile from "./containers/CompleteProfile";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";
import Chat from "./containers/Chat";
import NotFound from "./containers/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";

export default function Links() {
	return (
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="forgotpassword" element={<ForgotPassword />} />
				<Route path="passwordreset" element={<PasswordReset />} />
				<Route element={<PrivateRoutes/>}>
					<Route path="home" element={<Home />} />
					<Route path="completeprofile" element={<CompleteProfile />} />
					<Route path="profile" element={<Profile />} >
						<Route path=":profileID" element={<Profile />} />
					</Route>
					<Route path="settings" element={<Settings />} />
					<Route path="chat" element={<Chat />} >
						<Route path=":chatID" element={<Chat />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
}