import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdStar} from 'react-icons/md'
import Header from '../Header'
import './index.css'

class Upcoming extends Component {
  state = {
    popularMoviesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getUpcomingMovies()
  }

  // Fetch upcoming movies data from API
  getUpcomingMovies = async () => {
    const API_KEY = '3c8923b981a381aaf426839bb09d773d'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          genreIds: each.genre_ids,
          id: each.id,
          originalTitle: each.original_title,
          overview: each.overview,
          popularity: each.popularity,
          posterPath: each.poster_path,
          releaseDate: each.release_date,
          title: each.title,
          video: each.video,
          voteAverage: each.vote_average,
          voteCount: each.vote_count,
          adult: each.adult,
        }))
        this.setState({isLoading: false, popularMoviesList: formattedData})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Render upcoming movies list
  renderPopularMovies = () => {
    const {popularMoviesList} = this.state
    return (
      <>
        <h1 className="popular-heading">Upcoming Movies</h1>
        <ul className="movies-list-cont">
          {popularMoviesList.map(each => (
            <li key={each.id} className="each-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500/${each.posterPath}`}
                alt="img"
                className="movie-poster"
              />
              <div className="movie-title-cont">
                <p className="movie-title">{each.title}</p>
                <div className="rating-cont">
                  <MdStar className="star" />
                  <p className="movie-rating">{each.voteAverage}</p>
                </div>
              </div>
              <div className="view-details-button">
                <Link to={`/${each.id}`}>
                  <button className="button" type="button">
                    <span className="view-details-text">View Details</span>
                    <svg
                      className="arrow"
                      viewBox="0 0 448 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  // Render loading spinner
  renderLoader = () => (
    <div className="honeycomb">
      {[...Array(7)].map((_, index) => (
        <div key={`honeycomb-${index + 1}`} />
      ))}
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="home-main-cont">
          {isLoading ? this.renderLoader() : this.renderPopularMovies()}
        </div>
      </>
    )
  }
}

export default Upcoming
