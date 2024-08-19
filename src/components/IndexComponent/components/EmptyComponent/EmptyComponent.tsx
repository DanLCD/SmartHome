import React from 'react';
import { Image, View, Text } from 'react-native';
import styles from './EmptyComponentStyle';
import { useTranslation } from 'react-i18next';

const EmptyComponent = () => {
    const { t } = useTranslation(['home']);
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./images/empty.png')} />
            <Text style={styles.heading}>{t('home:empty-title')}</Text>
            <Text style={styles.text}>{t('home:empty-description')}</Text>
        </View>
    )
}

export default EmptyComponent;
