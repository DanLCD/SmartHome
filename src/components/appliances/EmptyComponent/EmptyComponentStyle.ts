import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export default {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    heading: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        marginTop: 20,
        marginBottom: 10
    } as TextStyle,
    text: {
        textAlign: 'center',
        color: 'silver'
    } as TextStyle,
    image: {} as ImageStyle
}