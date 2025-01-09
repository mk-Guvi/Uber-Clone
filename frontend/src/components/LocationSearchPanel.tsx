import React from "react";

type TLocationSuggestion = string;

interface ILocationSearchPanelProps {
  suggestions: TLocationSuggestion[];
  setPickup: (location: TLocationSuggestion) => void;
  setDestination: (location: TLocationSuggestion) => void;
  activeField: "" | "pickup" | "destination";
}

const LocationSearchPanel: React.FC<ILocationSearchPanelProps> = ({
  suggestions=[],
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion: TLocationSuggestion): void => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <div className="flex flex-col gap-2 overflow-auto h-full">
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
