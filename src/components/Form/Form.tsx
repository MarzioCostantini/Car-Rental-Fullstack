import { useContext, useEffect, useState } from "react";
import Arrows from "../../assets/svg/Arrows";
import "./Form.css";
import { FormDataContext } from "../../Context/context";
import { FormDataInterface } from '../../FromData';

const Form = () => {
    const formContext = useContext(FormDataContext);

    const [locData, setLocData] = useState<string[]>([]);

    const [picLoc, setPicLoc] = useState<string>(formContext?.formData?.picUpLocation || "");
    const [picDate, setPicDate] = useState<string>(formContext?.formData?.picUpDate || "");
    const [dropDate, setDropDate] = useState<string>(formContext?.formData?.dropOffDate || "");
    const [picTime, setPicTime] = useState<string>(formContext?.formData?.picUpTime || "");
    const [dropTime, setDropTime] = useState<string>(formContext?.formData?.dropOffTime || "");

    // Fetch Locations
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleLocations.json")
            .then(res => res.json())
            .then(data => setLocData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {

        // Checkt ob datum hinter abgabe vor den aboldatum ist
        let date1 = new Date(picDate || "");
        let date2 = new Date(dropDate || "");

        let DifferenceInTime =
            date2.getTime() - date1.getTime();


        let DifferenceInDays =
            Math.round
                (DifferenceInTime / (1000 * 3600 * 24));

        if (DifferenceInDays < 0) {
            alert("Drop-off date cannot be before the pick-up date"); setPicDate("")
            setDropDate("")
            setPicDate("")
            return
        }

        if (DifferenceInDays === 0) {
            alert("Mindestbuchzeit muss 1 Tag sein")
            setDropDate("")
            setPicDate("")
            return
        }


        const formDataInput: FormDataInterface = {
            picUpLocation: picLoc,
            picUpDate: picDate,
            picUpTime: picTime,
            dropOffLocation: picLoc, //same wie picLoaction
            dropOffDate: dropDate,
            dropOffTime: dropTime,
        };

        formContext?.setFormData(formDataInput);
    }, [picLoc, picDate, dropDate, picTime, dropTime]);

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
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPicLoc(e.target.value)}
                            value={picLoc}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPicDate(e.target.value)}
                            type="date"
                            id="date"
                            value={picDate}
                        />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPicTime(e.target.value)}
                            type="time"
                            id="time"
                            value={picTime}
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
                        <select name="loc" id="loc" disabled value={picLoc}>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDropDate(e.target.value)}
                            type="date"
                            id="date"
                            value={dropDate}
                        />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDropTime(e.target.value)}
                            type="time"
                            id="time"
                            value={dropTime}
                        />
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Form;
