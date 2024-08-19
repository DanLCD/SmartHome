import React, { Component } from 'react';
import { View } from 'react-native';
import { store, connector } from '../../../store';
import styles from './ControlsComponentStyle';
import TemperatureComponent from '../TemperatureComponent/TemperatureComponent';
import SingleBridgeComponent from '../SingleBridgeComponent/SingleBridgeComponent';
import { AccessoryPayload } from '@/components/mocks/RoomAccessoriesMock';

type Props = { accessories: AccessoryPayload[] };

class ControlsComponent extends Component<Props> {

    /**
     * Passing this function to each component, and they will call this function,
     * to update the store with new values.
     */
    updateValue(accessory: AccessoryPayload, value: any) {
        accessory.value = value;
        store.dispatch({ type: "UPDATE_ACCESSORY_VALUE", accessory, value })
    }

    render() {
        const findActiveControl = () => this.props.accessories.find(x => x.isactive);
        const getControl = () => {
            const accessory = findActiveControl();
            if (!accessory) return null;

            switch (accessory.type.key) {
                case 'temperature':
                    return <TemperatureComponent accessory={accessory} updateValue={this.updateValue} />
                case 'single':
                    return <SingleBridgeComponent accessory={accessory} updateValue={this.updateValue} />
            }
        };

        return (
            <View style={styles.container}>
                {getControl()}
            </View>
        )
    }
}

export default connector(ControlsComponent);

