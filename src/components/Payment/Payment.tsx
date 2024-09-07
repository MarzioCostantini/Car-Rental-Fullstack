import "./Payment.css"

interface IPaymentProps {
    payment: string
    setPayment: (value: string) => void;
}


const Payment: React.FC<IPaymentProps> = (props) => {


    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setPayment(event.target.value);
    };

    return (<section>
        <div className="payment-method">
            <div className="payment-method-header">
                <div>
                    <h2>Payment Method</h2>
                    <p>Please enter your payment method</p>
                </div>
                <span>Step 3 of 4</span>
            </div>
            <form className="payment-method-form">
                {/* Credit Card */}
                <div className="payment-option">
                    <label className="payment-option-header">
                        <input
                            type="radio"
                            name="payment-method"
                            value="Credit Card"
                            checked={props.payment === 'Credit Card'}
                            onChange={handleMethodChange}
                        />
                        <span>Credit Card</span>
                        <div className="payment-icons">

                            <img src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/Sonstiges/Visa.png" alt="Mastercard" />
                        </div>
                    </label>
                </div>

                {/* PayPal */}
                <div className="payment-option">
                    <label className="payment-option-header">
                        <input
                            type="radio"
                            name="payment-method"
                            value="PayPal"
                            checked={props.payment === 'PayPal'}
                            onChange={handleMethodChange}
                        />
                        <span>PayPal</span>
                        <img src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/Sonstiges/PayPal.png" alt="PayPal" className="payment-logo" />
                    </label>
                </div>

                {/* Bitcoin */}
                <div className="payment-option">
                    <label className="payment-option-header">
                        <input
                            type="radio"
                            name="payment-method"
                            value="Bitcoin"
                            checked={props.payment === 'Bitcoin'}
                            onChange={handleMethodChange}
                        />
                        <span>Bitcoin</span>
                        <img src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/Sonstiges/Bitcoin.png" alt="Bitcoin" className="payment-logo" />
                    </label>
                </div>
            </form>
        </div>
    </section>);
}

export default Payment;