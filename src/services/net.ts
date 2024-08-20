import { store } from '@/services/store';

import BleManager from 'react-native-ble-manager';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Alert, BackHandler } from 'react-native';
import PlacePayload from '@/types/payloads/PlacePayload';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';

export const DEVICE_TYPE = 'urn:schemas-upnp-org:device:IoTDevice:1';
export const SERVICE_UUID = 'fcb7f125-606c-57cd-924f-3482a9c10323';
export const NETWORK_CHARACTERISTIC_UUID = '51ff12bb-3ed8-46e5-b4f9-d64e2fec021b';
export const CONNECTED_CHARACTERISTIC_UUID = '28f2d950-79bd-5926-8872-648c716f231d';
export const LAMP_CHARACTERISTIC_UUID = 'fb63904f-5d09-5c7b-8d2c-acb56a159a8f';
export const MOTOR_CHARACTERISTIC_UUID = '4ce334f7-e255-5c56-a9ad-1e593f447a8c';

const mainPlace: PlacePayload = {
    key: SERVICE_UUID,
    name: 'Banco de Trabajo',
    image: require('./images/logo.png'),
    temperature: [],
    inputs: 2,
    outputs: 0,
    isactive: true
}

const lamp: AccessoryPayload = {
    key: LAMP_CHARACTERISTIC_UUID,
    name: 'Lamp',
    place: SERVICE_UUID,
    value: false,
    type: {
        key: 'single',
        type: 'lamp'
    },
    isactive: false
};

const motor: AccessoryPayload = {
    key: MOTOR_CHARACTERISTIC_UUID,
    name: 'Motor',
    place: SERVICE_UUID,
    value: false,
    type: {
        key: 'single',
        type: 'motor'
    },
    isactive: false
};

async function connectToPeripheral(id: string) {
    let connections = await BleManager.getConnectedPeripherals();
    if (connections.length > 0) return;
    await BleManager.connect(id, { autoconnect: true }).catch(error => store.dispatch({ type: 'DEVICE_CONNECTION_FAILED', id, error }));
}

BleManager.addListener('BleManagerDiscoverPeripheral', async ({ id }: { id: string }) => {
    let connections = await BleManager.getConnectedPeripherals();
    if (connections.length > 0) return;
    store.dispatch({ type: 'DEVICE_DISCOVERED', id });
    await connectToPeripheral(id);
});

BleManager.addListener('BleManagerConnectPeripheral', async ({ peripheral }: { peripheral: string }) => {
    await BleManager.stopScan();

    let service = await BleManager.retrieveServices(peripheral);

    store.dispatch({ type: 'DEVICE_CONNECTED', id: peripheral });

    lamp.value = (await BleManager.read(service.id, SERVICE_UUID, LAMP_CHARACTERISTIC_UUID)).length > 0;
    motor.value = (await BleManager.read(service.id, SERVICE_UUID, MOTOR_CHARACTERISTIC_UUID)).length > 0;

    store.dispatch({
        type: 'UPDATE_PLACE',
        place: mainPlace
    });
    store.dispatch({
        type: 'UPDATE_ACCESSORY',
        accessory: lamp
    });
    store.dispatch({
        type: 'UPDATE_ACCESSORY',
        accessory: motor
    });
    console.log(service);
});

BleManager.addListener('BleManagerDisconnectPeripheral', async ({ peripheral }: { peripheral: string }) => {
    store.dispatch({ type: 'DEVICE_DISCONNECTED', id: peripheral });
    store.dispatch({ type: 'RESET_PLACES' });
    store.dispatch({ type: 'RESET_ACCESSORIES' });
    await BleManager.scan([SERVICE_UUID], 0);
});

BleManager.addListener('BleManagerDidUpdateValueForCharacteristic', ({ value, peripheral, characteristic, service }: { value: [], peripheral: string, characteristic: string, service: string }) => {

});

export async function setup() {
    for (let permission of [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]) {
        let status = await request(permission);

        if (status !== RESULTS.GRANTED) {
            Alert.alert('Error', 'Required permissions missing', [
                {
                    text: 'Exit',
                    isPreferred: true,
                    onPress: () => BackHandler.exitApp()
                }
            ])
        }
    }

    await BleManager.enableBluetooth();
    await BleManager.start();
    let devices = await BleManager.getDiscoveredPeripherals();
    let validDevices = devices.filter(device => device.advertising.serviceUUIDs?.includes(SERVICE_UUID));
    if (validDevices.length == 0) await BleManager.scan([SERVICE_UUID], 0);
    else await connectToPeripheral(validDevices[0].id);
}

export function toBytes(value: any): number[] {
    if (typeof value === 'boolean') {
        return value ? [0] : [];
    } else if (typeof value === 'string' || typeof value === 'number') {
        let encoder = new TextEncoder();
        let uarray = encoder.encode(value.toString());

        let array = [];
        for (let u of uarray) array.push(u);
        return array;
    }
    throw new Error('invalid value');
}

export async function updateCharacteristic(id: string, value: any) {
    let connections = await BleManager.getConnectedPeripherals();
    if (connections.length == 0) return;
    let device = connections[0].id;

    await BleManager.write(device, SERVICE_UUID, id, toBytes(value))
}
