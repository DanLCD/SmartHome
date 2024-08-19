import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import RoomsComponent from './components/RoomsComponent/RoomsComponent';
import RoomAccessoriesComponent from './components/RoomAccessoriesComponent/RoomAccessoriesComponent';
import ControlsComponent from './components/ControlsComponent/ControlsComponent';

export default class IndexComponent extends Component {
    render() {
        return (
            <ScrollView>
                <RoomsComponent />
                <RoomAccessoriesComponent />
                <ControlsComponent />
            </ScrollView>
        );
    }
}

