import React, { useState } from 'react';
import './RegistaPage.css';
import supabaseClient from '../../lib/supaBaseClient';

const RegisterPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [profilPhoto, setProfilPhoto] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');


    // ! Profilbild Hochladen Funktion
    const uploadPhoto = async () => {
        if (!profilPhoto) return null;

        setLoading(true);

        const fileName = profilPhoto.name;

        // Der Upload erfolgt direkt im root des Buckets 'profile-photos'
        const { error } = await supabaseClient.storage
            .from("profile-photos")
            .upload(fileName, profilPhoto, { upsert: true }); // Direkt im Bucket root hochladen

        if (error) {
            console.error("Fehler beim Hochladen des Fotos in Profil", error);
            setLoading(false);
            return null;
        }

        const photoUrl = supabaseClient.storage
            .from("profile-photos")
            .getPublicUrl(fileName)
            .data.publicUrl;

        setLoading(false);

        return photoUrl;
    }

    // ! Registrierungsfunktion
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();





        if (password !== confirmPassword) {
            setMessage('Passwörter stimmen nicht überein');
        } else {
            // Foto hochladen und die URL speichern
            const uploadedPhotoUrl = await uploadPhoto();
            if (!uploadedPhotoUrl) return;
            console.log("UploadPhotoURL in Regestriungsform", uploadedPhotoUrl);

            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        photo: uploadedPhotoUrl,
                    }
                }
            });

            if (error) {
                if (error.message.includes("Email rate limit exceeded")) {
                    setMessage("Zu viele Anfragen. Bitte versuchen Sie es später erneut.");
                    return;
                } else {
                    setMessage(`Fehler bei der Registrierung: ${error.message}`);
                    return;
                }

            }
            console.log("data", data);

            setMessage('Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail.');
        }
    };

    return (
        <div className="container">
            <h2 className="header">Registrierung</h2>
            <form onSubmit={handleSubmit} className="form-reg">
                <div className="formGroup">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"

                    />
                </div>

                <div className="formGroup">
                    <label className="label">Vorname:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input"

                    />
                </div>

                <div className="formGroup">
                    <label className="label">Nachname:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input"

                    />
                </div>


                <div className="formGroup">
                    <label className="label">Profil Pic:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setProfilPhoto(e.target.files[0]);
                            }
                        }}
                        className="input"

                    />
                </div>

                <div className="formGroup">
                    <label className="label">Passwort:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"

                    />
                </div>
                <div className="formGroup">
                    <label className="label">Passwort bestätigen:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"

                    />
                </div>
                <button type="submit" className="button">{loading ? "Uploading..." : "Regestrieren"}</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default RegisterPage;