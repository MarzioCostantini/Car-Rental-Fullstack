
import { useContext, useEffect, useState } from "react";
import Search from "../../assets/svg/Search";
import "./Searchbar.css"
import { Car } from "../../Car";
import { CarContext } from "../../Context/context";
import { Link, useLocation } from "react-router-dom";

const Searchbar = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const [results, setResults] = useState<Car[] | undefined>(undefined)

    const cardata = useContext(CarContext);
    const location = useLocation()


    useEffect(() => {
        if (searchInput) {
            const findCars = cardata?.cars?.filter((item) =>
                item.model.toLowerCase().includes(searchInput.toLowerCase())
            ) || [];
            setResults(findCars)
        }


    }, [searchInput])


    useEffect(() => {
        setSearchInput("")
    }, [location])


    return (
        <section className="searchbar">
            <Search />
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} type="text" value={searchInput} placeholder="Search something here" />
            {searchInput && (
                <div className="search-results">
                    {searchInput && results?.length === 0 && (
                        <div>No results</div>
                    )}
                    <ul>

                        {results?.map((item, index) => (
                            <Link to={`/car/${item.id}`} key={index}>
                                <img src={item.carImg} alt="car" />
                                <p>{item.brand} - {item.model}</p>
                            </Link>
                        ))}
                    </ul>

                </div>
            )}

        </section>
    );
}

export default Searchbar;