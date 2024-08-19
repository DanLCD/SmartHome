import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PlaceRow from '@/components/PlaceRow/PlaceRow';
import { times, sample, random } from 'lodash';
import { connector } from '../../services/store';
import PlacePayload from '@/types/payloads/PlacePayload';

class Places extends Component {
    places(): PlacePayload[] {
        let getImage = () => {
            const list = [
                require('./images/conference.png'),
                require('./images/fireplace.png'),
                require('./images/living-room.png'),
                require('./images/kitchen.png'),
                require('./images/bathtub.png'),
            ];
            return sample(list);
        };
        let getName = () => sample([
            'conference room',
            'Dinning room',
            "Kidsroom",
            "Pantry",
            "Store room"
        ]);

        let place = () => ({
            key: NaN,
            name: getName(),
            image: getImage(),
            temperature: [
                (random(200, 600) * 0.1).toPrecision(4)
            ],
            inputs: random(9),
            outputs: random(9),
            isactive: true
        });

        return times(5, (time: number) => place()).map((place: PlacePayload, index: number) => { place.key = index; return place; });
    }

    render() {
        let places = this.places();

        return (
            <View>
                <FlatList
                    data={places}
                    renderItem={({ item }) => <PlaceRow place={item} />}
                />
            </View>
        )
    }
}

export default connector(Places);