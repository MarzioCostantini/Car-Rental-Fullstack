import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Car } from './Car';
import { useState } from 'react';
import { CarContext, ExtraCarInfoContext, FormDataContext, LoadingContext, SideBarContext, UserFilterContext } from './Context/context';
import Loading from './pages/Loading';
import { FormDataInterface } from './FromData';
import { ExtraCarInfoInterface } from './ExtraCarInfo';
import { UserFilterInterface } from './UserFilter';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './components/RegisterPage/RegistaPage';
import { UserProvider } from './Context/UserContext';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import DetailCarPage from './pages/DetailCarPage/DetailCarPage';
import UserProfile from './pages/UserProfil/UserProfil';
import Favorites from './pages/Favorites/Favorites';
import RentalPage from './pages/RentalPage/RentalPage';
import RentalHistory from './pages/RentalHistory/RentalHistory';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Confirmation from './pages/ConfirmationPage/Confirmation';
import LoginPrompt from './pages/LoginPrompt/LoginPrompt';


function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataInterface | null>(null);
  const [extraCarInfo, setExtraCarInfo] = useState<ExtraCarInfoInterface | null>(null);
  const [userFilter, setUserFilter] = useState<UserFilterInterface | null>(null);

  return (
    <UserProvider>

      <CarContext.Provider value={{ cars, setCars }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <SideBarContext.Provider value={{ sideBar, setSideBar }}>
            <FormDataContext.Provider value={{ formData, setFormData }}>
              <ExtraCarInfoContext.Provider value={{ extraCarInfo, setExtraCarInfo }}>
                <UserFilterContext.Provider value={{ userFilter, setUserFilter }}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <BrowserRouter>
                      <Header />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/car/:id" element={<DetailCarPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/loginprompt" element={<LoginPrompt />} />


                        <Route element={<PrivateRoute />}>
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/user-profile" element={<UserProfile />} />
                          <Route path="/rent/:id" element={<RentalPage />} />
                          <Route path="/my-bookings" element={<RentalHistory />} />
                          <Route path="/confirmation/:id" element={<Confirmation />} />
                        </Route>

                      </Routes>
                      <Footer />
                    </BrowserRouter>
                  )}
                </UserFilterContext.Provider>
              </ExtraCarInfoContext.Provider>
            </FormDataContext.Provider>
          </SideBarContext.Provider>
        </LoadingContext.Provider>
      </CarContext.Provider >

    </UserProvider>
  );
}

export default App;
