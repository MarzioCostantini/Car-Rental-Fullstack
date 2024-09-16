export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!city || !apiKey) {
        return res.status(400).json({ error: 'City name or API key missing' });
    }

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);  // Sende JSON-Antwort zurück
        } else {
            return res.status(response.status).json({ error: data.message });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
}
