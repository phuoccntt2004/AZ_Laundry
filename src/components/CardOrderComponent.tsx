import React from 'react';
import { Image, StyleProp, View, ImageStyle, TouchableOpacity } from 'react-native';
import { RowComponent, SectionComponent, ButtonComponent, TextComponent } from '../components';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';

interface Order {
    id: string;
    productName: string;
    status: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface Props {
    orders: Order[];
    onPress: () => void;
}

const CardOrderComponent: React.FC<Props> = ({ orders, onPress }) => {

    const renderOrders = () => {
        return orders.map((order) => (
            <SectionComponent key={order.id} styles={{ marginLeft: 30, marginRight: 30 }}>
                
                <TouchableOpacity onPress={onPress}>
                    <RowComponent justify="space-between" styles={{ alignItems: 'center' }}>
                        <TextComponent text={order.id} size={16} color={COLORS.BLUE_GRAY} />
                    </RowComponent>

                    <RowComponent justify="space-between" styles={{ marginTop: 10 }}>
                        <Image
                            source={{ uri: order.imageUrl || 'https://' }}
                            style={{ width: 80, height: 80, resizeMode: 'contain' } as StyleProp<ImageStyle>}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <TextComponent text={order.productName} size={16} color={COLORS.BLUE_GRAY} />
                            <TextComponent text="Giặt hấp" size={14} color={COLORS.GRAY_WHITE} />
                            <TextComponent text={order.status} size={14} color={COLORS.BLUE_GRAY} />
                            <TextComponent
                                text={`${order.price.toLocaleString('vi-VN')} VND`}
                                size={16}
                                color={COLORS.RED}
                            />
                        </View>
                        <TextComponent text={`SL: ${order.quantity}`} size={16} color={COLORS.BLUE_GRAY} />
                    </RowComponent>
                </TouchableOpacity>

                <RowComponent justify="flex-end" styles={{ marginTop: 15 }}>
                    <ButtonComponent
                        text="Đặt lại"
                        type="#00ADEF"
                        textColor={COLORS.AZURE_BLUE}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        styles={{
                            width: "30%",
                            marginRight: 10,
                            backgroundColor: COLORS.WHITE,
                            borderColor: COLORS.AZURE_BLUE,
                            borderWidth: 1
                        }} />
                    <ButtonComponent
                        text="Đánh giá"
                        type="#00ADEF"
                        styles={{ width: "30%" }}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }} />
                </RowComponent>
                
            </SectionComponent>
        ));
    };

    return <View>{renderOrders()}</View>;
};


export default CardOrderComponent;
