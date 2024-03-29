import React from "react";
import EventDetails from "../detail/EventDetails";

const Event = ({ state, expansionEvent }) => {

	return (
		<>
			{state.events.map((event, i) => (
				<EventDetails
					expansionEvent={expansionEvent}
					key={`event-${event.id}`}
					state={state}
					index={i}
				/>
			))}
		</>
	);
}

export default Event;
