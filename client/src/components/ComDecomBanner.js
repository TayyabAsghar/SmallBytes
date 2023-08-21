import React from "react";
import HowTo from "./howTo";
import Services from "./Services";
import ChooseFile from "./ChooseFile";

export default function ComDecomBanner(props) {
	return (
		<div>
			<div className="tracking-wide mb-10">
				<div
					style={{ color: "#ee3233" }}
					className="text-center uppercase mt-10 text-3xl font-bold tracking-widest"
				>
					{props.mode} your files
				</div>
				<h2 className="text-2xl uppercase text-center font-medium mb-2 mt-4">
					Supported File Format
				</h2>
				<div className="flex justify-center text-xl text-gray-600">
					<div className="formats mx-1">
						TXT
					</div>
					<div className="border-l-2 border-gray-700 mx-2 "></div>
					<div className="formats mx-1">
						TIFF
					</div>
					<div className="border-l-2 border-gray-700 mx-2 "></div>
					<div className="formats mx-1">
						GIF
					</div>
				</div>
			</div>
			<ChooseFile mode={props.mode} />
			<Services />
			<hr></hr>
			<HowTo mode={props.mode} />
			<hr></hr>
		</div>
	);
}