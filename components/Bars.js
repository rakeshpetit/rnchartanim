import Svg from 'react-native-svg';
import React from 'react';
import { Easing, Animated, View, Dimensions } from 'react-native';
import Bar from './Bar';
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

      componentDidUpdate(prevProps, prevState) {
        this.state.animValue.setValue(0);
        this.animate();
      }
      

      animate = ()=>{        
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            // setTimeout(this.resetPie, 2000);
      });
    };

    animateButton = ()=>{        
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
    const { data } = this.props;
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