import { useParams } from "react-router-dom";
import "./DetailCarPage.css"
import { Car } from "../../Car";
import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supaBaseClient";

const DetailCarPage = () => {
    const [detailData, setDetailData] = useState<Car | null>(null)
    const { id } = useParams()

    console.log({ detailData });


    // ! Daten anzeigen
    useEffect(() => {
        const getData = async () => {

            //     .single() //- So sage ich ich bekomme nur ein element zurück


            const data = await supabaseClient
                .from("vehicles")
                .select('*')
                .eq('id', id)
                .single();

            if (data.error) {
                console.error("Fehler beim Abrufen der Daten:", data.error);
            } else {
                setDetailData(data.data);
            }
        };

        getData();
    }, []);

    if (!detailData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>{detailData?.brand}- {detailData?.model}</h1>
        </>
    );
}

export default DetailCarPage;