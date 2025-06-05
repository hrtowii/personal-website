import React, { useEffect, useState } from "react";
import "./SettingsCard.css";

const SettingsCard: React.FC = () => {
  const [rainEnabled, setRainEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);

  // Helper functions for cookies
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string): void => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`; // 1 year
  };

  // Load settings on component mount
  useEffect(() => {
    const savedRainEnabled = getCookie("rainEnabled");
    const savedCrtEnabled = getCookie("crtEnabled");
    
    if (savedRainEnabled !== null) {
      setRainEnabled(savedRainEnabled === "true");
    }
    
    if (savedCrtEnabled !== null) {
      setCrtEnabled(savedCrtEnabled === "true");
    } else {
      // Default to true for first-time visitors
      setCookie("crtEnabled", "true");
    }

    // Initial sync with global managers
    const syncWithGlobalState = () => {
      const weatherManager = (window as any).weatherManager;
      const crtManager = (window as any).crtManager;
      
      if (weatherManager) {
        const rainCookie = getCookie("rainEnabled");
        if (rainCookie !== null) {
          const rainState = rainCookie === "true";
          setRainEnabled(rainState);
        }
      }
      
      if (crtManager) {
        const crtCookie = getCookie("crtEnabled");
        if (crtCookie !== null) {
          const crtState = crtCookie === "true";
          setCrtEnabled(crtState);
        }
      }
    };

    // Try immediate sync, then retry if managers aren't ready
    syncWithGlobalState();
    const initialSyncTimeout = setTimeout(syncWithGlobalState, 500);

    // Set up a small interval to sync with global state
    const syncInterval = setInterval(() => {
      const currentCrtEnabled = getCookie("crtEnabled") === "true";
      const currentRainEnabled = getCookie("rainEnabled") === "true";
      
      if (currentCrtEnabled !== crtEnabled) {
        setCrtEnabled(currentCrtEnabled);
      }
      
      if (currentRainEnabled !== rainEnabled) {
        setRainEnabled(currentRainEnabled);
      }
    }, 1000);

    return () => {
      clearTimeout(initialSyncTimeout);
      clearInterval(syncInterval);
    };
  }, []);

  // Handle rain toggle
  const handleRainToggle = (enabled: boolean) => {
    setRainEnabled(enabled);
    setCookie("rainEnabled", enabled.toString());
    
    // Use global weather manager for immediate effect with retry mechanism
    const tryToggleRain = (attempts = 0) => {
      const weatherManager = (window as any).weatherManager;
      if (weatherManager) {
        weatherManager.toggleRain(enabled);
      } else if (attempts < 10) {
        // Retry after a short delay if weather manager isn't ready yet
        setTimeout(() => tryToggleRain(attempts + 1), 100);
      } else {
        // Fallback: Trigger rain system update through DOM
        const rainToggle = document.getElementById("rainToggle") as HTMLInputElement;
        if (rainToggle) {
          rainToggle.checked = enabled;
          rainToggle.dispatchEvent(new Event("change"));
        }
      }
    };
    
    tryToggleRain();
  };

  // Handle CRT filter toggle
  const handleCrtToggle = (enabled: boolean) => {
    setCrtEnabled(enabled);
    setCookie("crtEnabled", enabled.toString());
    
    // Use global CRT manager with retry mechanism
    const tryToggleCrt = (attempts = 0) => {
      const crtManager = (window as any).crtManager;
      if (crtManager) {
        crtManager.setCRTEnabled(enabled);
      } else if (attempts < 10) {
        // Retry after a short delay if CRT manager isn't ready yet
        setTimeout(() => tryToggleCrt(attempts + 1), 100);
      } else {
        // Fallback: Apply or remove CRT filter class directly
        const body = document.body;
        if (enabled) {
          body.classList.add("crt-filter");
        } else {
          body.classList.remove("crt-filter");
        }
      }
    };
    
    tryToggleCrt();
  };

  return (
    <div className="settings_card">
      <div className="settings_status_header">
        <p className="status-text">settings !!</p>
      </div>

      <div className="settings_content">
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={rainEnabled}
              onChange={(e) => handleRainToggle(e.target.checked)}
              className="setting-checkbox"
            />
            <span className="checkmark"></span>
            <span className="setting-text">Rain Effect</span>
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={crtEnabled}
              onChange={(e) => handleCrtToggle(e.target.checked)}
              className="setting-checkbox"
            />
            <span className="checkmark"></span>
            <span className="setting-text">CRT Filter</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;