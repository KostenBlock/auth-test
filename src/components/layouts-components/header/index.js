
import  { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthorizationSlice } from "store/reducers/authorization.slice";

import classes from "./header.module.scss";
import { ReactComponent as Logo } from "./images/logo.svg"
import { ReactComponent as Logout } from "./images/logout.svg"

export default function Header() {
    const dispatch = useDispatch();
    const { isAuth, user: { login }} = useSelector(selectAuthorizationSlice);

    return (
        <div className={`${classes.wrapper}`}>
           <div className={`${classes.content} column`}>
               <div className={`column horizontal-center-items gap-20`}>
                   <Logo />
                   <span className={`block__regular-header desktop-tablet-only`}>Каналсервис</span>
               </div>
               {isAuth
                   ? <div className={`column horizontal-center-items gap-35`}>
                       <span className={`block__regular-text font-bold desktop-only`}>{login}</span>
                       <Logout onClick={() => dispatch(logout())}
                       />
                   </div>
                   : null
               }
           </div>
        </div>
    )
}
