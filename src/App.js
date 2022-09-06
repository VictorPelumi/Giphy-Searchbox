import "./App.css";
import { useState } from "react";

const GIPHY_API =
  "https://api.giphy.com/v1/gifs/search?api_key=kNUvWZHHD8aK1gxanflAZTrtmzt8A7hw&limit=25&offset=0&q=";

function App() {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchGifHandler = () => {
    if (search.length > 0) {
      setLoading(true);
      fetch(GIPHY_API + search)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          setLoading(false);
          alert("something went wrong");
        });
    }
  };
  return (
    <>
      <div className="header">
        <header className="title">
          <h1>Giphy Searchbox</h1>
        </header>
      </div>
      <div className="header">
        <div>
          <input
            type="text"
            placeholder="Search GIFs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchGifHandler}>Search</button>
        </div>
      </div>

      <div className="result">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="list">
            {gifs.map((gif) => {
              return (
                <div className="item">
                  <img src={gif} alt="Fetched gif" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
