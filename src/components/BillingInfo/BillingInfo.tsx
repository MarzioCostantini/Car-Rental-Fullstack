import "./BillingInfo.css"

interface IBilling {
    userName: (value: string) => void;
    phone: (value: string) => void;
    adress: (value: string) => void;
    city: (value: string) => void;
}

const BillingInfo: React.FC<IBilling> = ({ userName, phone, adress, city }) => {

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
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => userName(e.target.value)} type="text" id="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => phone(e.target.value)} type="tel" id="phone" placeholder="Phone number" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => adress(e.target.value)} type="text" id="address" placeholder="Address" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Town / City</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => city(e.target.value)} type="text" id="city" placeholder="Town or city" />
                </div>
            </form>
        </section>

    );
}

export default BillingInfo;