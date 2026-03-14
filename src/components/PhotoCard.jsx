export default function PhotoCard({ photo, isFavourite, toggleFavourite }) {
  return (
    <div className="bg-blue-300 shadow rounded overflow-hidden">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-48 object-cover"
      />
      <div className="flex justify-between items-center p-2">
        <p className="text-sm font-medium">{photo.author}</p>
        <button onClick={() => toggleFavourite(photo)}>
          <span className={`text-xl ${isFavourite ? "text-red-500" : "text-gray-500"}`}>
            ♥
          </span>
        </button>
      </div>
    </div>
  );
}