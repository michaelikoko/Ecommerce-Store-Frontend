import StripeCheckout from "react-stripe-checkout"
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveOrder } from "../features/order/orderSlice";

export default function StripeButton()
{
    const dispatch = useDispatch()
    const { cartItemsCost } = useSelector(store => store.cart)
    const { user } = useSelector(store => store.login)
    const publishableKey = 'pk_test_51LLY9IHL1Gq5hhOIvyqbTD9taThvdUZihe5HLXEjrE0bUmkJx04T8GbibT5HDXmQAFza4STFV6jDeyXxRAcs0x2p00HOc4ZTTR';

    function onToken(token) {
        console.log(token);
        dispatch(saveOrder())
    };

    return(
        <StripeCheckout
            name='Amp Electronics'
            billingAddress
            shippingAddress
            description={"Test Card Num: 4242 4242 4242 4242"}
            amount={cartItemsCost * 100}
            panelLabel='Pay '
            token={onToken}
            stripeKey={publishableKey}
            currency="NGN"
            email={user.email}
        >
            <Button variant="secondary" className="text-white w-100 mt-2">
                Checkout
            </Button>
        </StripeCheckout>
    )
}

