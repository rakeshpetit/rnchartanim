import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, View} from 'react-native';
import Container from './components/Container';
import TickContainer from './components/TickContainer';
import DateContainer from './components/DateContainer';


export default class App extends Component {


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
                {/* <TickContainer /> */}
                {/* <DateContainer /> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } 
});