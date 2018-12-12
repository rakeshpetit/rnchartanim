import React, { Component } from 'react'
import { Animated, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import Tick from './Tick';

export class TickContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measured: false,
            height: 0,
            value: 0
        };
    }

    handleLayout = (e) => {
        this.setState({
            measured:true,
            height: e.nativeEvent.layout.height
        })
    }
    changeNumber = () => {
        this.setState({value: Math.floor(Math.random() * 10000)});
    }
    getDigits = (inp) => {
        const digits = inp.toString().split('');
        const realDigits = digits.map(Number);
        return realDigits;
    }
    render() {
        const { height, measured } = this.state;
        const wrapStyle = measured ? { height } : styles.measure;
        const digits = this.getDigits(this.props.value);     
        console.log('digits', digits);
        return (
            <View style={[styles.container]}>
            <TouchableOpacity onPress={this.changeNumber}>
            <View style={[styles.row, wrapStyle]}>
            {
                digits.map((digit,index) => {
                    return <Tick key={index} value={digit} height={height} />
            })
            }    
             </View>
             </TouchableOpacity>
                <Text onLayout={this.handleLayout} style={[styles.text, styles.measure]}>0</Text>
               
            </View>
        )
    }
}

export default TickContainer;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 75,
        // alignItems: 'center',
        position: 'absolute',
        // justifyContent: 'center',
        // backgroundColor: 'white'
      } ,
      measure: {
          opacity: 0
      },
      row: {
        overflow: 'hidden',
        flexDirection: 'row'
      },
        text: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
        } 
  });
