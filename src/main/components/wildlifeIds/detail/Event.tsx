import React from "react";
import '../../../styles/updateID.scss';
import EventDetails from "../detail/EventDetails";

const Event = ({ state }) => {

	return (
		<>
			{state.events.map((event, i) => (
				<EventDetails
					key={`event-${i}`}
					state={state}
					index={i}
				/>
			))}
		</>
	);
}

export default Event;
