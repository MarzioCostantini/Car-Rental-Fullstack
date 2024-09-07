import "./RentalInfo.css";
import { FormDataInterface } from '../../FromData';
import { useEffect, useState } from "react";
import { checkDates } from "../Function/CheckDate";
import Loader from "../Loader/Loader";

interface IFormData {

    formData: null | FormDataInterface,
    setFormData: (value: FormDataInterface) => void,
}

interface IChefForm {
    formData: IFormData | undefined
}

const RentalInfo: React.FC<IChefForm> = ({ formData }) => {
    const [locData, setLocData] = useState<string[]>([]);


    if (!formData) {
        return <Loader />;
    }

    // Location fetch
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleLocations.json")
            .then(res => res.json())
            .then(data => setLocData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const picUpDate = formData.formData?.picUpDate;
        const dropOffDate = formData.formData?.dropOffDate;

        // Überprüfen, ob beide Daten vorhanden sind
        if (picUpDate && dropOffDate) {
            const isValid = checkDates(picUpDate, dropOffDate, formData);
            if (isValid) {
                console.log("Daten sind gültig");
            }
        }

    }, [formData.formData?.picUpDate, formData.formData?.dropOffDate]);


    console.log("RentalInof", {});



    return (
        <section className="rental-info">
            <div className="rental-info-header">
                <div>
                    <h2>Rental Info</h2>
                    <p>Please select your rental date</p>
                </div>

                <span>Step 2 of 4</span>
            </div>
            <form className="rental-info-form">
                {/* Pick-Up Section */}
                <div className="form-section">
                    <div className="section-header">
                        <label htmlFor="pickup">Pick – Up</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup-location">Locations</label>
                        <select id="pickup-location" value={formData.formData?.picUpLocation}
                            onChange={(e) => formData.setFormData({
                                ...formData.formData,
                                picUpLocation: e.target.value
                            })}
                        >
                            <option value="" disabled selected>Please select</option>
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pickup-date">Date</label>
                        <input
                            value={formData.formData?.picUpDate || ""}
                            onChange={(e) => formData.setFormData({
                                ...formData.formData,
                                picUpDate: e.target.value
                            })}
                            type="date"
                            id="pickup-date"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup-time">Time</label>
                        <input
                            value={formData.formData?.picUpTime || ""}
                            onChange={(e) => formData.setFormData({
                                ...formData.formData,
                                picUpTime: e.target.value
                            })}
                            type="time"
                            id="pickup-time"
                        />
                    </div>
                </div>

                {/* Drop-Off Section */}
                <div className="form-section">
                    <div className="section-header">
                        <label htmlFor="dropoff">Drop – Off</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-location">Locations</label>
                        <select id="dropoff-location" value={formData.formData?.picUpLocation}
                            disabled
                        >
                            <option value="" disabled selected>Please select</option>^
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-date">Date</label>
                        <input
                            value={formData.formData?.dropOffDate || ""}
                            onChange={(e) => formData.setFormData({
                                ...formData.formData,
                                dropOffDate: e.target.value
                            })}
                            type="date"
                            id="dropoff-date"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-time">Time</label>
                        <input
                            value={formData.formData?.dropOffTime || ""}
                            onChange={(e) => formData.setFormData({
                                ...formData.formData,
                                dropOffTime: e.target.value
                            })}
                            type="time"
                            id="dropoff-time"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default RentalInfo;
