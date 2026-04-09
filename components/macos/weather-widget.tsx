"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  city: string;
}

const weatherIcons: Record<number, { icon: string; label: string; labelEn: string }> = {
  0: { icon: "☀️", label: "Ensoleillé", labelEn: "Clear" },
  1: { icon: "🌤️", label: "Peu nuageux", labelEn: "Mostly clear" },
  2: { icon: "⛅", label: "Partiellement nuageux", labelEn: "Partly cloudy" },
  3: { icon: "☁️", label: "Nuageux", labelEn: "Overcast" },
  45: { icon: "🌫️", label: "Brouillard", labelEn: "Fog" },
  48: { icon: "🌫️", label: "Brouillard givrant", labelEn: "Freezing fog" },
  51: { icon: "🌦️", label: "Bruine légère", labelEn: "Light drizzle" },
  53: { icon: "🌦️", label: "Bruine", labelEn: "Drizzle" },
  55: { icon: "🌦️", label: "Bruine dense", labelEn: "Dense drizzle" },
  61: { icon: "🌧️", label: "Pluie légère", labelEn: "Light rain" },
  63: { icon: "🌧️", label: "Pluie", labelEn: "Rain" },
  65: { icon: "🌧️", label: "Forte pluie", labelEn: "Heavy rain" },
  71: { icon: "🌨️", label: "Neige légère", labelEn: "Light snow" },
  73: { icon: "🌨️", label: "Neige", labelEn: "Snow" },
  75: { icon: "🌨️", label: "Forte neige", labelEn: "Heavy snow" },
  80: { icon: "🌦️", label: "Averses", labelEn: "Showers" },
  81: { icon: "🌧️", label: "Fortes averses", labelEn: "Heavy showers" },
  82: { icon: "⛈️", label: "Averses violentes", labelEn: "Violent showers" },
  95: { icon: "⛈️", label: "Orage", labelEn: "Thunderstorm" },
  96: { icon: "⛈️", label: "Orage avec grêle", labelEn: "Thunderstorm with hail" },
  99: { icon: "⛈️", label: "Orage violent", labelEn: "Severe thunderstorm" },
};

function getWeatherInfo(code: number) {
  return weatherIcons[code] || weatherIcons[Math.floor(code / 10) * 10] || weatherIcons[0];
}

export function WeatherWidget() {
  const { locale } = useI18n();
  const isFr = locale === "fr";
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        // Get city name
        const geoRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        const geoData = await geoRes.json();

        // Reverse geocode for city name
        let city = "Paris";
        try {
          const cityRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`
          );
          const cityData = await cityRes.json();
          city = cityData.address?.city || cityData.address?.town || cityData.address?.village || "Paris";
        } catch {
          // Fallback to Paris
        }

        setWeather({
          temperature: Math.round(geoData.current.temperature_2m),
          weatherCode: geoData.current.weather_code,
          city,
        });
      } catch {
        // Fallback
        setWeather({ temperature: 18, weatherCode: 2, city: "Paris" });
      }
      setLoading(false);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => {
          // Permission denied — use Paris
          fetchWeather(48.8566, 2.3522);
        }
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-black/5" />
          <div className="flex-1">
            <div className="h-3 w-16 animate-pulse rounded bg-black/5" />
            <div className="mt-1 h-2 w-24 animate-pulse rounded bg-black/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const info = getWeatherInfo(weather.weatherCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-[#86868b]">{weather.city}</p>
          <p className="text-[28px] font-bold leading-tight text-[#1d1d1f]">
            {weather.temperature}°
          </p>
          <p className="text-[11px] text-[#86868b]">
            {isFr ? info.label : info.labelEn}
          </p>
        </div>
        <span className="text-4xl">{info.icon}</span>
      </div>
    </motion.div>
  );
}
