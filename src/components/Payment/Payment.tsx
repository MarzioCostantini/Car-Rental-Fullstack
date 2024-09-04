import { useState } from "react";
import "./Payment.css"

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
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
                            value="credit-card"
                            checked={selectedMethod === 'credit-card'}
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
                            value="paypal"
                            checked={selectedMethod === 'paypal'}
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
                            value="bitcoin"
                            checked={selectedMethod === 'bitcoin'}
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