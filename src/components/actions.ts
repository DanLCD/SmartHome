import { mockRooms } from './mocks/RoomsMock';
import { mockAccessories } from './mocks/RoomAccessoriesMock';
import { store } from './store';

export function getPlaces () {   
    mockRooms.map((place, index) => {
        store.dispatch({
            type: 'UPDATE_PLACE',
            place: Object.assign(place, {key: index})
        });
    });
}

export function fetchAccessories () {    
    mockAccessories.map((accessory, index) => {
        store.dispatch({
            type: 'UPDATE_ACCESSORY',
            accessory
        });
    });
}
