import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

import Card from "./components/Card";

import "./App.css";

const PAGE_SIZE = 10;

function App() {
  const [apiKey, setApiKey] = useState("945130f387b84fcdb6dfd5df44a30791"); //"945130f387b84fcdb6dfd5df44a30791"
  const [apiKeyErrorMessage, setApiKeyErrorMessage] = useState("");

  const [searchText, setSearchText] = useState("mario");
  const [pageNumber, setPageNumber] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const [games, setGames] = useState([]);

  const reaultsCount = !!games.count ? games.count : 0;
  const pagesCount = reaultsCount ? Math.floor(reaultsCount / PAGE_SIZE) : 0;

  useEffect(() => {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchText}&page=${pageNumber}&page_size=${PAGE_SIZE}`;
    apiCall(url);
  }, [apiKey, pageNumber]);

  const chandleInputSearchChange = (searchText) => {
    console.log("searchText: ", searchText);
    setIsSearching(() => true);
    setSearchText(() => searchText);
    setApiKeyErrorMessage(() => "");

    if (!apiKey) {
      setApiKeyErrorMessage(() => "Please provide your api key");
      setGames(() => []);
      return;
    }
    debouncedApiCall(searchText);
  };

  const debouncedApiCall = useCallback(
    debounce((search) => {
      const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page_size=${PAGE_SIZE}`;
      console.log("debouncedApiCalled", { url });

      apiCall(url);
    }, 1000),
    [apiKey]
  );

  const apiCall = (url) => {
    console.log("apiCalled");
    axios
      .get(url)
      .then((response) => {
        console.log("Data fetched: ", response.data);
        setGames(() => response.data);
        setIsSearching(() => false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiKeyErrorMessage(() => `${error.message}. Check your api key and try again.`);
        setGames(() => []);
      });
  };

  return (
    <div className="p-3 container-fluid text-start">
      {/* HEADER  */}
      <div className="row">
        <div className="col">
          <div className="d-flex bg-info p-3">
            <span>+ Games DB</span>
            <input
              className="flex-grow-1 mx-3"
              type="text"
              name="search"
              value={searchText}
              onChange={(e) => {
                chandleInputSearchChange(e.target.value);
              }}
              placeholder="Wyszukaj grę"
            />
            <input
              type="text"
              name="apikey"
              value={apiKey}
              onChange={(e) => {
                setApiKeyErrorMessage(() => "");
                setApiKey(e.target.value);
              }}
              placeholder="Type your api key here"
            />
          </div>
        </div>
      </div>

      {/* MAIN  */}
      <main>
        <div className="row">
          <div className="col">
            <div className="d-flex bg-light p-3">
              {apiKeyErrorMessage && <p>{apiKeyErrorMessage}</p>}

              {!apiKeyErrorMessage && (
                <div>
                  {isSearching && <p>Searching...</p>}

                  {!isSearching && (
                    <>
                      <h2>
                        Found {!!reaultsCount ? reaultsCount : 0} games! (On {pagesCount} pages.)
                      </h2>

                      <div className="grid grid-cols-4 gap-4">
                        {games.results?.map((game) => (
                          <Card title={game.name} platforms={game.platforms} image={game.background_image} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER  */}
      <div className="row">
        <div className="col">
          <div className="d-flex bg-warning p-3">
            <input type="number" name="page" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
          </div>
        </div>
      </div>

      <pre>{JSON.stringify({ ...games, results: ["xxxx"] }, null, 2)}</pre>
      <p>
        Cel: Przygotowanie aplikacji której celem jest wyszukiwanie i paginowanie danych z bazy danych gier dostępnych
        na konsole i komputery osobiste:
      </p>
      <p>Przykładowe rozwiązanie Wymagania:</p>
      <ul>
        <li>Aplikacja napisana w ReactJS</li>
        <li className="text-danger">Wykorzystaj reduxa do przechowywania danych</li>
        <li className="text-danger">Testy jednostkowe napisz w testing library</li>
        <li className="text-danger">Style CSS napisane samodzielnie</li>
        <li>
          Wyszukiwarka nazwy gry (wyszukanie na <span className="text-danger">enter</span> lub debounce)
        </li>
        <li>Pole na wpisanie klucza do API (walidacja braku klucza)</li>
        <li>
          Paginacja w formie numerycznego inputa (wpisz nr strony) wraz z{" "}
          <span className="text-danger">walidacją minimalnych i maksymalnych wartości</span>
        </li>
        <li>Limit 10 wpisów na stronę</li>
        <li className="text-danger">
          Mile widziane dodanie w prawym górnym rogu screenshota gry badge’a z oceną z metacritic (dostępna w api)
        </li>
        <li className="text-danger">Rozwiązanie jak najbardziej podobne wyglądowo do przykładowego rozwiązania</li>
        <li className="text-danger">
          Aplikacja powinna być responsywna (dobrze wyglądać dla różnych rozdzielczości ekranu - od 300px szerokości
          wzwyż)
        </li>
        <li>Zadanie ma być zrobione samodzielnie</li>
        <li>Do wykonania zadania nie wykorzystuj typescript’a</li>
      </ul>
      <p>
        API: Do napisania rozwiązania wykorzystaj API rawg.io. Musisz w tym celu założyć tam konto i poprosić o dostęp
        do klucza api. Pamiętaj, że dostęp do API jest ograniczony limitem requestów (20000 requestów na miesiąc).
        Dokumentacja API
      </p>
      <p>
        Termin i sposób doręczenia zadania: Na wykonanie zadania masz 3 dni robocze licząc od dnia otrzymania zadania,
        zadanie umieść w odpowiedzi na maila jako skompresowany załącznik - nie przyjmujemy linków do githuba
      </p>
    </div>
  );
}

export default App;
