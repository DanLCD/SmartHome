import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers';
import { connect, ConnectedProps, createDispatchHook, createSelectorHook, createStoreHook, ReactReduxContextValue } from 'react-redux';
import AccessoryPayload from '@/types/payloads/AccessoryPayload';
import PlacePayload from '@/types/payloads/PlacePayload';
import { createContext } from 'react';
import { AnyAction } from 'redux';
import DevicePayload from '@/types/payloads/DevicePayload';

export type StoreProps = { accessories: AccessoryPayload[], places: PlacePayload[], device: DevicePayload | null };

export const store = configureStore<StoreProps>({ reducer: reducers });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// The inferred type will look like:
export type GlobalStateProps = ConnectedProps<typeof connector>;

export const StoreContext = createContext<ReactReduxContextValue<RootState, AnyAction> | null>(null);
export const useStore = createStoreHook<RootState>(StoreContext);
export const useDispatch = createDispatchHook<RootState>(StoreContext);
export const useSelector = createSelectorHook(StoreContext);

export const connector = connect((state: RootState) => ({
    accessories: state.accessories,
    places: state.places,
    device: state.device
}), null, null, { context: StoreContext });
