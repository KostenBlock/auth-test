import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUsersSlice } from "store/reducers/users.slice";
import { selectAuthorizationSlice } from "store/reducers/authorization.slice";

import classes from "./home-page.module.scss";
import Card from "./card";
import PlainLoader from "components/ui-components/loaders/plain-loader";

export default function HomePage() {
    const dispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(false);
    const { isAuth } = useSelector(selectAuthorizationSlice);
    const { users, isPending } = useSelector(selectUsersSlice);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if(!isAuth || !isMounted) return;
        dispatch(getUsers());
    }, [isMounted]);

    if(isPending) return <PlainLoader />;

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content} row`}>
                {users.map(element => <Card key={element.id} element={element}/>)}
            </div>
        </div>
    );
};
