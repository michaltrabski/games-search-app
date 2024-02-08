import { useDispatch, useSelector } from "react-redux";

import { updatePage } from "../store/features/games/gamesSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.games);

  return (
    <footer>
      <form className="form p-3">
        <input
          className="input p-3 rounded flex-grow-1 border-light bg-transparent"
          type="number"
          name="page"
          value={page}
          onChange={(e) => dispatch(updatePage(e.target.value))}
        />
      </form>
    </footer>
  );
};

export default Footer;
