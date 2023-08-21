import React from "react";
import "../styles/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/SmallBytesLogo.SVG";

export default function NavBar() {
	const pathname = useLocation().pathname;

	return (
		<div className="nav-bar">
			<header className="text-gray-700 body-font">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
					<Link
						to="/"
						className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
					>
						<img
							src={logo}
							alt="Logo"
							height="60"
							width="60"
						></img>
						<span className="ml-5 text-xl">Small Bytes</span>
					</Link>
					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
						<Link to="/" className={`mr-5 ${pathname === '/small-bytes/home' ? "selected" : ""}`}>
							Home
						</Link>
						<Link to="/small-bytes/compressor" className={`mr-5 ${pathname.includes('/small-bytes/compressor') ? "selected" : ""}`}>
							Compressor
						</Link>
						<Link to="/small-bytes/decompressor" className={`mr-5 ${pathname.includes('/small-bytes/decompressor') ? "selected" : ""}`}>
							Decompressor
						</Link>
					</nav>
					<a
						href="https://github.com/TayyabAsghar/CS311S20PID48"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
							Source Code
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-4 h-4 ml-1"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</button>
					</a>
				</div>
			</header >
			<hr></hr>
		</div >
	);
}