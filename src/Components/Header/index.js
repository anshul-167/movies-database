import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import Logo from './Logo'

const Header = () => {
  const [searchText, setSearchText] = useState('')
  const [searchMoviesList, setSearchMoviesList] = useState([])
  const onChangeInput = event => {
    setSearchText(event.target.value)
  }

  const getSearchMovies = async () => {
    const API_KEY = '3c8923b981a381aaf426839bb09d773d'

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
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
      setSearchMoviesList(formattedData)
    }
  }

  console.log(searchMoviesList)
  const hamburgerMenu = () => (
    <nav className="hamburger-menu">
      <div className="navbar">
        <div className="container nav-container">
          <input className="checkbox" type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1" />
            <span className="line line2" />
            <span className="line line3" />
          </div>
          <div className="logo">
            <Link to="/" className="link">
              <h2 className="page-logo">MoviesDb</h2>
            </Link>
          </div>
          <div className="menu-items">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="link">
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="link">
                Upcoming
              </Link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  )

  const largeScreenNavbar = () => (
    <nav className="navbar-main-cont">
      <Link to="/" className="link">
        <Logo />
        <h2 className="mobile-logo">MoviesDb</h2>
      </Link>
      <div className="nav-right-cont">
        <ul className="navbar-links-cont">
          <li className="nav-link">
            <Link to="/" className="link">
              Popular
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/top-rated" className="link">
              Top Rated
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/upcoming" className="link">
              Upcoming
            </Link>
          </li>
        </ul>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="input"
            value={searchText}
            onChange={onChangeInput}
          />
        </div>
        {hamburgerMenu()}
      </div>
    </nav>
  )
  useEffect(() => {
    getSearchMovies()
  }, [searchText])
  return (
    <>
      {largeScreenNavbar()}
      {hamburgerMenu()}
    </>
  )
}

export default Header
