"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SportJoy } from "@/lib/types";

const YANDEX_API_KEY = "427b6299-02ce-4db5-a52e-d098d4fc4b11";

interface YandexMapProps {
  locations: SportJoy[];
  onLocationSelect?: (location: SportJoy) => void;
  selectedLocationId?: number | null;
}

// Yandex Maps API types
interface YandexMaps {
  ready: (callback: () => void) => void;
  Map: new (element: HTMLElement, options: {
    center: [number, number];
    zoom: number;
    controls: string[];
  }) => {
    center: [number, number];
    zoom: number;
    geoObjects: {
      add: (obj: unknown) => void;
      remove: (obj: unknown) => void;
      getBounds: () => [[number, number], [number, number]] | null;
    };
    setBounds: (bounds: [[number, number], [number, number]], options?: object) => void;
    setCenter: (center: [number, number], zoom?: number, options?: object) => void;
  };
  Placemark: new (coordinates: [number, number], properties: object, options: object) => {
    events: {
      add: (event: string, handler: () => void) => void;
    };
  };
}

declare global {
  interface Window {
    ymaps: YandexMaps;
  }
}

export function YandexMap({ locations, onLocationSelect, selectedLocationId }: YandexMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<InstanceType<YandexMaps["Map"]> | null>(null);
  const markersRef = useRef<InstanceType<YandexMaps["Placemark"]>[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Yandex Maps script
  useEffect(() => {
    if (window.ymaps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=uz_UZ`;
    script.async = true;

    script.onload = () => {
      window.ymaps.ready(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      setError("Xarita yuklanmadi. Internet aloqasini tekshiring.");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount if needed
    };
  }, []);

  const addMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      map.geoObjects.remove(marker);
    });
    markersRef.current = [];

    // Add new markers
    locations.forEach((location) => {
      const isSelected = location.id === selectedLocationId;

      const placemark = new window.ymaps.Placemark(
        [location.kenglik, location.uzunlik],
        {
          hintContent: location.nomi,
          balloonContentHeader: `<strong>${location.nomi}</strong>`,
          balloonContentBody: `
            <div style="padding: 8px 0;">
              <p style="margin: 4px 0;"><strong>Manzil:</strong> ${location.manzil}</p>
              <p style="margin: 4px 0;"><strong>Tuman:</strong> ${location.tuman}</p>
              ${location.telefon ? `<p style="margin: 4px 0;"><strong>Telefon:</strong> ${location.telefon}</p>` : ""}
              ${location.ish_vaqti ? `<p style="margin: 4px 0;"><strong>Ish vaqti:</strong> ${location.ish_vaqti}</p>` : ""}
              <p style="margin: 4px 0;"><strong>Reyting:</strong> ${"⭐".repeat(Math.round(location.reyting))} (${location.reyting}/5)</p>
              <p style="margin: 8px 0 4px;"><strong>Sport turlari:</strong></p>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${location.sport_turlari.map(sport =>
                  `<span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${sport}</span>`
                ).join("")}
              </div>
            </div>
          `,
          balloonContentFooter: `<small>Koordinatalar: ${location.kenglik.toFixed(4)}, ${location.uzunlik.toFixed(4)}</small>`,
        },
        {
          preset: isSelected
            ? "islands#redDotIcon"
            : "islands#blueSportIcon",
          iconColor: isSelected ? "#ef4444" : "#3b82f6",
        }
      );

      placemark.events.add("click", () => {
        if (onLocationSelect) {
          onLocationSelect(location);
        }
      });

      map.geoObjects.add(placemark);
      markersRef.current.push(placemark);
    });

    // Fit bounds to show all markers
    if (locations.length > 0 && markersRef.current.length > 0) {
      const bounds = map.geoObjects.getBounds();
      if (bounds) {
        map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 50 });
      }
    }
  }, [locations, onLocationSelect, selectedLocationId]);

  // Initialize map when loaded
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapRef.current) return;

    try {
      const centerLat = locations.length > 0
        ? locations.reduce((sum, loc) => sum + loc.kenglik, 0) / locations.length
        : 40.3839;
      const centerLng = locations.length > 0
        ? locations.reduce((sum, loc) => sum + loc.uzunlik, 0) / locations.length
        : 71.7873;

      mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 12,
        controls: ["zoomControl", "fullscreenControl", "geolocationControl"],
      });

      addMarkers();
    } catch (err) {
      setError("Xarita yaratishda xatolik yuz berdi");
      console.error(err);
    }
  }, [isLoaded, locations, addMarkers]);

  // Update markers when locations change
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    addMarkers();
  }, [addMarkers, isLoaded]);

  // Center on selected location
  useEffect(() => {
    if (!mapRef.current || !selectedLocationId) return;

    const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
    if (selectedLocation) {
      mapRef.current.setCenter(
        [selectedLocation.kenglik, selectedLocation.uzunlik],
        15,
        { duration: 500 }
      );
    }
  }, [selectedLocationId, locations]);

  if (error) {
    return (
      <div className="h-80 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-80 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-3">🗺️</div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Xarita yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className="h-80 md:h-96 rounded-xl overflow-hidden shadow-inner"
        style={{ minHeight: "320px" }}
      />
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          📍 {locations.length} ta sport joyi
        </p>
      </div>
    </div>
  );
}
