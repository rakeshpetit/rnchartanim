import React, {Component} from 'react';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

export default class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: -1 };
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(90);
    }

    arcGeneratorFunc = () => {
        return d3.shape.arc()
        .outerRadius(100)
        .padAngle(0)
        .innerRadius(90);
    }

    handleIndexPress = (index) => {
        if(this.state.selectedIndex === index) {
            this.setState({selectedIndex: -1 });
        }
        else {
            this.setState({selectedIndex: index});
        }
        
    }

    createPieArc = (index, endAngle, data) => {

        const arcs = d3.shape.pie()
            .value((item)=>item.number)
            .startAngle(0)
            .endAngle(endAngle)
            (data);

        let arcData = arcs[index];

        return d3.shape.arc()
        .outerRadius(100)
        .padAngle(0)
        .innerRadius(index === this.state.selectedIndex ? 80 : 90)(arcData);
    };


    render() {

        const {
            endAngle,
            color,
            index,
            data
        } = this.props;
        let val = data[index].number;

        return (
            <Path
                onPress={()=> this.handleIndexPress(index)}
                d={this.createPieArc(index, endAngle, data)}
                fill={color}
            />
        )

    }
}