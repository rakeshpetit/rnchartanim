import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View, PanResponder, Dimensions } from 'react-native'
import moment from 'moment';
const width = Dimensions.get('window').width;
const threshold = width * 0.25;
const duration = 100;

export class DateContainer extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
            return true;
        },
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: 0 });
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
            position, panResponder,
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
            duration: 0
          }).start();
        this.resetPosition();
      }

      getItemStyle() {
        const { position } = this.state;
        const moveX = position.x.interpolate({
          inputRange: [-width*1.5, 0, width*1.5],
          outputRange: [-100, 0, 100]
        });
        return {
          ...this.state.position.getLayout(),
          transform: [{translateX: moveX}]
        };
      }

    forceSwipe(direction) {
        const x = direction === 'right' ? width : -width;
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
        <Animated.View style={[styles.container, this.getItemStyle()]} {...this.state.panResponder.panHandlers}>
            <Text style={styles.text}> {this.state.date} </Text>
      </Animated.View>
    )
  }
}

export default DateContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white'
      } ,
        text: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
        } 
  });