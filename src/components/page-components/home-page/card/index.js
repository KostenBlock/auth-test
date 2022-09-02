
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import classes from "./card.module.scss";
import axios from "axios";


export default function Card({ element }) {
    const [isMounted, setIsMounted] = useState(false);

    const [photo, setPhoto] = useState({});
    const [comment, setComment] = useState({});
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if(!isMounted) return;
        (async () => {
            await getUserActivity();
        })();
    }, [isMounted]);

    const getUserActivity = async () => {
        try {
            setIsPending(true);
            const { data: photoData } = await axios.get(`${process.env.REACT_APP_URL}/photos/${element.id}`);
            const { data: commentData } = await axios.get(`${process.env.REACT_APP_URL}/comments/${element.id}`);
            setPhoto({ ...photoData });
            setComment({ ...commentData });
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={`${classes.card__container} row gap-15`}>
            <div className={`${classes.card__head} column`}>
                <div className={`${classes.picture__container} desktop-tablet-only`}>
                    <img src={photo.thumbnailUrl} alt={photo.title} className={`cover-image`} />
                </div>
                <div className={`row gap-15`}>
                    <span className={`block__regular-text-small font-normal`}>Author: {element.name}</span>
                    <span className={`block__regular-text-small font-normal`}>Company: {element.company.name}</span>
                </div>
            </div>
            <div className={`${classes.comment__container} row gap-20`}>
                <span className={`block__regular-text-small font-normal`}>title: {comment.name}</span>
                <p className={`block__regular-text-small font-normal desktop-tablet-only`}>{comment.body}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    element: PropTypes.object
};

Card.defaultProps = {
    element: {}
};
