import './../css/style.css';
import React, { useState, useEffect } from 'react';
import InspectWindow from './InspectWindow';
import { useDispatch } from 'react-redux';

function ImageContainer(props) {
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        {
            Object.entries(localStorage).map(([key]) => {
                if (key === props.id) {
                    setLike(true);
                };

            })
        };
    }, [props.id]);


    const handleSave = () => {
        const newLikeState = !like;
        setLike(newLikeState);
        if (newLikeState) {
            icon = "./src/assets/like.svg";
            console.log("DATA TO SAVE");
            console.log(props);
            localStorage.setItem(props.id,
                JSON.stringify(props)
            );
        } else {
            icon = "./src/assets/dislike.svg";
            localStorage.removeItem(props.id);
        }
    }

    const handleInspect = () => {

        document.getElementById(props.id).setAttribute('class', 'inspect-window');
        document.body.setAttribute('class', 'stop-scrolling');

    }



    let icon;
    if (like) {
        icon = "./src/assets/like.svg";
    } else {
        icon = "./src/assets/dislike.svg";
    }
    return (
        <>
            <div className="imageContainer">
                <img src={props.image} onClick={handleInspect} />
                <div className="imageControls">
                    <img src={icon} onClick={handleSave} />
                    <img src="./src/assets/download.svg" />
                </div>
            </div>
            <InspectWindow image={props} />
        </>
    );
}

export default ImageContainer;