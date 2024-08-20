import React from 'react';
import { Image, View, Text } from 'react-native';
import styles from './EmptyComponentStyle';
import { useTranslation } from 'react-i18next';

export default ({ status }: { status: string }) => {
    const { t } = useTranslation(['home']);
    let title = status === 'CONNECTED' ? t('home:empty-title') : (status === 'CONNECTING' ? t('home:connecting-title') : t('home:disconnected-title'));
    let description = status === 'CONNECTED' ? t('home:empty-description') : (status === 'CONNECTING' ? t('home:connecting-description') : t('home:disconnected-description'));
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./images/empty.png')} />
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
        </View>
    )
};
