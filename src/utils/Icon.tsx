import React from 'react';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

interface Props {
    name: string
}

const { width } = Dimensions.get('window');

const names = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-sun",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "cloud-showers-heavy",
    "09n": "cloud-showers-heavy",
    "10d": "cloud-sun-rain",
    "10n": "cloud-moon-rain",
    "11d": "",
    "11n": "",
    "13d": "snowflake",
    "13n": "snowflake",
    "50d": "",
    "50n": ""
}

export const WeatherIcon = (props:Props) => {

    const { name } = props;

    return <FontAwesome name={names[name]} color="#fcfcfc" size={width/10} />
}