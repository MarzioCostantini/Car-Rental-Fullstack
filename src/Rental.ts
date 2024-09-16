// Interface for the 'vehicles' table
export interface VehicleDetail {
    id: string;
    brand: string;
    model: string;
    year: number;
    vehicleType: string;
    colors: string[];
    locations: string[];
    pricePerDay: number;
    availability: boolean;
    electricVehicle: boolean;
    carImg: string;
    seats: number;
    luggage: number;
    horstpower: string;
    ps: number;
    consumption: string;
    fuel: string;
    gearType: string;
    created_at: string;
}

// Interface for the 'rental' table
export interface RentalDetail {
    id: string;
    user_id: string;
    car_id: string;
    picup_location: string;
    picup_date: string;
    picup_time: string;
    dropoff_location: string;
    dropoff_date: string;
    dropoff_time: string;
    created_at: string;
    total_days: number;
    total_price: number;
    vehicles: VehicleDetail[] | VehicleDetail;
}
