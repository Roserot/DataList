import * as React from 'react';

export default class SingleItem extends React.Component{
    constructor (props) {
        super(props);
        this.std = props.std[props.index];
        this.fact = props.fact[props.index];
    }
    render() {
        return (
            <td  className="SingleItem">
                <span>{this.std}</span>
                <span>{this.fact}</span>
            </td>
        )
    }
}