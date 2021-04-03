import React from 'react';
import { Weather } from '../store/types/weather.types';
import styled from 'styled-components'
import {
    View,
    Text
} from 'react-native'
import { WeatherIcon } from '../utils/Icon'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
    weather: Weather
}

const Container = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const ContainerRow = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const TextLoc = styled(Text)`
    font-size: 30px;
    margin-left: 5px;
`

const TextDate = styled(Text)`
    font-size: 20px
`

const TextTemp = styled(Text)`
    font-size: 50px;
    margin-left: 10px;
`

const TextMax = styled(Text)`
    font-size: 20px;
    margin-left: 10px;
`

const TextMain = styled(Text)`
    font-size: 20px;
    margin-left: 10px;
`

const WeatherScreen = (props: Props) => {

    const {description, name, temp_min, temp_max, feels_like, icon, main, temp, dt} = props.weather
    return(
        <Container>
            <ContainerRow>
                <Icon name="map-marker" size={30} />
                <TextLoc>
                    {name}
                </TextLoc>
            </ContainerRow>
            <TextDate>
                {new Date(dt).toLocaleString('en-US', {weekday: 'long', month: 'short', day: '2-digit'})}
            </TextDate>
            <ContainerRow>
                <WeatherIcon name={icon} />
                <TextTemp>
                    {temp}°
                </TextTemp>
            </ContainerRow>
            <TextMax>
                {temp_max}°/{temp_min}° Feels like {feels_like}°
            </TextMax>
            <TextMain>
                {main}
            </TextMain>
        </Container>
    )
}

export default WeatherScreen;