import React from "react";
import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
    return (
        <LoadScript id="script-loader" googleMapsApiKey="AIzaSyCwjknNCBWmL35vQ1eEtZsoRcUfYZldH_k">
            <GoogleMap id="example-map" center={props.center} />
        </LoadScript>
    );
}