import React, { useEffect } from "react";
import { getWildlifeHealthId } from "../../../../state/utilities/wildlife_health_id_helper";
import { useSelector } from "../../../../state/utilities/use_selector";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { WILDLIFE_HEALTH_ID_LOAD_REQUEST } from "../../../../state/actions";
import Loading from "../../util/Loading";

const SampleDetailsPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: WILDLIFE_HEALTH_ID_LOAD_REQUEST,
            payload: {
                id
            }
        });

    }, [id]);

    const { loading, initialized, data: wildlifeHealthId } = useSelector(getWildlifeHealthId);

    if (!initialized || loading) {
        return (<Loading />);
    }

    return (
        <>
            <h2>Available data:</h2>
            <pre>{JSON.stringify(wildlifeHealthId, null, 1)}</pre>

            <h2>Example Usage</h2>
            {wildlifeHealthId.metadata?.creator?.name}<br/>
            {wildlifeHealthId.purpose?.requester?.firstName}
        </>
    );
}

export default SampleDetailsPage;