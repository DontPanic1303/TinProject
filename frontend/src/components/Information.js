import {useSelector, useDispatch} from "react-redux";
import {setUser, deSetUser} from "../features/user/userSlice";

const Information = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);

    return(
        <div>
            {
                isLoggedIn ? (
                    <div>
                        <h1>Informacie o koncie</h1>
                        <ul>
                            <li><strong>Imię:</strong>{user.Imie}</li>
                            <li><strong>Nazwisko:</strong> {user.Nazwisko}</li>
                            <li><strong>Rodzaj:</strong> {user.Rodzaj}</li>
                            <li><strong>Adres:</strong> {user.Adres}</li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h1>Proszę się zalogować</h1>
                    </div>
                )
            }
        </div>
    );
}

export default Information