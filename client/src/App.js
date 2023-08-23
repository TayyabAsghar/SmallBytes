import React from "react";
import MainPage from "./pages/MainPage";
import InvalidLink from "./pages/InvalidLink";
import CompressorPage from "./pages/CompressorPage";
import DecompressorPage from "./pages/DecompressorPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/home" element={<MainPage />} />
				<Route path="/" element={<Navigate to="/home" />} />
				<Route exact path="/compressor" element={<CompressorPage />} />
				<Route exact path="/decompressor" element={<DecompressorPage />} />
				<Route exact path="/404" element={<InvalidLink />} />
			</Routes>
		</BrowserRouter>
	);
}