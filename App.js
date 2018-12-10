import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Container from './components/Container';


export default class App extends Component {


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