import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { merge } from 'lodash';
import styles, { styleActive } from './AccessoriesComponentStyle';
import { normalizeValue } from '../../../services/commons';

type Props = {
    onPress: () => void,
    isactive: boolean,
    value: any,
    name: string
};

export const AccessoriesComponent = ({ isactive, onPress, value, name }: Props) => {
    let style = isactive ? merge({}, styles, styleActive) : styles;
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={style.container}>
                <Text style={style.value}>{normalizeValue(value)}</Text>
                <Text style={style.name}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}