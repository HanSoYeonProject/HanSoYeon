import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

function GoogleMapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "${MAP_API_KEY}" // Replace with your API key
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            function(error) {
                console.error("Error getting location", error);
            },
            {
                enableHighAccuracy: true
            }
        );
    }, []);
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || { lat: 37.5760222, lng: 126.9769000 }}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
    ) : <></>;
}


const MainPage = () => {
    return (
        <div>
            <GoogleMapComponent />
        </div>
    );
};

export default MainPage;
