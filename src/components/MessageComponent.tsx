import { View, Text } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import COLORS from './../assets/colors/Colors';
import ColumnComponent from './ColumnComponent';

interface Props {
    text?: string;
    colorText?: string;
    backgroundColor?: string;
    timeCurrent?: string;
}
const MessageComponent = (props: Props) => {
    const { text, colorText, backgroundColor ,timeCurrent} = props;
    return (
        <ColumnComponent>
            <TextComponent text={timeCurrent} color={COLORS.HEX_LIGHT_GRAY} />
            <View style={{ backgroundColor: backgroundColor, padding: 15, maxWidth: 170, borderRadius: 25 }}>
                <TextComponent color={colorText} text={text} />
            </View>
        </ColumnComponent>
    );
};

export default MessageComponent;
