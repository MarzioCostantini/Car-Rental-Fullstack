import { useContext, useEffect } from "react"
import { CarContext, ExtraCarInfoContext } from "../Context/context";
import supabaseClient from "../lib/supaBaseClient";
import Loader from "./Loader/Loader";

const FetchData = () => {
    // Holt sich den Cars context
    const cardata = useContext(CarContext);
    const extraCarInfo = useContext(ExtraCarInfoContext);



    if (!cardata) {
        return <Loader />;
    }



    // ! Supabase Autos holen
    useEffect(() => {
        const getData = async () => {
            let getDataRespons = await supabaseClient.from("vehicles").select("*")

            if (getDataRespons.error) {
                console.log("Error bei daten ziehen", getDataRespons.error);

            } else if (getDataRespons.data) {
                cardata.setCars(getDataRespons.data)
            }



        }
        getData()
    }, [])


    // ! Zusatzinfos Fetchen wir Auto antrieb
    // Zusatzinfos fetchen
    useEffect(() => {
        const fetchExtraCarInfo = () => {
            Promise.all([
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleTypes.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleColors.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehiclesGears.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleFuels.json').then(res => res.json())
            ])
                .then(([types, colors, gear, drivesType]) => {
                    extraCarInfo?.setExtraCarInfo({
                        types: types,
                        colors: colors,
                        gear: gear,
                        drivesType: drivesType,
                        priceDay: 0
                    });
                })
                .catch(error => console.error("Fehler beim Fetchen der Zusatzinfos:", error));
        };

        fetchExtraCarInfo();
    }, []);


    return (


        <div>
            <Loader />
        </div>
    );
}

export default FetchData;