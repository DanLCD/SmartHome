import React from 'react';
import { merge } from 'lodash';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import icons from './RoomIcons';
import style, { activeStyles } from './RoomsComponentStyle';
import { PlacePayload } from '@/components/PlacesComponent/PlacesComponent';
import { useTranslation } from 'react-i18next';

type Props = {
    room: PlacePayload,
    roomStatus: string[],
    onPress: () => void
};

const RoomBox = ({ room, roomStatus, onPress }: Props) => {
    const { t } = useTranslation(['home']);

    const defaultIcon = require('./images/bed-active.png');
    const icon = room.icon ? room.icon : '~default';
    const iconName = room.isactive ? 'active' : 'deactive';
    const styles = room.isactive ? merge({}, style, activeStyles) : style;

    return (
        <TouchableOpacity onPress={onPress} style={styles.box}>
            <View >
                <Text style={styles.text}>
                    {room.name}
                </Text>
                <Image style={styles.image} source={icons[icon][iconName]} />
                <Text style={styles.quickInfo}>{roomStatus.length} Accessor{roomStatus.length === 1 ? 'y' : 'ies'} Installed</Text>
                <Text style={styles.accessoriesInfo}>{roomStatus.join(', ')}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default RoomBox;