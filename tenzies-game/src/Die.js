import React from 'react';

export default function Die({ value, isHeld, handleClick }) {
	const styles = {
		backgroundColor: isHeld ? '#59E391' : 'white',
	};
	return (
		<div className="die-face" onClick={handleClick} style={styles}>
			<h2 className="die-num">{value}</h2>
		</div>
	);
}
