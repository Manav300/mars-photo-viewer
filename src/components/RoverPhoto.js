const RoverPhoto = ({ rover, url, date, photoData} ) => {
	
	if (Object.keys(photoData.photos).length < 1){
		return <h2>No photo available for {rover} on: {date}</h2>
	}
	return (
		<div className="rover-photo">
			<h2>{rover}</h2>
			<img className="image" src={photoData.photos[0].img_src} alt={photoData.id} />
			
		</div>
	);
};

export default RoverPhoto;
