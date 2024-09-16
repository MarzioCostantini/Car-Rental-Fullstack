import { useContext, useEffect, useState } from "react";
import { ExtraCarInfoContext, UserFilterContext, FormDataContext } from "../../Context/context";
import "./FilterBar.css";
import { UserFilterInterface } from "../../UserFilter";

const FilterBar = () => {
    const filterOption = useContext(ExtraCarInfoContext);
    const filterData = useContext(UserFilterContext);
    const formData = useContext(FormDataContext);

    const isLoading = !filterOption || !filterOption.extraCarInfo || !filterOption.extraCarInfo.types || !filterOption.extraCarInfo.colors || !filterOption.extraCarInfo.drivesType || !filterOption.extraCarInfo.gear;

    // Initialisiere den Zustand direkt beim Laden
    const [priceRange, setPriceRange] = useState<number>(filterData?.userFilter?.priceDay || 450);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(filterData?.userFilter?.type || []);
    const [selectedColors, setSelectedColors] = useState<string[]>(filterData?.userFilter?.colors || []);
    const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>(filterData?.userFilter?.drivesType || []);
    const [selectedGears, setSelectedGears] = useState<string[]>(filterData?.userFilter?.gear || []);

    // sepichert in kontext
    useEffect(() => {
        const newData: UserFilterInterface = {
            type: selectedTypes,
            colors: selectedColors,
            gear: selectedGears,
            drivesType: selectedDriveTypes,
            priceDay: priceRange
        };

        filterData?.setUserFilter(newData);
    }, [priceRange, selectedTypes, selectedColors, selectedDriveTypes, selectedGears]);


    // reset vopn filter
    useEffect(() => {
        if (filterOption && filterOption.extraCarInfo) {
            setSelectedTypes(filterOption.extraCarInfo.types);
            setSelectedColors(filterOption.extraCarInfo.colors);
            setSelectedDriveTypes(filterOption.extraCarInfo.drivesType);
            setSelectedGears(filterOption.extraCarInfo.gear);
            setPriceRange(450);
        }
    }, [formData?.formData?.picUpLocation]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(event.target.value));
    };

    const handleCheckboxChange = (setSelectedFunction: React.Dispatch<React.SetStateAction<string[]>>, currentSelection: string[]) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;

        // checkt ob es bereits nur eine ausgewählte Option gibt
        if (!checked && currentSelection.length === 1) {
            alert("Mindestens eine Option muss ausgewählt bleiben.");
            return;
        }

        setSelectedFunction(prevSelected =>
            checked ? [...prevSelected, id] : prevSelected.filter(item => item !== id)
        );
    };

    return (
        <aside className="filter-bar">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <section>
                        <h3>Type</h3>
                        {filterOption?.extraCarInfo?.types.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedTypes.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedTypes, selectedTypes)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Color</h3>
                        {filterOption?.extraCarInfo?.colors.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedColors.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedColors, selectedColors)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Drive Type</h3>
                        {filterOption?.extraCarInfo?.drivesType.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedDriveTypes.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedDriveTypes, selectedDriveTypes)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Gear</h3>
                        {filterOption?.extraCarInfo?.gear.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedGears.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedGears, selectedGears)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Price</h3>
                        <input
                            type="range"
                            id="priceRange"
                            name="priceRange"
                            min="0"
                            max="450"
                            step={10}
                            value={priceRange}
                            onChange={handlePriceChange}
                        />
                        <span>Max. ${priceRange.toFixed(2)} / Day</span>
                    </section>
                </>
            )}
        </aside>
    );
};

export default FilterBar;
