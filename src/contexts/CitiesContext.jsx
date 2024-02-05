import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

// cusotm hook to consume data
function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined) {
    throw new Error("Cities context is used outside of the cities provider.");
  }
  return context;
}

export { CitiesProvider, useCities };
