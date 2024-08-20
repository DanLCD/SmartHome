import React from 'react';
import { ScrollView } from 'react-native';
import RoomsComponent from '@/components/appliances/RoomsComponent/RoomsComponent';
import RoomAccessoriesComponent from '@/components/appliances/RoomAccessoriesComponent/RoomAccessoriesComponent';
import ControlsComponent from '@/components/appliances/ControlsComponent/ControlsComponent';

export default () => {
    return (
        <ScrollView>
            <RoomsComponent />
            <RoomAccessoriesComponent />
            <ControlsComponent />
        </ScrollView>
    );
};
