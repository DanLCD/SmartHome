import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import RoomBox from './RoomBox';
import { store, connector, StoreProps } from '@/services/store';
import styles from './RoomsComponentStyle';
import { normalizeValue } from '@/services/commons';
import PlacePayload from '@/types/payloads/PlacePayload';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';

class RoomsComponent extends Component<StoreProps> {
    activateRoom(place: PlacePayload) {
        store.dispatch({ type: 'ACTIVATE_PLACE', place });
        store.dispatch({ type: 'RESET_ACCESSORY' });
    }

    previewRoomStatus(room: PlacePayload, accessories: AccessoryPayload[]) {
        return accessories.filter(accessory => accessory.place === room.key).map(accessory => `${accessory.name} is ${normalizeValue(accessory.value)}`);
    }

    countAccessoriesInRoom(room: PlacePayload, accessories: AccessoryPayload[]) {
        return accessories.reduce((count, accessory) => accessory.place === room.key ? count + 1 : count, 0);
    }

    render() {
        const callee = (place: PlacePayload, index: number) => <RoomBox onPress={() => this.activateRoom(place)} room={place} key={index} roomStatus={this.previewRoomStatus(place, this.props.accessories)} />;

        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}>
                {this.props.places.map(callee)}
            </ScrollView>
        );
    }
}

export default connector(RoomsComponent);
