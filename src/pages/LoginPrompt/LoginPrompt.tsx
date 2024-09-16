import React from 'react';
import './LoginPrompt.css'; // Importiere die Styles für die Komponente
import { Link } from 'react-router-dom';

const LoginPrompt: React.FC = () => {
    return (
        <div className="login-prompt-wr">
            <div className="login-prompt-box">
                <h2>You must be logged in to use this feature</h2>
                <p>You cannot perform this action unless you are logged in. Please create an account or log in.</p>
                <div className="login-prompt-buttons">
                    <Link to={"/login"} className="btn-main">Login</Link>
                    <Link to={"/register"} className="btn-alt">Create Account</Link>
                </div>

            </div>
        </div>
    );
};

export default LoginPrompt;
