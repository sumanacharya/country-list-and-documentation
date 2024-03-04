import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import { fetchCountryDetail } from "../../services/countries.service";
import { Country } from "../../types/country.type";

export function CountryDetail() {
  // Extracts the country name from the URL parameters.
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // fetch country details when the component mounts or the name changes
  useEffect(() => {
    const getCountryDetail = async () => {
      setIsLoading(true);
      try {
        if (name) {
          const data = await fetchCountryDetail(name);
          setCountry(data ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch country details:", error);
        setCountry(null);
      } finally {
        setIsLoading(false);
      }
    };

    getCountryDetail();
  }, [name]);

  // Display loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Display message if no country is found
  if (!country) {
    return <div className="text-center mt-10">Country not found</div>;
  }

  // Fallback for country flag if not available.
  const flagSrc = country.flags?.svg || "path/to/default/flag/image";

  return (
    <div className="flex flex-col items-center mt-10">
      <Button
        className=""
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <div className="flex flex-col item-left">
        <div className="w-full max-w-4xl p-5 bg-white rounded-sm border border-gray-200 mt-4">
          <h1 className="text-3xl font-semibold">{country.name.common}</h1>
          <div className="my-4 flex justify-center">
            <img
              src={flagSrc}
              alt={`${country.name.common} flag`}
              className="w-48"
            />
          </div>
          <p className="text-lg ">
            Population: {country.population.toLocaleString()}
          </p>
          <p className="text-lg ">
            Demonym:{" "}
            {country.demonyms?.eng?.f || country.demonyms?.eng?.m || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
