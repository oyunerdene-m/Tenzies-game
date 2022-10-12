import React from 'react';

export default function Die({ value, handleClick }) {
	return (
		<div className="die-face" onClick={handleClick}>
			<h2 className="die-num">{value}</h2>
		</div>
	);
}
