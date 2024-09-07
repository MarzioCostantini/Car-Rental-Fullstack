import './Confirmation.css';


interface IConfirmtion {
    setMarketingChecked: (value: boolean) => void;
    setTermsChecked: (value: boolean) => void;
    marketingChecked: boolean;
    termsChecked: boolean;
}

const Confirmation: React.FC<IConfirmtion> = ({ setMarketingChecked, setTermsChecked, marketingChecked, termsChecked }) => {


    return (
        <section className="confirmation-container">
            <section>
                <div>
                    <h2>Confirmation</h2>
                    <p>We are getting to the end. Just a few clicks and your rental is ready!</p>
                </div>

                <span className="step-info">Step 4 of 4</span>
            </section>



            <div className="checkbox-container">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={marketingChecked}
                        onChange={() => setMarketingChecked(!marketingChecked)}
                    />
                    I agree with sending marketing and newsletter emails. No spam, promised!
                </label>
            </div>

            <div className="checkbox-container">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={termsChecked}
                        onChange={() => setTermsChecked(!termsChecked)}
                    />
                    I agree with our terms and conditions and privacy policy.
                </label>
            </div>



            <div className="data-security">
                <img src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/Sonstiges/ic-security-safety.png" alt="" />
                <p>All your data are safe</p>
                <p>We are using the most advanced security to provide you the best experience ever.</p>
            </div>
        </section>
    );
};

export default Confirmation;
