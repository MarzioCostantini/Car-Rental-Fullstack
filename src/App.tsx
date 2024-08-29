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
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
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
