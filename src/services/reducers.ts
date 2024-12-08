import { combineReducers } from 'redux';
import { StoreProps } from '@/services/store';
import { Reducer } from '@reduxjs/toolkit';
import PlacePayload from '@/types/payloads/PlacePayload';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';
import DevicePayload from '@/types/payloads/DevicePayload';

export function placesReducer(places: PlacePayload[] = [], action: any): PlacePayload[] {
    switch (action.type) {
        case 'UPDATE_PLACE':
            return places.concat(action.place);
        case 'ACTIVATE_PLACE':
            return places.map(place => {
                let isactive = false;
                if (place.key === action.place.key) {
                    isactive = true;
                }
                return {...place, isactive};
            });
        case 'DELETE_PLACE':
            return places.filter(place => place.key !== action.place.key);
        case 'RESET_PLACES':
            return [];
    }
    return places;
}

export function accessoriesReducer(accessories: AccessoryPayload[] = [], action: any): AccessoryPayload[] {
    switch (action.type) {
        case 'UPDATE_ACCESSORY_VALUE':
            return accessories.map(accessory => {
                if (accessory.key === action.accessory.key) {
                    return {...accessory, value: action.value}
                }
                return accessory;
            });
        case 'RESET_ACCESSORY':
            return accessories.map(accessory => ({...accessory, isactive: false}));
        case 'UPDATE_ACCESSORY':
            return accessories.concat(action.accessory);
        case 'ACTIVATE_ACCESSORY':
            return accessories.map(accessory => {
                let isactive = false;
                if (accessory.key === action.accessory.key) {
                    isactive = true;
                }
                return {...accessory, isactive};
            });
        case 'DELETE_ACCESSORY':
            return accessories.filter(accessory => accessory.key !== action.accessory.key);
        case 'RESET_ACCESSORIES':
            return [];
    }
    return accessories;
}

export function deviceReducer(device: DevicePayload | null = null, action: any): DevicePayload | null {
    switch (action.type) {
        case 'DEVICE_DISCOVERED':
            return {id: action.id, connected: false};
        case 'DEVICE_CONNECTED':
            return {id: action.id, connected: true};
        case 'DEVICE_DISCONNECTED':
            return null;
    }

    return device;
}

export const reducers = combineReducers({
    places: placesReducer,
    accessories: accessoriesReducer,
    device: deviceReducer
}) as Reducer<StoreProps>;
