import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PlaceRow from '@/components/PlaceRow/PlaceRow';
import { connector, StoreProps } from '@/services/store';

class Places extends Component<StoreProps> {
    render() {
        let places = this.props.places;

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