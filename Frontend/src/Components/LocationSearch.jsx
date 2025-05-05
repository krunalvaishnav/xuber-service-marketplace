import { useState } from "react";
import styles from "../Styles/UserDashboardStyle/LocationSerch.module.css";

const LocationSearch = ({ setLocation }) => {
  const [inputLocation, setInputLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const API_KEY = process.env.REACT_APP_LOCATION_SEARCH_API_KEY_URL;

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setInputLocation(query);

    if (query.length > 2) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LOCATION_SEARCH_URL}?q=${query}&key=${API_KEY}&countrycode=IN`
        );

        const data = await response.json();

        if (data.results) {
          const processedSuggestions = data.results.map((place) => ({
            display_name: place.formatted,
            lat: place.geometry.lat,
            lon: place.geometry.lng,
          }));

          setSuggestions(processedSuggestions);
        }
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (place) => {
    setInputLocation(place.display_name);
    setSelectedLocation(place);
    setSuggestions([]);

    setLocation({
      lat: place.lat,
      lon: place.lon,
      city: place.display_name,
    });
  };

  return (
    <div className={styles.locationContainer}>
      {/* Input Field with Background Image */}
      <input
        type="text"
        placeholder="Enter city or address"
        value={inputLocation}
        onChange={handleInputChange}
        className={styles.locationInput}
      />

      {/* Show suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelectLocation(place)}
              className={styles.suggestionItem}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;

// import { useState } from "react";

// const LocationSearch = ({ setLocation }) => {
//   const [inputLocation, setInputLocation] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Handle user input and fetch location suggestions
//   const handleInputChange = async (e) => {
//     const query = e.target.value;

//     setInputLocation(query);

//     if (query.length > 2) {
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`
//         );
//         const data = await response.json();

//         // Process results
//         const processedSuggestions = data.map((place) => ({
//           display_name: place.display_name,
//           lat: parseFloat(place.lat),  // Convert to number
//           lon: parseFloat(place.lon),
//         }));

//         setSuggestions(processedSuggestions);
//       } catch {
//         setSuggestions([]);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle location selection from suggestions
//   const handleSelectLocation = (place) => {
//     setInputLocation(place.display_name);
//     setSelectedLocation(place);
//     setSuggestions([]); // Clear suggestions
//   };

//   // Handle Search button click
//   const handleSearch = () => {
//     if (selectedLocation) {
//       setLocation({
//         lat: selectedLocation.lat,
//         lon: selectedLocation.lon,
//         city: selectedLocation.display_name,
//       });
//     }
//   };

//   return (
//     <div>
//       <h2>Enter Your Location</h2>
//       <input
//         type="text"
//         placeholder="Enter city or address"
//         value={inputLocation}
//         onChange={handleInputChange}
//       />

//       {/* Show suggestions dropdown */}
//       {suggestions.length > 0 && (
//         <ul style={{ border: "1px solid gray", listStyle: "none", padding: 0 }}>
//           {suggestions.map((place, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelectLocation(place)}
//               style={{
//                 padding: "8px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid lightgray",
//               }}
//             >
//               {place.display_name}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Search Button */}
//       <button onClick={handleSearch} disabled={!selectedLocation}>
//         Search
//       </button>
//     </div>
//   );
// };

// export default LocationSearch;
