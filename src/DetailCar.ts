export interface Review {
    id: string;
    vehicleID: string;
    name: string;
    text: string;
    stars: number;
    date: string;
    created_at: string;
}

// Interface für das Fahrzeug (Vehicle)
export interface VehicleDetail {
    id: string;
    availability: boolean;
    brand: string;
    carImg: string;
    colors: string;
    consumption: string;
    electricVehicle: boolean;
    fuel: string;
    gearType: string;
    horstpower: string;
    locations: string[];
    luggage: number;
    model: string;
    pricePerDay: number;
    ps: number;
    seats: number;
    vehicleType: string;
    year: number;

    
    // Array von Reviews
    reviews: Review[];
}