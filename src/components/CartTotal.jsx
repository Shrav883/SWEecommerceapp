import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { currency, online_fee, getCartAmount } = useContext(ShopContext);
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div>
                <div>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}</p>
                </div>
                <hr />
                <div>
                    <p>Online Fee</p>
                    <p>{currency} {online_fee}</p>
                </div>
                <hr />
                <div>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + online_fee}</b>
                </div>
            </div>

        </div>
    )
}

export default CartTotal