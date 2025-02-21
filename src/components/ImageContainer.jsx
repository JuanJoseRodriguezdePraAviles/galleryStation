import './../css/style.css';
import React, { useState, useEffect } from 'react';
import InspectWindow from './InspectWindow';

function ImageContainer(props) {
    const [like, setLike] = useState(false);

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
            console.log("IMAGE ABOUT TO BE SAVED");
            console.log(props);
            icon = "./src/assets/like.svg";
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