import Svg,{
    Circle,
    Ellipse,
    G,
    // Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

/* Use this if you are using Expo
import { Svg } from 'expo';
const { Circle, Rect } = Svg;
*/

import React from 'react';
import { Easing, Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import Bar from './Bar';
// Percentages work in plain react-native but aren't supported in Expo yet, workaround with this or onLayout
const { width, height } = Dimensions.get('window');
const AnimatedBar = Animated.createAnimatedComponent(Bar);

export default class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          animValue: new Animated.Value(0),
          value: '',
          selectedBar: -1
        };
      } 
      
      componentDidMount() {
        this.animate();
      }
      

      animate = ()=>{
        console.log('animate!!!!!');
        
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1,
                duration: 800,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            // setTimeout(this.resetPie, 2000);
      });
    };

    animateButton = ()=>{
        console.log('animate!!!!!');
        
        Animated.timing(
            this.state.animValue,
            {
                toValue: 0.5,
                duration: 800,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            Animated.timing(
                this.state.animValue,
                {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.quad)
                }
            ).start(()=>{
                // setTimeout(this.resetPie, 2000);
          });
      });
    };

  render() {
    const data = [ 465, 155, 540, 265, 875, 124, 196, 486, 575, 125, 300, 1150, 1450, 120, 154, 235, 423];
    const maxData = 200/Math.max.apply(Math, data);
    console.log('maxData', maxData);
    let maxHeight = Animated.multiply(this.state.animValue, maxData);
    return (
        <View>
            <Svg
        width={200}
        height={200}
        viewBox={`-10 -200 200 200`}>

        {
            data.map( (item, i) =>{
                let index = Animated.multiply(
                    this.state.animValue, i)
                return (
                    <AnimatedBar 
                    animate={this.animateButton}
                    // index={index}
                    index={i}
                    key={i}
                    item={item}
                    maxData={maxHeight}
                    />
                )
            })
        }
        </Svg>
        </View>
    );
    
  }
}