import { userloginctx } from "../App";


export default function Register()
{
    const userLoginCtx = useContext(userloginctx)
    function userLogin()
    {
        var inputEmail = document.getElementById("userInputEmail").value;
        var inputPassword = document.getElementById("userInputPassword").value;
        var inputcnfPassword = document.getElementById("userInputcnfPassword").value;
        var inputName = document.getElementById("userInputName").value;

        if(inputPassword == inputcnfPassword){
            fetch('https://api.maristproject.online/api/login/', {Method: 'POST',
                Headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
                },
                Body: JSON.stringify({"email" : inputEmail, "password" : inputPassword, "name" : inputName}),
                }).then((res) => res.json())
                .then((json) => {
                                if(json.status == "success")
                                {userLoginCtx({"userData":json.data, "userToken": json.token})}
                                }
                                )
                }
        }
        

    return(
        <><form onSubmit={userLogin}>
            <div>
                <label>Name</label>
                <input type={text} name={name} id="userInputName" value />
            </div>
            <div>
                <label>Email</label>
                <input type={text} name={email} id="userInputEmail" value />
            </div>
            <div>
                <label>Password</label>
                <input type={password} name={password} id="userInputPassword" value />
            </div>
            <div>
                <label>Password</label>
                <input type={password} name={cnfpassword} id="userInputcnfPassword" value />
            </div>
                <button>Submit</button>
            </form></>
    )
}