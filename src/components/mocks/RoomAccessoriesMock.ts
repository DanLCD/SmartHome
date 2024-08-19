import { sample, random, times } from 'lodash';

export type AccessoryPayload = { key: number, name: string, place: number, value: any, type: { key: string }, isactive: boolean};

export let mockAccessories = times(10, () => {
    return mockGenerator();
})
.map(($el: AccessoryPayload, index: number) => {
    $el.key = index;
    return $el;
});

function mockGenerator (): AccessoryPayload {
    function byType (): { value: any, type: { key: string} } {
        switch (random(1,2)) {
            case 1:
                return {
                    value: random(5,50),
                    type: {
                        key: 'temperature'
                    }
                }
            default:
                return {
                    value: sample([false, true]),
                    type: {
                        key: 'single'
                    }
                }
        }
    }
    return {
        key: NaN,
        name: sample(['Front Lamp' , 'Back Lamp', 'Waterpump', 'Fan', 'Green Light' , 'Red Light', 'Night Dim']),
        place: random(1,4),
        isactive: false,
        ...byType()
    };
}