import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { shallowEqual, useSelector, useDispatch, connect } from 'react-redux';
import { setWeather } from '../store/actions'
import { Weather, WeatherState } from '../store/types/weather.types';

interface Coordinates {
    lat: number
    lon: number
}

interface LocationStatus {
    status: 'ERROR' | 'SUCCESS' | 'FECHING' | 'DENIED'
}

const Main = () => {

    const [coordinates, setCoordinates] = useState<Coordinates>(null);
    const [locationStatus, setLocationStatus] = useState<LocationStatus>({ status: 'DENIED' });
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<String>('');

    const dispatch = useDispatch();

    const weather:Weather = useSelector(
        (state: WeatherState) => state.weather,
        shallowEqual // ?
    )

    const watchID = useRef(null);

    useEffect(() => {
        return () => {
            Geolocation.clearWatch(watchID.current);
          };
    }, [])

    const getCoordinates = () => {
        setLocationStatus({ status: 'FECHING' });
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('posi: ', position)
                setLocationStatus({ status: 'SUCCESS' })
                // setCoordinates({
                //     lat: position.coords.latitude,
                //     lon: position.coords.longitude
                // })
                dispatch(setWeather({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))
            },
            (err) => {
                setLocationStatus({ status: 'ERROR' });
                setError(err.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            
        );
    };

    const subscribeLocation = async () => {
        watchID.current = Geolocation.watchPosition(
            (position) => {   
              setLocationStatus({ status: 'SUCCESS' })
                // setCoordinates({
                //     lat: position.coords.latitude,
                //     lon: position.coords.longitude
                // })
            },
            (err) => {
                setLocationStatus({ status: 'ERROR' });
                setError(err.message);
            },
            {
              enableHighAccuracy: false,
            },
          );
    }

    const handlePermission = async () => {
        if (Platform.OS === 'ios') {
            getCoordinates();
            // subscribeLocation();
            // fetch
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location App Permission',
                        message: 'Enable location permission',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'Eneble',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCoordinates();
                    // subscribeLocation();
                } else {
                    setLocationStatus({ status: 'DENIED' });
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    useEffect(() => {
        console.log(locationStatus.status)
        console.log(coordinates)
        console.log('weather: ', weather)
    }, [locationStatus])
    
    return (
        <View>
            {
                <>
                <Text>
                    This app needs to access your location
                    </Text>
                <TouchableOpacity onPress={ handlePermission }>
                    <Text>
                        Enable location access
                    </Text>
                </TouchableOpacity>
                <Text>{error}</Text>
                </>

               
            }
        </View>
    )
}

export default connect()(Main);