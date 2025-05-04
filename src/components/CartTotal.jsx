import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';

const CartTotal = () => {
    const tip = 5;
    const { currency, getCartAmount } = useContext(ShopContext);
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
                    <p>{currency} {tip}</p>
                </div>
                <hr />
                <div>
                    <b>Total  </b>
                    <b>{currency} {getCartAmount() + 5 }</b>
                </div>
            </div>

        </div>
    )
}

export default CartTotal