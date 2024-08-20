import React, { Component, ReactNode } from 'react';
import { ScrollView, View, Text } from 'react-native';
import AccessoriesComponent from '@/components/appliances/AccessoriesComponent/AccessoriesComponent';
import { store, connector, StoreProps } from '@/services/store';
import styles from './RoomAccessoriesComponentStyle';
import EmptyComponent from '@/components/appliances/EmptyComponent/EmptyComponent';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';
import { useTranslation } from 'react-i18next';

const RoomAccessoriesTitle = () => {
    const { t } = useTranslation(['home']);
    return (<Text style={styles.text}>{t('home:room-accessories-title')}</Text>);
}

class RoomAccessoriesComponent extends Component<StoreProps> {
    accessoryChange(accessory: AccessoryPayload) {
        store.dispatch({ type: 'ACTIVATE_ACCESSORY', accessory })
    }

    accessories(): AccessoryPayload[] {
        const { places } = this.props;
        const currentPlace = places.find(place => place.isactive);
        return currentPlace ? this.props.accessories
            .filter(accessory => accessory.place == currentPlace.key) : [];
    }

    accessoriesElements(): ReactNode[] {
        return this.accessories().map((accessory: AccessoryPayload, index: number) => (
            <AccessoriesComponent
                key={index}
                value={accessory.value}
                name={accessory.name}
                onPress={() => this.accessoryChange(accessory)}
                isactive={accessory.isactive} />
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
                {this.accessories().length === 0 ? <EmptyComponent status={this.props.device == null ? 'DISCONNECTED' : (this.props.device.connected ? 'CONNECTED' : 'CONNECTING')} /> : accessoriesView}
            </View>
        )
    }
}

export default connector(RoomAccessoriesComponent);
