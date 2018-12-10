import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Container from './components/Container';
import TickContainer from './components/TickContainer';


export default class App extends Component {


    render() {
        return (
            <View style={styles.container}>
                {/* <Container /> */}
                <TickContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } 
});