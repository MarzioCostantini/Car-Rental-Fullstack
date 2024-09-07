import { Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
    return (
        <div className="confirmation">
            <div className="container">
                <div className="header">
                    <h1>Thank You for Your Booking!</h1>
                    <p>We have successfully received your booking. You will receive a confirmation email shortly.</p>
                </div>
                <div className="card">
                    <div className="summary">
                        <h2>Booking Summary</h2>
                        <div className="details">
                            <p>Vehicle: Audi A4</p>
                            <p>Pickup Location: Berlin</p>
                            <p>Pickup Date: 01.05.2024 - 22:45</p>
                            <p>Dropoff Location: Berlin</p>
                            <p>Dropoff Date: 01.08.2024 - 00:47</p>
                            <p>Total Price: $250</p>
                        </div>
                    </div>
                    <div className="footer">
                        <Link to="/my-bookings">Go to my Bookings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
