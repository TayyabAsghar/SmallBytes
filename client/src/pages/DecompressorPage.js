import React from "react";
import "../styles/ComDecomPage.css";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ComDecomBanner from "../components/ComDecomBanner";

export default function DecompressorPage() {
	return (
		<div className="body">
			<Navbar />
			<ComDecomBanner mode="Decompress" />
			<Footer />
		</div>
	);
}