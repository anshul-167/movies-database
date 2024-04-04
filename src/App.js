import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import DetailedPage from './Components/DetailedPage'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/:id" component={DetailedPage} />
  </Switch>
)

export default App
