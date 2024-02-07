import { useCallback,    useState } from "react";
import "./App.css";
import axios from "axios";
import { debounce   } from "lodash";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [games, setGames] = useState([]);

  const searchQueryString = searchText ? `&search=${searchText}` : "";
  const reaultsCount = games.results?.length;

  // useEffect(() => {
  //   if (!searchText) return;

  //   debouncedApiCall(searchText);
  // }, [searchText]);

  const handleSearch = debounce((search) => {
    setSearchText(() => search);
  }, 1000);

  const chandleInputSearchChange = (searchText) => {
    console.log("searchText: ", searchText);
    setIsSearching(() => true);
    setSearchText(() => searchText);
    // debouncedApiCall(searchText);
    debouncedApiCall(searchText);
  };

  const debouncedApiCall = useCallback(
    debounce((search) => {
      console.log("debouncedApiCalled");


      const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${search}`;
      apiCall(url);
    }, 1000),
    []
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
      });
  };

  return (
    <div className="container text-start">
      <div className="row">
        <div className="col">
          <input
            type="text"
            name="search"
            onChange={(e) => {
              chandleInputSearchChange(e.target.value);
            }}
            placeholder="Wyszukaj grę"
          />
          <input type="text" placeholder="Klucz do API" />
          <button>Szukaj</button>
          <button>Wyczyść</button>
          <button>Poprzednia strona</button>
          <button>Następna strona</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p>
            search = <strong>{searchText}</strong>
          </p>
          <p>searchQueryString = {searchQueryString}</p>
          <p>reaultsCount = {reaultsCount}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>Found {reaultsCount} games!</h2>

          {isSearching && <p>Searching...</p>}

          {!isSearching && (
            <div className="grid grid-cols-4 gap-4">
              {games.results?.map((game) => (
                <div key={game.id} className="border p-5">
                  <h2>{game.name}</h2>
                  <p>{game.description_raw}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <pre>{JSON.stringify(games, null, 2)}</pre>
      <p>
        Cel: Przygotowanie aplikacji której celem jest wyszukiwanie i paginowanie danych z bazy danych gier dostępnych
        na konsole i komputery osobiste:
      </p>
      <p>Przykładowe rozwiązanie Wymagania:</p>
      <ul>
        <li>Aplikacja napisana w ReactJS</li>
        <li>Wykorzystaj reduxa do przechowywania danych</li>
        <li>Testy jednostkowe napisz w testing library</li>
        <li>Style CSS napisane samodzielnie</li>
        <li>Wyszukiwarka nazwy gry (wyszukanie na enter lub debounce)</li>
        <li>Pole na wpisanie klucza do API (walidacja braku klucza)</li>
        <li>
          Paginacja w formie numerycznego inputa (wpisz nr strony) wraz z walidacją minimalnych i maksymalnych wartości
        </li>
        <li>Limit 10 wpisów na stronę</li>
        <li>
          Mile widziane dodanie w prawym górnym rogu screenshota gry badge’a z oceną z metacritic (dostępna w api)
        </li>
        <li>Rozwiązanie jak najbardziej podobne wyglądowo do przykładowego rozwiązania</li>
        <li>
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
