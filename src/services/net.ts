import { store } from '@/services/store';
import UPnPDevicePayload from '@/types/payloads/UPnPDevicePayload';
import UPnPScanner from './scanner';
import UPnPClient from 'node-upnp';

export const DEVICE_TYPE = 'urn:schemas-upnp-org:device:IoTDevice:1';
export const SERVICE_UUID = 'fcb7f125-606c-57cd-924f-3482a9c10323';
export const CHARACTERISTIC_UUID = '51ff12bb-3ed8-46e5-b4f9-d64e2fec021b';

export function setup() {

}

export async function sync() {
    let scanner = UPnPScanner as any;
    let device = await new Promise<UPnPDevicePayload>(async (resolve, reject) => {
        scanner.on('added', (device: UPnPDevicePayload) => {
            resolve(device);
        });

        while (true) {
            console.log('Running scanner...');
            try {
                await scanner.startDiscovery({mx:30});
            } catch(e) {
                reject(e);
                return
            }
            console.log('Sleeping until discovery');
            await scanner.wait(30000);
        }
    });

    console.log(device);

    /*mockRooms.map((place, index) => {
        store.dispatch({
            type: 'UPDATE_PLACE',
            place: Object.assign(place, {key: index})
        });
    });

    mockAccessories.map((accessory, index) => {
        store.dispatch({
            type: 'UPDATE_ACCESSORY',
            accessory
        });
    });*/
}
