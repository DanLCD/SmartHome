import { AnyAction, combineReducers } from 'redux';
import { StoreProps } from '@/services/store';
import { Reducer } from '@reduxjs/toolkit';
import PlacePayload from '@/types/payloads/PlacePayload';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';

export function placesReducer(places: PlacePayload[] = [], action: AnyAction) {
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
    }
    return places;
}

export function accessoriesReducer(accessories: AccessoryPayload[] = [], action: AnyAction) {
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
    }
    return accessories;
}

export const reducers = combineReducers<StoreProps>({
    places: placesReducer,
    accessories: accessoriesReducer
}) as Reducer<StoreProps>;
