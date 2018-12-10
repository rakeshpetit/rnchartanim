import Svg, { Circle, G} from 'react-native-svg';
import React, {Component} from 'react';
import { Easing, Button, Animated, Platform, StyleSheet, Text, View} from 'react-native';
import Container from './Container';


export default class App extends Component<Props> {


    render() {
        return (
            <View style={styles.container}>
                <Container />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } 
});