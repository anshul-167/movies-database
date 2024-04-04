import {useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa6'
import {MdAccessTime} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const DetailedPage = props => {
  const [movieDetails, setMovieDetails] = useState({})
  const [castDetails, setCastDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)

  const fetchCastDetails = async () => {
    const {match: routeMatch} = props
    const {params: routeParams} = routeMatch
    const {id: routeId} = routeParams

    const apiKey = '3c8923b981a381aaf426839bb09d773d'
    const url = `https://api.themoviedb.org/3/movie/${routeId}/credits?api_key=${apiKey}&language=en`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const toCamelCase = input => {
        if (input === null || typeof input !== 'object') {
          return input
        }

        if (Array.isArray(input)) {
          return input.map(item => toCamelCase(item))
        }

        return Object.keys(input).reduce((camelCaseObject, key) => {
          const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
            letter.toUpperCase(),
          )
          const value = input[key]

          return {
            ...camelCaseObject,
            [camelCaseKey]: toCamelCase(value),
          }
        }, {})
      }

      setCastDetails(toCamelCase(data))
      setIsLoading2(false)
    }
  }

  const fetchMovieDetails = async () => {
    const {match: routeMatch} = props
    const {params: routeParams} = routeMatch
    const {id: routeId} = routeParams

    const apiKey = '3c8923b981a381aaf426839bb09d773d'
    const url = `https://api.themoviedb.org/3/movie/${routeId}?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formattedDataFunction = x => ({
        adult: x.adult,
        backdropPath: x.backdrop_path,
        belongsToCollection: x.belongs_to_collection,
        budget: x.budget,
        genres: x.genres,
        homepage: x.homepage,
        id: x.id,
        imdbId: x.imdb_id,
        originalLanguage: x.original_language,
        originalTitle: x.original_title,
        overview: x.overview,
        popularity: x.popularity,
        posterPath: x.poster_path,
        productionCompanies: x.production_companies,
        productionCountries: x.production_countries,
        releaseDate: x.release_date,
        revenue: x.revenue,
        runtime: x.runtime,
        spokenLanguages: x.spoken_languages,
        status: x.status,
        tagline: x.tagline,
        title: x.title,
        video: x.video,
        voteAverage: x.vote_average,
        voteCount: x.vote_count,
      })
      setMovieDetails(formattedDataFunction(data))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovieDetails()
    fetchCastDetails()
  }, [])

  const renderCastDetails = x => (
    <li className="dp-cd-item" key={x.id}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${x.profilePath}`}
        alt="profile img"
        className="dp-cd-img"
      />
      <p className="dp-cd-name">{x.originalName}</p>
      <p className="dp-cd-char-name">{x.character}</p>
    </li>
  )

  const renderLoader = () => <div className="loader" />

  const renderMovieSection = () => (
    <div className="detailed-main-cont">
      {isLoading ? (
        renderLoader()
      ) : (
        <div className="top-container">
          <div className="detailed-page-poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.posterPath}`}
              alt="poster"
              className="detailed-page-poster"
            />
          </div>
          <div className="movie-details-cont">
            <h1 className="detailed-title">{movieDetails.originalTitle}</h1>
            <p className="detailed-overview">{movieDetails.overview}</p>

            <div className="detailed-rating-cont">
              <MdAccessTime className="clock-icon" />
              <p className="detailed-overview">{`${movieDetails.runtime} mins`}</p>
            </div>
            {Object.keys(movieDetails).length !== 0 && (
              <p className="dp-genres">
                genres:
                {movieDetails.genres.map(each => (
                  <span className="dp-each-genre">{`${each.name},`}</span>
                ))}
              </p>
            )}
            <p className="dp-release">
              Releasing on:{' '}
              <span className="dp-release-date">
                {movieDetails.releaseDate}
              </span>
            </p>

            <div className="detailed-rating-cont">
              <FaStar className="star" />
              <p className="detailed-rating">
                {movieDetails.voteAverage}
                <span>/10</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="bottom-cont">
        {isLoading2
          ? renderLoader()
          : Object.keys(castDetails).length !== 0 && (
              <ul className="dp-cd-item-cont">
                {castDetails.cast.map(each => renderCastDetails(each))}
              </ul>
            )}
      </div>
    </div>
  )

  console.log(castDetails.cast)

  return (
    <>
      <Header />
      {renderMovieSection()}
    </>
  )
}

export default DetailedPage
