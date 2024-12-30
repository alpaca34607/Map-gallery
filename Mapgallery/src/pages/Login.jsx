import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth, provide } from "firebase/app";

export default function Login() {
    // 登入成功後，使用此hOOK可以切換至指定頁
    const navgate = useNavigate();
    const login = async() => {
        const result = await signInWithPopup(auth, provide);
        navgate("/");
        console.log(result)
    }
    return (
        <div>
            <button onClick={login}>登入</button>
        </div>
    )
}