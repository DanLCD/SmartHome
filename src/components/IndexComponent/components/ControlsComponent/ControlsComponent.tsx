import React, { Component } from 'react';
import { View } from 'react-native';
import { store, connector } from '../../../store';
import styles from './ControlsComponentStyle';
import TemperatureComponent from '../TemperatureComponent/TemperatureComponent';
import SingleBridgeComponent from '../SingleBridgeComponent/SingleBridgeComponent';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';

type Props = { accessories: AccessoryPayload[] };

class ControlsComponent extends Component<Props> {
    updateValue(accessory: AccessoryPayload, value: any) {
        store.dispatch({ type: "UPDATE_ACCESSORY_VALUE", accessory, value })
    }

    render() {
        const findActiveControl = () => this.props.accessories.find(accessory => accessory.isactive);
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

