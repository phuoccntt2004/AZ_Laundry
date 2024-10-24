import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components'
import { CartModel } from '../../model/cart_model'
import cartAPI from '../../apis/cartAPI'
import { authSelector } from '../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import CardProductOfProductType from '../../components/CardProductOfProductTypeComponent'
import * as Burnt from 'burnt'
import COLORS from '../../assets/colors/Colors'
import { FONTFAMILY } from '../../../assets/fonts'

const CartScreen = () => {
    const [carts,setCarts]= useState<CartModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);
    const user = useSelector(authSelector)
    const updateData = async (data: CartModel, check: boolean) => {
        const api = `/update-cart/${data._id}`
        try {
            const res = await cartAPI.HandleCart(
                api,
                {
                    product_quantity: check ? data.product_quantity + 1 : data.product_quantity - 1,
                    cart_subtotal: check ? data.id_product.product_price * (data.product_quantity + 1) : data.id_product.product_price * (data.product_quantity - 1)
                },
                'put',
            );
            

            setLoading(false);
        } catch (error) {
            setLoading(false);

            console.log(error);
            
        }
    }
    const deleteData = async (id: any) => {
        const api = `/delete-cart/${id}`
        try {
            const res = await cartAPI.HandleCart(
                api,
                {},
                'delete',
            );
            if(res){
                setLoading(false);
                Burnt.toast({
                    title: 'Xóa thành công',
                    
                });
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const getDataCarts = async () => {
        try {
            const res:any = await cartAPI.HandleCart(`/get-cart?id_user=${user.id}`)
            const data:CartModel[] = res.data
            setCarts(data)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching shop: ', error);
            setLoading(false);
      }
    };

    const handlePlus = async (data: CartModel) => {
        updateData(data,true)
    }
    const handleMinus = async (data: CartModel) => {
        if(data.product_quantity>1){
            updateData(data,false)
        }else{
            deleteData(data._id)
        }
    }
    const totalCartSubtotal = carts.reduce((total, item) => {
        return total + item.cart_subtotal;
      }, 0);
    useEffect(()=>{
        getDataCarts()
        if(carts.length>0){
            totalCartSubtotal         
        }
    },[carts])
    return (
        <View style={{backgroundColor:COLORS.WHISPER_GRAY,position:'relative', flex:1}}>
            <HeaderComponent title={`Giỏ hàng`}  />
            <SectionComponent styles={{marginTop:15}}>
                <CardProductOfProductType onPressPlus={handlePlus} onPressMinus={handleMinus} isCart={true} carts={carts} isLoading={loading}/>
            </SectionComponent>
            <View style={{backgroundColor:COLORS.WHITE, position:'absolute', bottom:0, left:0, right:0, paddingTop:15}}>
                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent text={'Tổng đơn'} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_semibold}/>
                        <TextComponent text={`${totalCartSubtotal} vnđ`} color={COLORS.RED} font={FONTFAMILY.montserrat_semibold}/>
                    </RowComponent>                
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent type='#00ADEF' text='Thanh toán ngay'/>
                </SectionComponent>
            </View>
        </View>
    )
}

export default CartScreen