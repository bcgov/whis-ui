import React from "react";
import EventDetails from "./EventDetails";

const EventsContainer = ({expansionEvent, state, dispatch, resetState, saveState}) => {


	return (
		<>
			{state.events.map((event, i) => (
				<EventDetails
					key={`event-${i}`}
					expansionEvent={expansionEvent}
					event={event}
					state={state}
					dispatch={dispatch}
					index={i}
					resetState={resetState}
					saveState={saveState}
				/>
			))}
		</>
	);
}

export default EventsContainer;
