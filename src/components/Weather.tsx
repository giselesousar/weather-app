import React from 'react';
import { Weather } from '../store/types/weather.types';
import styled from 'styled-components'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import { WeatherIcon } from '../utils/Icon'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

interface Props {
    weather: Weather
}

const { width, height } = Dimensions.get('window');

const Container = styled(View)`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding-top: ${width/5}px;
    width: 100%;
`

const ContainerTop = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${height*0.3}px;
`

const ContainerDown = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${height*0.2}px;
`

const Content = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${height*0.6}px;
`

const Location = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${width*0.45}px;
`
const LocationInfo = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: ${height*0.08}px;
`
const Temp = styled(View)`
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Description = styled(View)`
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Row = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 70%;
`

const Col = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 36%;
`

const ColInfo = styled(View)`
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`

const TextCity = styled(Text)`
    font-size: ${width/24}px;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
`

const TextDate = styled(Text)`
    font-size: ${width/24}px;
    color: ${props => props.theme.colors.text};
`

const TextDescription = styled(Text)`
    font-size: ${width/24}px;
    color: ${props => props.theme.colors.text};
`

const TextTemp = styled(Text)`
    font-size: ${width/9}px;;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
`

const TextLabel = styled(Text)`
    font-size: ${width/24}px;;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
`

const TextInfo = styled(Text)`
    font-size: ${width/25}px;;
    color: ${props => props.theme.colors.text};
`

const WeatherScreen = (props: Props) => {

    const {description, name, temp_min, temp_max, feels_like, icon, temp, dt, humidity, speed} = props.weather

    const capitalizeFirstLetter = (str: string) => str[0].toLocaleUpperCase()+str.slice(1, str.length);

    const formatDate = (num: Date) => {
        const date = new Date(num).toDateString().split(' ');
        return date[0]+ ', '+ date[2] + ' ' + date[1];
    }

    return(
        <Container>
            <Content>
            <ContainerTop>
                <Location>
                    <WeatherIcon name={icon} />
                    <LocationInfo>
                        <TextCity>
                            {name}
                        </TextCity>
                        <TextDate>
                            {dt && formatDate(dt)}
                        </TextDate>
                    </LocationInfo>
                </Location>
                <Temp>
                    <TextTemp>
                        {temp}°
                    </TextTemp>
                </Temp>
                <Description>
                    <TextDescription>
                        {description && capitalizeFirstLetter(description)}
                    </TextDescription>
                </Description>
            </ContainerTop>
            <ContainerDown>
                <Row>
                    <Col>
                        <FontAwesome  name="thermometer-half" size={width/15} color="#fcfcfc" />
                        <ColInfo>
                            <TextLabel>
                                Feels like
                            </TextLabel>
                            <TextInfo>
                                {feels_like}°
                            </TextInfo>
                        </ColInfo>
                    </Col>
                    <Col>
                        <FontAwesome  name="tint" size={width/15} color="#fcfcfc" />
                        <ColInfo>
                            <TextLabel>
                                Humidity
                            </TextLabel>
                            <TextInfo>
                                {humidity}%
                            </TextInfo>
                        </ColInfo>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FontAwesome  name="wind" size={width/15} color="#fcfcfc" />
                        <ColInfo>
                            <TextLabel>
                                Wind
                            </TextLabel>
                            <TextInfo>
                                {speed} m/s
                            </TextInfo>
                        </ColInfo>
                    </Col>
                    <Col>
                        <FontAwesome style={{transform: [{rotate: '90deg'}]}}  name="exchange-alt" size={width/15} color="#fcfcfc" />
                        <ColInfo>
                            <TextLabel>
                                Max/Min
                            </TextLabel>
                            <TextInfo>
                                {temp_max}°/{temp_min}°
                            </TextInfo>
                        </ColInfo>
                    </Col>
                </Row>
            </ContainerDown>
            </Content>
        </Container>
    )
}

export default WeatherScreen;