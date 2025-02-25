import './../css/style.css';
import React, { useState, useEffect } from 'react';
import InspectWindow from './InspectWindow';
import { useDispatch } from 'react-redux';

function ImageContainer(props) {
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();
    const [isInspectVisible, setIsInspectVisible] = useState(false);

    useEffect(() => {
        {
            Object.entries(localStorage).map(([key]) => {
                if (key === props.id) {
                    setLike(true);
                };

            })
        };
    }, [props.id]);

    useEffect(() => {
        if(isInspectVisible){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isInspectVisible])


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

        setIsInspectVisible(true);

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
            <InspectWindow key={isInspectVisible?'-open':'close'} image={props} setIsInspectVisible= {setIsInspectVisible}  isInspectVisible={isInspectVisible}/>
        </>
    );
}

export default ImageContainer;