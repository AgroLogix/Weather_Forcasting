export default async function handler(req, res) {
  const API_KEY = process.env.OPENWEATHER_KEY;

  const { city, lat, lon, type } = req.query;

  let url = "";

  try {
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    }

    else if (lat && lon && type === "forecast") {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    }

    else if (lat && lon && type === "uv") {
      url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    }

    else if (lat && lon && type === "tz") {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    }

    else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}