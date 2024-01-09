import { Link } from "react-router-dom";
import { MainDiv, NotFoundP, TitleP } from "./style";
import { FaLongArrowAltRight } from "react-icons/fa";

function NotFound() {
  return (
    <MainDiv>
      <TitleP>404</TitleP>
      <NotFoundP>NotFound!</NotFoundP>
      <Link to="todos" className="flex justify-center mt-9 items-center text-slate-700">
        todos
        <span className="mt-1 ml-3">
          <FaLongArrowAltRight />
        </span>
      </Link>
    </MainDiv>
  );
}

export default NotFound;
