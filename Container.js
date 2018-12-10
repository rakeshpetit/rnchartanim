import Svg, { Circle, G, Text as SvgText} from 'react-native-svg';
import React, {Component} from 'react';
import { Easing, Button, Animated, StyleSheet, Text, View} from 'react-native';
import Slice from "./Slice";
import Bars from './Bars';
const AnimatedSlice = Animated.createAnimatedComponent(Slice);
const demoData = [
  {
    number: 100 / 12,
    color: '#00FFFF'
  },
  {
    number: 100 / 12,
    color: '#008080'
  },
  {
    number: 100 / 12,
    color: '#000080'
  },
  {
    number: 100 / 12,
    color: '#00FFFF' 
  },
  {
    number: 100 / 12,
    color: '#008080'
  },
  {
    number: 100 / 12,
    color: '#000080'
  },
  {
    number: 100 / 12,
    color: '#00FFFF'
  },
  {
    number: 100 / 12,
    color: '#008080'
  },
  {
    number: 100 / 12,
    color: '#000080'
  },
  {
    number: 100 / 12,
    color: '#00FFFF'
  },
  {
    number: 100 / 12,
    color: 'white'
  },
  {
    number: 100 / 12,
    color: 'white'
  }
];

const data = [ 465, 155, 540, 265, 875, 124, 196, 486, 575, 125, 300, 1150, 1450, 120, 154, 235, 423];

export default class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(1),
            dataToShow: demoData,
            barData: data,
            dataSet : 0
        };

    }

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 4; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + 'ff';
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 1000);
    }
    

    resetPie = ()=>{
        this.state.animValue.setValue(1);
    };

    changeData = () => {
      const data = [];
      const barData = [];
      for (let i = 0; i < 12; i++) {
        let item = {};
        // const color = this.getRandomColor();
        // console.log(color);
        item.number = 100/12;
        item.color = this.getRandomColor();
        data.push(item);
        barData.push(this.getRandomNumber())
      }
      this.setState({ barData: barData, dataToShow: data});
      this.resetPie();
      this.animate(400);
    }

    refreshCharts = () => {
        this.animate();        
        this.bar.animateButton();
    }

    animate = (timing)=>{

        Animated.timing(
            this.state.animValue,
            {
                toValue: 0,
                duration: timing ? timing/4 : 800,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            // setTimeout(this.resetPie, 2000);
            Animated.timing(
              this.state.animValue,
              {
                  toValue: 2,
                  duration: timing ? timing : 800,
                  easing: Easing.inOut(Easing.quad)
              }
          ).start(()=>{
            // setTimeout(this.resetPie, 2000);
        });
      });

        

      
    };

    render() {
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
        const { barData, dataToShow } = this.state;
        return (
            <View style={styles.container}>
                <Svg
                    width={200}
                    style={styles.pieSVG}
                    height={200}
                    viewBox={`-100 -100 200 200`}
                >
                    <G>
                        {
                            dataToShow.map( (item, index) =>{
                                return (
                                    <AnimatedSlice
                                        index={index}
                                        endAngle={endAngle}
                                        color={item.color}
                                        data={dataToShow}
                                        key={'pie_shape_' + index}
                                    />
                                )
                            })
                        }
                        <SvgText
                                stroke="blue"
                                fontSize="40"
                                textAnchor="middle">{barData[0] * 10}</SvgText>
                         
                    </G>
                </Svg>
                <Bars ref={instance => { this.bar = instance; }}  data={this.state.barData}/>
                <View style={{marginTop: 20}}>
                    <Button title={'Press'} onPress={this.refreshCharts}/>
                    <Button title={'Change Data'} onPress={this.changeData}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  } 
});