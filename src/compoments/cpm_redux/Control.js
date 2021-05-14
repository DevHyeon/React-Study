import React, { Component } from 'react';
import PropTypes from 'prop-types'


const propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRandmizeColor: PropTypes.func
};

function createWarning(funcName) {
    return () => console.warn(funcName + 'is not defind')
};

const defaultProps = {
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandmizeColor: createWarning('onRandmizeColor')

};


class Control extends Component {

    
    render() {
        return (
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRandmizeColor}>Randomize Color</button>
            </div>
        );
    }
}


Control.propTypes = propTypes;
Control.defaultProps = defaultProps


export default Control;