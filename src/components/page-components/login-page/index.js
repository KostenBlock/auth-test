import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthorizationSlice } from "store/reducers/authorization.slice";

import classes from "./login-page.module.scss";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isAuth } = useSelector(selectAuthorizationSlice);
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });

    const changeEvent = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
    };

    useEffect(() => {
        if(!isAuth) return;
        navigate('/');
    }, [isAuth]);

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content} row gap-30`}>
                <span className={`block__regular-text font-bold center-text text-blue`}>Authorization</span>
                <form onSubmit={onSubmit} className={`${classes.form__container} row`}>
                    {isError ? <span className={`block__regular-text font-bold center-text text-red`}>invalid login or password</span> : null}
                    <div className={`${classes.input__container} row`}>
                        <label className={`block__regular-text font-bold`}>login</label>
                        <input
                            className={`${classes.input}`}
                            name={'login'}
                            type="text"
                            value={loginData.login}
                            onChange={changeEvent}
                        />
                    </div>
                    <div className={`${classes.input__container} row`}>
                        <label className={`block__regular-text font-bold`}>password</label>
                        <input
                            className={`${classes.input}`}
                            name={'password'}
                            type="password"
                            value={loginData.password}
                            onChange={changeEvent}
                        />
                    </div>
                    <button
                        onClick={() => dispatch(login(loginData))}
                        className={`${classes.button} block__regular-text font-bold`}
                        disabled={!loginData.login || !loginData.password}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
