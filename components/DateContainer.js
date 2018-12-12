import React, { Component } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View, PanResponder, Dimensions } from 'react-native'
import moment from 'moment';
const width = Dimensions.get('window').width;
const threshold = width * 0.1;
const duration = 200;

export class DateContainer extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const animation = new Animated.Value(1);
        const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
            return true;
        },
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: 0 });
            animation.setValue(gesture.dx);
        },
        onPanResponderRelease: (event, gesture) => {
            if(gesture.dx > threshold){
            console.log('Swipe right');
            this.forceSwipe('right');
            }
            else if(gesture.dx < -threshold){
            console.log('Swipe left');
            this.forceSwipe('left');
            }
            else {
            this.resetPosition();
            }
            
        }
        });
        this.state = {
            position, panResponder, animation,
            direction: null,
            date: moment().format("DD/MM/YYYY")
        };

    }
    resetPosition() {
        const { position } = this.state;
        Animated.spring(position, {
          toValue: { x: 0, y: 0 }
        }).start();
      }

      componentDidUpdate(prevProps, prevState) {
        const { direction } = this.state;
        const xVal = direction === 'right' ? -width : width 
        Animated.timing(this.state.position, {
            toValue: { x: xVal, y: 0 },
            duration: 0,
          }).start();
        this.resetPosition();
      }

      getItemStyle() {
        const { position } = this.state;
        const moveX = position.x.interpolate({
          inputRange: [-width*1.5, 0, width*1.5],
          outputRange: [-100, 0, 100]
        });
        const opacity = position.x.interpolate({
            inputRange: [ 0, width],
            outputRange: [1, 0]
          });
        return {
          ...this.state.position.getLayout(),
          transform: [{translateX: moveX}],
          opacity
        };
      }

    forceSwipe(direction) {
        const x = direction === 'right' ? width : -width;
        this.props.changeData();
        Animated.timing(this.state.position, {
          toValue: { x, y: 0 },
          duration
        }).start(() => this.onSwipeComplete(direction));
    }   
    
    onSwipeComplete(direction) {
        const prevDay = moment(this.state.date, "DD/MM/YYYY").subtract(1, 'days').format("DD/MM/YYYY");
        const nextDay = moment(this.state.date, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
        this.setState({ direction, date: direction === 'left' ? nextDay : prevDay});
      }
  render() {
    return (
        <View style={styles.container} {...this.state.panResponder.panHandlers}>
            <TouchableOpacity onPress={() => this.forceSwipe('right')} style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}> Prev </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.dateContainer, this.getItemStyle()]}>
                <Text style={styles.text}> {this.state.date} </Text>
            </Animated.View>
            <TouchableOpacity onPress={() => this.forceSwipe('left')} style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}> Next </Text>
            </TouchableOpacity>
        </View>
    )
  }
}

export default DateContainer;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    dateContainer: {
        zIndex: 80
    },
    buttonTextContainer: {
        zIndex: 101
    },
    buttonText: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    } 
  });