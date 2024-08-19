import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export default {
    box: {
        width: 180,
        backgroundColor: 'white',
        flex: 1,
        margin:5,
        padding:20,
        borderRadius: 20
    } as ViewStyle,
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left'
    } as TextStyle,
    image: {
        marginTop: 10
    } as ImageStyle,
    quickInfo: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#567182'
    } as TextStyle,
    accessoriesInfo: {
        color: '#798E9C'
    } as TextStyle,
    container: {
        flexDirection: 'row',
        paddingBottom: 10
    } as ViewStyle
        
};

export const activeStyles = {
    text: {
        color: 'rgb(74, 109,249)'
    } as TextStyle
}