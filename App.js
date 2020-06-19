import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Weather from './Weather';

const {width} = Dimensions.get('window');
const API_KEY = '894c0c1d03546d1843b5efd334d6e479';

export default class App extends React.Component {

  state = {
    loading: true, // 로딩 여부 (GPS 및 API)
    weather: null, // 날씨 정보
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading ? <Text style={styles.text}>Weather</Text> : <Weather data={this.state.weather}/>
        }
      </View>
    )
  }
  
  // GPS 정보 조회 성공 시, API 호출
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.getWeather(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // API 호출
  getWeather({latitude, longitude}) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json()) // 응답 값을 JSON 데이터로 변환한다.
    .then(json => {
      console.log(json);

      // API 응답 성공 시, JSON 데이터 할당 및 로딩 여부 변경
      this.setState({
        weather: json,
        loading: false
      })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    fontSize: 25,
    color: 'black'
  }
});