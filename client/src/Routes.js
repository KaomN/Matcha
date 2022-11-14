import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./containers/Index";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import PasswordReset from "./containers/PasswordReset";
import NotFound from "./containers/NotFound";

export default function Links() {
	return (
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/login" element={<Login />} />
			<Route path="/verification/*" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/forgotpassword" element={<ForgotPassword />} />
			<Route path="/passwordreset" element={<PasswordReset />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}