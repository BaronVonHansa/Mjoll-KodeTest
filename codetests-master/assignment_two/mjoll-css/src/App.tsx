import React, { useState } from "react";
import "./Styles.css"; // Import the CSS file

interface Option {
	label: string;
	description: string;
	enabled: boolean;
}

const App: React.FC = () => {
	const [options, setOptions] = useState<Option[]>([
		{
			label: "Remove background for uploaded person images",
			description: "Automatically remove the background for images that are uploaded to a specific person. This could increase the quality of the detected hits.",
			enabled: false,
		},
		{
			label: "Enable person functionality",
			description: "Enables face detection, person search & other related functionality.",
			enabled: false,
		},
		{
			label: "Enable audio functionality",
			description: "Enable audio upload & other related functionality.",
			enabled: false,
		},
		{
			label: "Enable file functionality",
			description: "Enable file upload & other related functionality.",
			enabled: false,
		},
		{
			label: "Enable label functionality",
			description: "Enable label detection & other related functionality.",
			enabled: false,
		},
		{
			label: "Enable tag functionality",
			description: "Enable automatic tagging of IPTC tags when ingesting video & images",
			enabled: false,
		},
	]);

	const toggleOption = (index: number) => {
		setOptions((prevOptions) => {
			const updatedOptions = [...prevOptions];
			updatedOptions[index] = {
				...updatedOptions[index],
				enabled: !updatedOptions[index].enabled,
			};
			return updatedOptions;
		});
	};

	return (
		<div style={{ backgroundColor: "rgba(18,23,34,255)", padding: 20 }}>
			{options.map((option, index) => (
				<div
					key={index}
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: 10,
						backgroundColor: option.enabled
							? "rgba(0, 0, 0, 0.5)"
							: "rgba(64, 64, 64, 0.5)",
						padding: 10,
						borderRadius: 5,
						color: "white",
						cursor: "pointer",
					}}
					onClick={() => toggleOption(index)}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							"rgba(0, 0, 0, 0.7)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = option.enabled
							? "rgba(0, 0, 0, 0.5)"
							: "rgba(64, 64, 64, 0.5)";
					}}
				>
					<span style={{ flex: 1 }}>
						{option.label}
						<br />
						<span style={{ marginLeft: 20, fontSize: 12 }}>
							{option.description}
						</span>
					</span>
					<label className="switch">
						<input
							type="checkbox"
							checked={option.enabled}
							onChange={() => toggleOption(index)}
						/>
						<span className="slider round" />
					</label>
				</div>
			))}
		</div>
	);
};

export default App;
