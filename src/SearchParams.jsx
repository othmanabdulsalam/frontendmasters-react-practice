// Hook imports
import { useEffect, useState } from "react";
import Pet from "./Pet";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

/**
 * 
 * 
 * TODO 
 * ! d
 * @returns 
 */
const SearchParams = () =>
{
    const [location, setLocation] = useState("");
    const [animal, updateAnimal] = useState("");
    const [breed, updateBreed] = useState("");
    const [breeds] = useBreedList(animal);

    const [pets, setPets] = useState([]);

    // add inside component, beneath all the `useState` setup
    useEffect(() =>
    {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    async function requestPets()
    {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();

        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form onSubmit={e => 
            {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => updateAnimal(e.target.value)}
                        onBlur={(e) => updateAnimal(e.target.value)}
                    >
                        <option value="">Animal</option>
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e) => updateBreed(e.target.value)}
                        onBlur={(e) => updateBreed(e.target.value)}
                    >
                        <option value="">Breed</option>
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;