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

    console.log("dd", useUserContext());



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

    return (
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
                <button type="submit" className="button">Login</button>
                <Link to={"/register"}>Hier Regestrieren</Link>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
