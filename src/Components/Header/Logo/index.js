import './index.css'

const Logo = () => (
  <button className="btn" type="button">
    <strong>movieDB</strong>
    <div id="container-stars">
      <div id="stars" />
    </div>

    <div id="glow">
      <div className="circle" />
      <div className="circle" />
    </div>
  </button>
)
export default Logo
