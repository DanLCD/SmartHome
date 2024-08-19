import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import RoomBox from './RoomBox';
import { store, connector } from '../../../store';
import styles from './RoomsComponentStyle';
import { normalizeValue } from '../../../../services/commons';
import { PlacePayload } from '@/components/PlacesComponent/PlacesComponent';
import { AccessoryPayload } from '@/components/mocks/RoomAccessoriesMock';

type Props = {
    places: PlacePayload[],
    accessories: AccessoryPayload[]
};

class RoomsComponent extends Component<Props> {
    activateRoom(place: PlacePayload) {
        store.dispatch({ type: 'ACTIVATE_PLACE', place });
        store.dispatch({ type: 'RESET_ACCESSORY' });
    }

    previewRoomStatus(room: PlacePayload, accessories: AccessoryPayload[]) {
        return accessories.filter(x => x.place === room.key).map(x => `${x.name} is ${normalizeValue(x.value)}`);
    }

    countAccessoriesInRoom(room: PlacePayload, accessories: AccessoryPayload[]) {
        return accessories.reduce((count, x) => x.place === room.key ? count + 1 : count, 0);
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
