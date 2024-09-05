import { useContext, useEffect, useState } from "react";
import Arrows from "../../assets/svg/Arrows";
import "./Form.css";
import { FormDataContext } from "../../Context/context";
import { checkDates } from "../Function/CheckDate";
import Loader from "../Loader/Loader";

const Form = () => {
    const formData = useContext(FormDataContext);
    const [locData, setLocData] = useState<string[]>([]);


    if (!formData)
        return <Loader />

    // Fetch Locations
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleLocations.json")
            .then(res => res.json())
            .then(data => setLocData(data))
            .catch(err => console.error(err));
    }, []);

    // Überprüfen der Daten nach Änderungen
    useEffect(() => {
        if (formData?.formData?.picUpDate && formData?.formData?.dropOffDate) {
            const isValid = checkDates(formData.formData.picUpDate, formData.formData.dropOffDate, formData);
            if (isValid) {
                console.log("Daten sind gültig");
            }
        }
    }, [formData?.formData?.picUpDate, formData?.formData?.dropOffDate]);

    return (
        <section className="form">
            <article>
                <h5>Pickup</h5>
                <div className="inner">
                    <div>
                        <label htmlFor="loc">Location:</label>
                        <select
                            name="loc"
                            id="loc"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => formData.setFormData({
                                ...formData.formData,
                                picUpLocation: e.target.value
                            })}
                            value={formData.formData?.picUpLocation || ""}
                        >
                            <option value="" disabled hidden>Please select</option>
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => formData.setFormData({
                                ...formData.formData,
                                picUpDate: e.target.value
                            })}
                            type="date"
                            id="date"
                            value={formData.formData?.picUpDate || ""}
                        />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => formData.setFormData({
                                ...formData.formData,
                                picUpTime: e.target.value
                            })}
                            type="time"
                            id="time"
                            value={formData.formData?.picUpTime || ""}
                        />
                    </div>
                </div>
            </article>
            <div>
                <Arrows />
            </div>
            <article>
                <h5>Drop-Off</h5>
                <div className="inner">
                    <div>
                        <label htmlFor="loc">Location:</label>
                        <select name="loc" id="loc" disabled value={formData.formData?.picUpLocation || ""}>
                            <option value="" disabled hidden>Please select</option>
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => formData.setFormData({
                                ...formData.formData,
                                dropOffDate: e.target.value
                            })}
                            type="date"
                            id="date"
                            value={formData.formData?.dropOffDate || ""}
                        />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => formData.setFormData({
                                ...formData.formData,
                                dropOffTime: e.target.value
                            })}
                            type="time"
                            id="time"
                            value={formData.formData?.dropOffTime || ""}
                        />
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Form;
