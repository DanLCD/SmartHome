import { TextStyle, ViewStyle } from "react-native";

export default {
    container: {
        marginTop:10,
        borderRadius:15,
        backgroundColor: 'white',
        margin: 5,
        padding: 15,
        marginBottom:10
    } as ViewStyle,
    text: {
        fontSize: 21
    } as TextStyle,
    accessories: {
        flexDirection: 'row'
    } as ViewStyle,
    temperature: {
        fontSize:90,
        textAlign: 'center'
    } as TextStyle
};