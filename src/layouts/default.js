
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthorizationSlice } from "../store/reducers/authorization.slice";

import classes from "./default.module.scss"
import Header from "components/layouts-components/header";
import PlainLoader from "components/ui-components/loaders/plain-loader";

export default function Default({ children }) {
    const navigate = useNavigate();
    const { isAuth } = useSelector(selectAuthorizationSlice);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if(!isMounted) return;
        if(isAuth) return;
        navigate('/login');
    }, [isMounted, isAuth]);

    return (
        <div className={`wrapper row`}>
            <Header />
            <div className={`${classes.main}`}>
                {isMounted ? children : <PlainLoader />}
            </div>
        </div>
    );
};
