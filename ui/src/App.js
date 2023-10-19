import logo from './logo.svg';
import './App.css';
import Song from './Song';
import User from './User';
import SimilarSong from './SimilarSong';

function App() {
  return (
    <div className="info-page">
      <div className="info">
        <Song />
      </div>
      <div className="lists">
        {/* Right side: Two Lists */}
        <div className="list">
          <h3>Liked By</h3>
          <User />
          <User />
          <User />
        </div>
        <div className="list">
          <h3>Similar Songs</h3>
          <SimilarSong />
          <SimilarSong />
          <SimilarSong />
        </div>
      </div>
    </div>
  );
}

export default App;
