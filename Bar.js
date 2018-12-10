import React, {Component} from 'react';
import Svg, { Rect } from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

export default class Slice extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const {
            index,
            item,
            maxData
        } = this.props;

        return (
            <Rect
            ref={index}
            key={index}
            x={index*10}
            y={-item*maxData}
            rotation="0"
            onPress = {(() => this.props.animate())}
            width="5"
            height={item*maxData}
            fill='blue'
            stroke="green"
        />
        )

    }
}