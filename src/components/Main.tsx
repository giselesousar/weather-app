import React, { useState, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { shallowEqual, useSelector, useDispatch, connect } from 'react-redux';
import { setWeather } from '../store/actions'
import { RootState } from '../store/reducers/index'
import styled from 'styled-components';
import WeatherScreen from './Weather';
import { 
    Text, 
    TouchableOpacity, 
    View, 
    Platform, 
    PermissionsAndroid 
} from 'react-native';

const ViewContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const TextStyled = styled(Text)`
    font-size: 20px;
`

const Button = styled(TouchableOpacity)`
    
`

const Main = () => {

    const [error, setError] = useState<String>('');

    const dispatch = useDispatch();

    const weather:RootState = useSelector(
        (state: RootState) => state,
        shallowEqual // ?
    )

    const watchID = useRef(null);

    useEffect(() => {
        handlePermission();
        return () => {
            Geolocation.clearWatch(watchID.current);
          };
    }, [])

    const getCoordinates = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch(setWeather({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))
            },
            (err) => {
                setError(err.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            
        );
    };

    const subscribeLocation = async () => {
        watchID.current = Geolocation.watchPosition(
            (position) => {   
                dispatch(setWeather({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))
            },
            (err) => {
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
            subscribeLocation();
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
                    // access denied
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    useEffect(() => {
        console.log('weather: ', weather.weather)
    }, [weather])
    
    return (
        <ViewContainer>
            {
                weather.weather.loading ?
                <TextStyled>Carregando...</TextStyled>
                :
                weather.weather.error ?
                <ViewContainer>
                    <TextStyled>{error}</TextStyled>
                    <Button onPress={ getCoordinates }>
                        <TextStyled>
                            Try again
                        </TextStyled>
                    </Button>
                </ViewContainer>
                :
                <WeatherScreen weather={weather.weather.weather} />
            }
        </ViewContainer>
    )
}

export default connect()(Main);