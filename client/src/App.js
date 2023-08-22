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
				<Route exact path="/small-bytes/home" element={<MainPage />} />
				<Route path="/" element={<Navigate to="/small-bytes/home" />} />
				<Route path="/small-bytes/" element={<Navigate to="/small-bytes/home" />} />
				<Route exact path="/small-bytes/compressor" element={<CompressorPage />} />
				<Route exact path="/small-bytes/decompressor" element={<DecompressorPage />} />
				<Route exact path="/404" element={<InvalidLink />} />
			</Routes>
		</BrowserRouter>
	);
}