import React, { useState } from "react";
import '../../../styles/updateID.scss';
import EventDetails from "../detail/EventDetails";

const Event = ({ expansionEvent, state, dispatch }) => {

	const [EventDetailsExpand, setEventDetailsExpand] = useState(false);

	return (
		<>
			{state.events.map((event: any, i: any) => (
				<EventDetails
					key={`event-${i}`}
					expansionEvent={expansionEvent}
					event={event}
					state={state}
					dispatch={dispatch}
					index={i}
				/>
			))}
		</>
	);
}

export default Event;
