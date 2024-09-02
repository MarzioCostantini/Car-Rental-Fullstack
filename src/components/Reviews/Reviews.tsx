
import { Review } from "../../DetailCar";
import "./Reviews.css"
import ReviewStars from "../ReviewStars/ReviewStars";

interface IReviews {
    item: Review
}

const Reviews: React.FC<IReviews> = (props) => {

    return (
        <section>
            <img className="avatar" src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/profile-photos/wf34gsqw3image.png" alt="user photo" />
            <div>
                <h2>{props.item.name}</h2>
                <div>
                    <p>{props.item.date.replace(/-/g, ".")}</p>
                    <ReviewStars stars={props.item.stars} />
                </div>
                <p>{props.item.text}</p>
            </div>
        </section>
    );
}

export default Reviews;