import { useEffect, useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import "./ReviewStars.css";

interface IStars {
    stars: number | null; // Hier anpassen
}

const ReviewStars: React.FC<IStars> = (props) => {
    const [restStars, setRestStars] = useState<number>(0);

    const maxStars: number = 5;

    useEffect(() => {
        if (props.stars !== null && props.stars < maxStars) {
            const rest = maxStars - props.stars;
            setRestStars(rest);
        } else {
            setRestStars(0);
        }
    }, [props.stars]);

    console.log("rest", restStars);

    const stars = props.stars ?? 0; // Fallback auf 0, wenn stars null gestzts ist

    return (
        <div className="stars-rev">
            {stars > 0 && restStars >= 0 && (
                <>
                    {Array(stars).fill(0).map((_, index) => (
                        <span key={index}><IoIosStar /></span>
                    ))}

                    {restStars > 0 && Array(restStars).fill(0).map((_, index) => (
                        <span key={index}><IoIosStarOutline /></span>
                    ))}
                </>
            )}
        </div>
    );
}

export default ReviewStars;
