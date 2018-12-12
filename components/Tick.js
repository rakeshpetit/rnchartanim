import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

const numberRange = Array(10).fill().map((x, i) => i);
const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = position => ({
    transform: [
        {
            translateY : position
        }
    ]
})

export class Tick extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.animation = new Animated.Value(getPosition(this.props.value, this.props.height))

    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.value !== prevProps.value) {
            Animated.timing(this.animation, {
                toValue: getPosition(this.props.value, this.props.height),
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }
  render() {
    const transformStyle  = getTranslateStyle(this.animation);
    return (
        <Animated.View style={[transformStyle]}>
        {
            numberRange.map((v) => {
                return (
                    <Text key={v} style={styles.text}> { v } </Text>
                )
            })
        }
        </Animated.View>
    )
  }
}

export default Tick;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
});