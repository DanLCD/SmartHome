import React from 'react';
import { ViewStyle, View, Text } from 'react-native';
import style from './TemperatureComponentStyle';
import Slider from '@react-native-assets/slider';
import { AccessoryPayload } from '@/components/mocks/RoomAccessoriesMock';
import { useTranslation } from 'react-i18next';

var customStyles2 = {
    track: {
        height: 4,
        borderRadius: 2,
    } as ViewStyle,
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        borderColor: '#30a935',
        borderWidth: 2,
    } as ViewStyle
};

type Props = {
    accessory: AccessoryPayload,
    updateValue: (accessory: AccessoryPayload, value: any) => void
};

const TemperatureAdjustComponent = ({ accessory, updateValue }: Props) => {
    const { t } = useTranslation(['home']);
    return (
        <View style={style.container}>
            <Text style={style.text}>{t('home:temperature-title')}</Text>
            <Text style={style.temperature}>
                {accessory.value}
            </Text>
            <Slider
                minimumValue={10}
                step={0.5}
                value={accessory.value}
                maximumValue={60}
                trackStyle={customStyles2.track}
                thumbStyle={customStyles2.thumb}
                onValueChange={(value) => {
                    updateValue(accessory, value)
                }} />
        </View>
    );
}

export default TemperatureAdjustComponent;