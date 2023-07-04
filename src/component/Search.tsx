import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

type props = {
  search: string
  handleOnChange: (searchData: any) => void
}

const Search =({ search, handleOnChange }: props) => {

  const loadOptions = async (inputValue: string) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const data = await response.json();
    return {
      options: data.data.map((city: any) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };



  return (
    <AsyncPaginate
      className="peer h-full w-full px-3 outline-none text-sm text-gray-700 pr-2"
      placeholder="Search for city..."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
