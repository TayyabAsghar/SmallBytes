import axios from "axios";
import "../styles/ChooseFile.css";
import React, { useState, useRef } from "react";
import fileDownload from "js-file-download";
import plusFile from "../images/plusFile.png";
import txtImgIcon from "../images/txtImgIcon.png";
import UploadedFile from "../images/UploadedFile.svg";
import { ReactComponent as Loader } from '../images/Loader.svg';


export default function ChooseFile(props) {
	const API = 'https://small-bytes-server.vercel.app/';
	const supportedFiles = ['txt', 'tiff', 'gif'];
	const headers = {
		'Content-Type': 'multipart/form-data',
		'Origin': 'http://localhost:3000/'
	};
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);
	const submitButtonRef = useRef(null);
	const selectionButtonRef = useRef(null);

	let fileParts = null;
	let fileName, fileExtension;

	if (selectedFile !== null) {
		fileName = selectedFile.name;
	}

	let fileSelectedHandler = (event) => {
		selectionButtonRef.current.blur();
		fileParts = event.target.files[0].name.split(".");
		fileExtension = fileParts[1]?.toLowerCase();

		if (props.mode === "Decompress" && fileParts[2] !== 'lzw') {
			alert("Please select a compressed file with extension '.lzw'");
			return;
		}

		if (!supportedFiles.includes(fileExtension)) {
			alert("Please select a supported format.");
			return;
		}

		setSelectedFile(event.target.files[0]);
	};

	const fileSelectionClick = () => {
		if (fileInputRef.current)
			fileInputRef.current.click();
	};

	let fileUploadHandler = (event) => {
		event.preventDefault();
		setIsButtonDisabled(true);
		submitButtonRef.current.blur();
		let url = "";
		let downloadFileName = null;
		const data = new FormData();
		data.append("file", selectedFile);

		if (props.mode === "Compress") {
			url = `${API}/compress`;
			downloadFileName = fileName + '.lzw';
		} else if (props.mode === "Decompress") {
			url = `${API}/decompress`;
			downloadFileName = `${fileParts[0].fileParts[1]}`;
		}

		axios.post(url, data, { headers })
			.then(res => {
				fileDownload(res.data, downloadFileName);
				setSelectedFile(null);
				setIsButtonDisabled(false);
			})
			.catch(err => {
				setIsButtonDisabled(false);
				console.log(err);
			});
	};

	return (
		<div className="choose-file">
			<form onSubmit={fileUploadHandler}>
				<div
					className={`p-4 wrapper my-5 w-11/12 m-auto ${selectedFile === null ? "" : "display-none"}`}
				>
					<div className="flow-root h-full border-dashed border-2 border-gray-800 border-opacity-25 container px-8 pt-4 pb-16 relative flex flex-wrap">
						<img
							alt="txtImgIcon"
							src={txtImgIcon}
							className="h-20 block mx-auto my-5"
						></img>
						<input
							style={{ display: "none" }}
							type="file"
							onChange={fileSelectedHandler}
							ref={fileInputRef}
						/>
						<button
							type="button"
							className="block rounded choose-file-button m-auto bg-white text-black border-0 px-6 py-4 text-center inline-block font-bold flex items-center"
							onClick={fileSelectionClick}
							ref={selectionButtonRef}
						>
							<img
								alt="fileAdditionIcon"
								src={plusFile}
								className="h-6 w-auto mx-3"
							></img>
							<span className="button-text uppercase tracking-wider">
								Choose File
							</span>
						</button>
					</div>
				</div>
				<div
					className={`p-4 bg-gray-100 my-5 w-11/12 m-auto border-solid border border-gray-900 border-opacity-50 rounded-md flex flex-col justify-center content-center flex-wrap gap-y-6 ${selectedFile === null ? "display-none" : ""}`}
				>
					<div className="flex flex-col justify-center content-center flex-wrap gap-y-2">
						<div className="uploaded-file">
							<img src={UploadedFile} alt="Uploaded File Icon"></img>
						</div>
						<div className="file-name flex justify-center">
							<p>{fileName}</p>
						</div>
					</div>
					<div>
						<button
							id="submitButton"
							type="submit"
							ref={submitButtonRef}
							disabled={isButtonDisabled}
							className="block rounded m-auto text-white border-0 px-6 py-4 uppercase font-bold border-none inline-flex justify-center"
						>
							{isButtonDisabled ? <Loader className="spinner"></Loader> : props.mode}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}