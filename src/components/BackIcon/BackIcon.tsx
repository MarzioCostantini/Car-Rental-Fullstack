import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


const BackIcon = () => {
    let navigate = useNavigate();


    return (
        <Link onClick={() => navigate(-1)} to="/" className="backbtn" >
            <IoIosArrowBack />
            Back
        </Link>
    );
}

export default BackIcon;