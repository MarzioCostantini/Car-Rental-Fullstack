
interface VehicleDetail {
    id: string;
    brand: string;
    model: string;
    year: number;
    vehicleType: string;
    colors: string; 
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
  }
  
  export interface SingleRentalDetail {
    id: string;
    user_id: string;
    car_id: string;
    user_name: string;
    picup_location: string;
    picup_date: string;
    picup_time: string;
    dropoff_location: string;
    dropoff_date: string;
    dropoff_time: string;
    total_days: number;
    total_price: number;
    payment: string;
    paid: boolean;
    adress: string;
    town: string;
    phone_number: number;
    marketing_checked: boolean;
    terms_checked: boolean;
    created_at: string;
    vehicles: VehicleDetail[] | VehicleDetail; 
  }
  