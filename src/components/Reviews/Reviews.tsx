
import { Review } from "../../DetailCar";
import "./Reviews.css"
import ReviewStars from "../ReviewStars/ReviewStars";

interface IReviews {
    item: Review
}

const Reviews: React.FC<IReviews> = (props) => {

    return (
        <section className="s-review">
            <img className="avatar" src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/profile-photos/wf34gsqw3image.png" alt="user photo" />
            <article>
                <div className="top">
                    <h3>{props.item.name}</h3>
                    <div>
                        <p className="date">{props.item.date.replace(/-/g, ".")}</p>
                        <ReviewStars stars={props.item.stars} />
                    </div>
                </div>
                <p>{props.item.text}</p>
            </article>

        </section>
    );
}

export default Reviews;