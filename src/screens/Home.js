import React, { Component } from 'react';
import { Agenda } from '../components';

import SplashScreen from 'react-native-splash-screen';
import { Analytics } from '../utils';

export default class Home extends Component {
    componentDidMount() {
        Analytics.doSetScreen('to_schedule');

        SplashScreen.hide();
    }
    render() {
        return <Agenda />;
    }
}
