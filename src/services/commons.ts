export function normalizeValue (value: any) {
    if (typeof value === 'boolean') {
        return value ? 'ON' : 'OFF';
    }
    return value;
}