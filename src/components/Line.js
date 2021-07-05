/**
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';

type LineProps = ViewProps & {
    vertical?: ?boolean
}

class Line extends Component<LineProps> {
    render(): React$Node {

        const {
            vertical,
            ...props
        } = this.props;

        return (
            <View style={vertical ? _style.lineVertical : _style.lineHorizontal}
                  {...(props: ViewProps)}/>
        );
    }
}

const _style = StyleSheet.create({
    lineHorizontal: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, .06)',
        borderRadius: 192,
    },
    lineVertical: {
        flex: 1,
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, .06)',
        borderRadius: 192,
    },
});

export default Line;
