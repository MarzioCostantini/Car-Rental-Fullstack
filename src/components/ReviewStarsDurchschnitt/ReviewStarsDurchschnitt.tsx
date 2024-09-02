import { useEffect, useState } from "react";
import { Review } from "../../DetailCar";
import ReviewStars from "../ReviewStars/ReviewStars";
import "./ReviewStarsDurchschnitt.css"

interface IStarDurch {
    stars: Review[]
}

const ReviewStarsDurchschnitt: React.FC<IStarDurch> = ({ stars }) => {
    const [durchschnitt, setDurchschnitt] = useState<number | null>(null)
    const [rating, setRating] = useState<number[]>([])
    console.log("s", stars);


    // extrahiert alle stars in ein neues Array
    useEffect(() => {
        let itemStar = stars.map(item => item.stars)
        setRating(itemStar)

    }, [stars])

    // Berrechnet durchschnitt
    useEffect(() => {
        const sum = rating.reduce((a, b) => a + b, 0)
        const avg = (Math.round(sum / rating.length))

        setDurchschnitt(avg)

    }, [rating])


    console.log({ durchschnitt });



    return (
        <div className="stars">
            <ReviewStars stars={durchschnitt} />
            <p>{stars.length} Reviewer</p>

        </div>
    );
}

export default ReviewStarsDurchschnitt;