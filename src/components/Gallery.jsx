import { useReducer, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import { favouritesReducer, initialState } from "../reducers/favouritesReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value.toLowerCase());
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) =>
      p.author.toLowerCase().includes(search)
    );
  }, [photos, search]);

  const toggleFavourite = (photo) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photo });
  };

  if (loading) return <div className="text-center text-white mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by author..."
        value={search}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded bg-gray-300 text-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.some((f) => f.id === photo.id)}
            toggleFavourite={toggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}