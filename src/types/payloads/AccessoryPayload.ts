type AccessoryPayload = {
    key: string,
    name: string,
    place: string,
    value: any,
    type: {
        key: string,
        type?: string
    },
    isactive: boolean
};
export default AccessoryPayload;
