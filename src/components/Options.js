import Button from "./Button";

const Options = ({ onRoverClick, onDateClick, onCamClick, date }) => {
	return (
		<div className="menu">
			<h2>Select:</h2>
			<div className="rover-menu">
				<Button onClick={onRoverClick} id={1} text={"opportunity"} />
				<Button onClick={onRoverClick} id={2} text={"spirit"} />
				<Button onClick={onRoverClick} id={3} text={"curiosity"} />
			</div>
			<div className="date-menu">
				<Button onClick={onDateClick} text={"prev"} />
				<p className="date-text">{date}</p>
				<Button onClick={onDateClick} text={"next"} />
			</div>
			<div className="camera-menu">
				<Button onClick={onCamClick} text={"front hazard camera"} />
				<Button onClick={onCamClick} text={"rear hazard camera"} />
			</div>
		</div>
	);
};

export default Options;
