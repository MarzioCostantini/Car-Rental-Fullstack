import { useEffect, useState } from "react"
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import "./ReviewStars.css"

interface IStars {
    stars: number
}

const ReviewStars: React.FC<IStars> = (props) => {
    const [restStars, setRestStars] = useState<number | null>(null)


    let maxStars: number = 5

    useEffect(() => {

        if (props.stars <= 4) {
            const rest = maxStars - props.stars
            setRestStars(rest)
        }

    }, [props])

    return (
        <div className="stars-rev">
            {
                Array(props.stars).fill(0).map((_, index) => (
                    <span key={index}><IoIosStar /></span>
                ))
            }

            {/* Restlichen ster wenn nicht voll sind */}
            {
                props.stars < 5 && Array(restStars).fill(0).map((_, index) => (
                    <span key={index}><IoIosStarOutline /></span>
                ))
            }
        </div>


    );
}

export default ReviewStars;