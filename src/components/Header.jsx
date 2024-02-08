import { useDispatch, useSelector } from "react-redux";

import { updateSearch, updateKey } from "../store/features/games/gamesSlice";

const Header = (props) => {
  const { apiCall, params } = props;

  const dispatch = useDispatch();
  const { key, search } = useSelector((state) => state.games);

  const chandleInputSearchChange = (searchText) => {
    dispatch(updateSearch(searchText));
  };

  const chandleInputKeyChange = (keyText) => {
    dispatch(updateKey(keyText));
    apiCall(params);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      apiCall(params);
    }
  };

  return (
    <header className="bg-dark">
      <form className="form p-3">
        <span>+ Games DB</span>
        <input
          className="p-3 rounded flex-grow-1 border-0"
          type="text"
          name="search"
          value={search}
          onChange={(e) => chandleInputSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for game. Example: Mario..."
        />
        <input
          className="p-3 rounded border-0"
          type="text"
          name="key"
          value={key}
          onChange={(e) => chandleInputKeyChange(e.target.value)}
          placeholder="Type your api key here"
        />
      </form>
    </header>
  );
};

export default Header;
