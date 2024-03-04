import React, { useEffect, useState } from "react";
import { Button, Pagination, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchCountries } from "../../services/countries.service";
import { searchItemsByQuery } from "../../utils/searchUtils";
import { Country } from "../../types/country.type";

const NO_RESULT_MESSAGE = "No Results Found";

export function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  // Calculate based on filteredCountries and pagination
  const displayedCountries = React.useMemo(() => {
    const startIndex = (currentPage - 1) * countriesPerPage;
    return filteredCountries.slice(startIndex, startIndex + countriesPerPage);
  }, [filteredCountries, currentPage]);

  // Fetch countries data on component mount
  useEffect(() => {
    setIsLoading(true);
    fetchCountries().then((data) => {
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
    });
  }, []);

  // Update search query state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle the search operation
  const handleSearch = () => {
    const filtered = searchItemsByQuery(countries, searchQuery, "name.common");
    setFilteredCountries(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-6/12">
        <div className="flex py-4">
          <input
            type="text"
            className="input border mr-2 p-2 rounded w-80"
            placeholder="Search Countries"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </Button>
        </div>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="w-6/12">
          {displayedCountries.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {displayedCountries.map((country: Country) => (
                <Link
                  to={`/country/${country.name.common}`}
                  key={country.name.common}
                  className="no-underline"
                >
                  <div className="bg-white rounded-md border border-gray-200 overflow-hidden hover:border-gray-300">
                    <div className="p-4 text-center">
                      <h5 className="text-md font-semibold">
                        {country.name.common}
                      </h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              {NO_RESULT_MESSAGE}
            </p>
          )}
          <Pagination
            count={Math.ceil(filteredCountries.length / countriesPerPage)}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
}
