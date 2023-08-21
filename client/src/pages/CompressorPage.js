import React from "react";
import "../styles/ComDecomPage.css";
import Navbar from "../components/NavBar";
import ComDecomBanner from "../components/ComDecomBanner";
import Footer from "../components/Footer";

export default function CompressorPage() {
	return (
		<div className="body">
			<Navbar />
			<ComDecomBanner mode="Compress" />
			<Footer />
		</div>
	);
}