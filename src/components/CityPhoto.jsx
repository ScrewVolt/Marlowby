// THE CITY PICTURES: shows the photo for one city.
// The file name and the text description both come from data/cities.js.
// "alt" is read aloud by screen readers, and shown if the image fails to load.

export default function CityPhoto({ city, className = '' }) {
  return <img src={city.photo} alt={city.photoAlt} width="1200" height="600" className={`object-cover ${className}`} />
}
