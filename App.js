import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Container from './components/Container';
import TickContainer from './components/TickContainer';
import DateContainer from './components/DateContainer';


export default class App extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Container />
                {/* <TickContainer /> */}
                {/* <DateContainer /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } 
});