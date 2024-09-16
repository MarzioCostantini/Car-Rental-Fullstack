import { useState } from 'react';
import './LoginPage.css';
import supabaseClient from '../../lib/supaBaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';


const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    const userContext = useUserContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            const authResponse = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (authResponse.error) {
                console.error('Fehler bei der Anmeldung:', authResponse.error.message);
            } else {
                alert('Erfolgreich angemeldet');
                console.log("authResponse", authResponse);
                console.log("authResponse.data.user", authResponse.data.user);

                userContext?.setUser(authResponse.data.user);
                setTimeout(() => navigate('/'), 1000);

                console.log(userContext?.user);


            }

        } else {
            setMessage('Bitte alle Felder ausfüllen.');
        }
    };


    const handleResetPassword = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter your email address to reset your password")
            return
        }


        const resetResponse = await supabaseClient.auth.resetPasswordForEmail(email);

        // ? in error steckt die Errormessage, wenn das Zurücksetzen nicht geklappt hat.
        if (resetResponse.error) {
            alert("Error by Reseting the Password")
            return;
        }

        if (resetResponse.data) {
            alert('Password reset link has been sent to your email.');
        }
    };

    return (
        <>
            <div className="container">
                <h2 className="header">Login</h2>
                <form onSubmit={handleSubmit} className="form-log">
                    <div className="formGroup">
                        <label className="label">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">Passwort:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <button type="submit" className="button login-btn">Login</button>
                    <Link className='reg' to={"/register"}>No Account? Register Here</Link>
                    <button className='btn-alt' onClick={handleResetPassword}>forgot password?</button>
                    {message && <p className="message">{message}</p>}
                </form>



            </div>
            <div className='container'>
                <h2 className="header">Create your own Account or Login with:</h2>
                <p className='expl'>In this account, some bookings have already been stored. To view all the details, you can either check this account or alternatively create your own account to make and manage your bookings.</p>

                <p>Email: <strong>a@admin.com</strong> </p>
                <p>Password: <strong>123456</strong> </p>

            </div>
        </>
    );
};

export default LoginPage;
