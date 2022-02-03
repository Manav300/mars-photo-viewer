import { useState, useEffect } from "react";
import Header from "./components/Header";
import RoverPhoto from "./components/RoverPhoto";
import Options from "./components/Options";
import Footer from "./components/Footer";

const apiKey = process.env.REACT_APP_KEY;

function App() {
	const [rover, setRover] = useState("curiosity");
	const [date, setDate] = useState("2020-6-3");
	const [camera, setCamera] = useState("fhaz");

	const [photoData, setPhotoData] = useState(null);

	const [url, setUrl] = useState(
		`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`
	);

	useEffect(() => {
		setUrl(
			`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`
		);
		fetchPhoto();
		async function fetchPhoto() {
			//fetch photo from api
			try {
				const res = await fetch(url);
				const data = await res.json();
				//set timeout to re render with new photo data
				setTimeout(() => {
					setPhotoData(data);
				}, 500);
			} catch (err) {
				console.error(err);
			}
		}
	}, [rover, date, camera, url]);

	//change rover
	const changeRover = (text) => {
		setRover(text);
	};

	//change date
	const changeDate = (text) => {
		//parse the date in text and set the new date
		var year = parseInt(date.substring(0, 4));
		var month;
		// split by '-' character
		date.charAt(6) === "-"
			? (month = parseInt(date.charAt(5)))
			: (month = parseInt(date.substring(5, 7)));
		var day;
		date.charAt(date.length - 1) === "-"
			? (day = parseInt(date.charAt(7)))
			: (day = parseInt(date.substring(7, 9)));

		//increment date correctly
		if (month > 12) {
			month = 1;
			year += 1;
		}
		var currDay = new Date(year, month, day);
		var newDay = new Date(currDay);

		if (text === "next") {
			newDay.setDate(currDay.getDate() + 1);
		} else {
			newDay.setDate(currDay.getDate() - 1);
		}
		year = newDay.getFullYear();
		month = newDay.getMonth();
		day = newDay.getDate();
		setDate(year + "-" + month + "-" + day);
	};

	//change camera
	const changeCamera = (text) => {
		text === "front hazard camera" ? setCamera("rhaz") : setCamera("fhaz");
	};

	if (!photoData) return <div>error</div>;
	return (
		<div className="container">
			<Header />
			<Options
				onRoverClick={changeRover}
				onDateClick={changeDate}
				onCamClick={changeCamera}
				date={date}
			/>
			<RoverPhoto url={url} rover={rover} date={date} photoData={photoData} />
			<Footer />
		</div>
	);
}

export default App;
