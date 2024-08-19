import { TextStyle, ViewStyle } from "react-native";

export default {
    container: {
        marginTop: 10,
        marginRight: 10,
        backgroundColor: 'rgb(34, 71, 198)',
        padding: 5,
        width: 90,
        borderRadius: 10
    } as ViewStyle,
    name: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        color: 'rgb(132,153,241)'
    } as TextStyle,
    value: {
        color: 'green',
        fontSize: 11,
        textAlign: 'right',
    } as TextStyle
};

export let styleActive = {
    container: {
        backgroundColor: 'white',
    } as ViewStyle,
    name: {
        fontWeight: 'bold',
        color: 'gray'
    } as TextStyle
}