import React, { Component, ReactNode } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { AccessoriesComponent } from '../AccessoriesComponent/AccessoriesComponent';
import { store, connector } from '../../../store';
import styles from './RoomAccessoriesComponentStyle';
import EmptyComponent from '../EmptyComponent/EmptyComponent';
import { AccessoryPayload } from '@/components/mocks/RoomAccessoriesMock';
import { PlacePayload } from '@/components/PlacesComponent/PlacesComponent';
import { useTranslation } from 'react-i18next';

type Props = {places: PlacePayload[], accessories: AccessoryPayload[]};

const RoomAccessoriesTitle = () => {
    const { t } = useTranslation(['home']);
    return (<Text style={styles.text}>{t('home:room-accessories-title')}</Text>);
}

class RoomAccessoriesComponent extends Component<Props> {
    accessoryChange(accessory: AccessoryPayload) {
        store.dispatch({ type: 'ACTIVATE_ACCESSORY', accessory })
    }

    accessories(): AccessoryPayload[] {
        const { places } = this.props;
        const currentPlace = places.find(place => place.isactive);
        return currentPlace ? this.props.accessories
            .filter(x => x.place == currentPlace.key) : [];
    }

    accessoriesElements(): ReactNode[] {
        const { accessories } = this.props;
        return this.accessories().map((x: AccessoryPayload, index: number) => (
            <AccessoriesComponent
                key={index}
                value={x.value}
                name={x.name}
                onPress={() => this.accessoryChange(x)}
                isactive={x.isactive} />
        )) as ReactNode[];
    }

    render() {
        const accessoriesView = (
            <View>
                <RoomAccessoriesTitle />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.accessories}>
                    {this.accessoriesElements()}
                </ScrollView>
            </View>
        );

        return (
            <View style={styles.container}>
                {this.accessories().length === 0 ? <EmptyComponent /> : accessoriesView}
            </View>
        )
    }
}

export default connector(RoomAccessoriesComponent);
