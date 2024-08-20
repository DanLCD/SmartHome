type PlacePayload = {
    key: string,
    name: string,
    image: any,
    temperature: string[],
    inputs: number,
    outputs: number,
    isactive: boolean,
    icon?: string
}
export default PlacePayload;
