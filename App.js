import Svg, { Circle, G} from 'react-native-svg';
import React, {Component} from 'react';
import { Easing, Button, Animated, Platform, StyleSheet, Text, View} from 'react-native';
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

const demoDataChanged = [
  {
    number: 100 / 12,
    color: '#00FFFF'
  },
  {
    number: 100 / 12,
    color: 'red'
  },
  {
    number: 100 / 12,
    color: '#350080'
  },
  {
    number: 100 / 12,
    color: '#35FFFF'
  },
  {
    number: 100 / 12,
    color: '#358080'
  },
  {
    number: 100 / 12,
    color: '#350080'
  },
  {
    number: 100 / 12,
    color: '#35FFFF'
  },
  {
    number: 100 / 12,
    color: '#358080'
  },
  {
    number: 100 / 12,
    color: '#350080'
  },
  {
    number: 100 / 12,
    color: '#35FFFF'
  },
  {
    number: 100 / 12,
    color: 'black'
  },
  {
    number: 100 / 12,
    color: 'black'
  }
];

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(1),
            dataToShow: demoData
        };

    }

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    

    resetPie = ()=>{
        this.state.animValue.setValue(1);
    };

    changeData = () => {
      const data = [];
      for (let i = 0; i < 12; i++) {
        let item = {};
        // const color = this.getRandomColor();
        // console.log(color);
        item.number = 100/12;
        item.color = this.getRandomColor();
        data.push(item);
      }
      this.setState({ dataToShow: data});
      this.resetPie();
      this.animate();
    }

    animate = ()=>{

        Animated.timing(
            this.state.animValue,
            {
                toValue: 0,
                duration: 800,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            // setTimeout(this.resetPie, 2000);
            Animated.timing(
              this.state.animValue,
              {
                  toValue: 2,
                  duration: 800,
                  easing: Easing.inOut(Easing.quad)
              }
          ).start(()=>{
            // setTimeout(this.resetPie, 2000);
        });
      });

        

      
    };

    render() {
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
        const dataToShow = this.state.dataToShow;
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
                         
                    </G>
                </Svg>
                <Bars />
                <View style={{marginTop: 20}}>
                    <Button title={'Press'} onPress={this.animate}/>
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
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  } 
});