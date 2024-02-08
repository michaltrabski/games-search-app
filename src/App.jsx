import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import Card from "./components/Card";
import { fetchGames, updateApiErrorMessage } from "./store/features/games/gamesSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const { games, page_size, key, apiErrorMessage, search, page, isSearching, reaultsCount } = useSelector(
    (state) => state.games
  );

  const pagesCount = reaultsCount ? Math.ceil(reaultsCount / page_size) : 0;

  const params = { key, search, page, page_size };

  useEffect(() => {
    if (!search) {
      dispatch(updateApiErrorMessage("Please type a game name to search."));
      return;
    }

    if (!key) {
      dispatch(updateApiErrorMessage("Please type your api key."));
      return;
    }

    debouncedApiCall(params);
  }, [key, search, page_size]);

  useEffect(() => {
    if (!search) {
      dispatch(updateApiErrorMessage("Please type a game name to search."));
      return;
    }

    if (!key) {
      dispatch(updateApiErrorMessage("Please type your api key."));
      return;
    }

    apiCall(params);
  }, [page]);

  const debouncedApiCall = useCallback(
    debounce((params) => {
      apiCall(params);
    }, 1000),
    []
  );

  const apiCall = (params) => dispatch(fetchGames(params));

  return (
    <>
      <Header apiCall={apiCall} params={params} />

      <main className="main">
        {apiErrorMessage && <p>{apiErrorMessage}</p>}

        {!apiErrorMessage && (
          <div>
            {isSearching && <p>Searching...</p>}

            {!isSearching && (
              <>
                <h2>
                  Found {reaultsCount} games! (On {pagesCount} pages.)
                </h2>

                <div className="grid">
                  {games.map((game) => (
                    <Card key={game.slug} title={game.name} platforms={game.platforms} image={game.background_image} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
