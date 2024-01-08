import {useSelector, useDispatch} from "react-redux";
import {setUser, deSetUser} from "../features/user/userSlice";

const Information = () => {
    const user = useSelector((state) => state.user.user);

    return(
      <div>
          <h1>Informacie o koncie</h1>
      <ul>
          <li><strong>Imię:</strong>{user.Imie}</li>
          <li><strong>Nazwisko:</strong> {user.Nazwisko}</li>
          <li><strong>Rodzaj:</strong> {user.Rodzaj}</li>
          <li><strong>Adres:</strong> {user.Adres}</li>
      </ul>
      </div>
    );
}

export default Information