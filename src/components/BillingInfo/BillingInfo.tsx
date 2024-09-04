import "./BillingInfo.css"

const BillingInfo = () => {
    return (

        <section className="billing-info">
            <div className="billing-info-header">
                <div>
                    <h2>Billing Info</h2>
                    <p>Please enter your billing info</p>
                </div>

                <span>Step 1 of 4</span>
            </div>
            <form className="billing-info-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="Phone number" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Address" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Town / City</label>
                    <input type="text" id="city" placeholder="Town or city" />
                </div>
            </form>
        </section>

    );
}

export default BillingInfo;