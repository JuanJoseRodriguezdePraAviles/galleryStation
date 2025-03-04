import './../css/style.css';
import React, { useState, useEffect } from 'react';
import InspectWindow from './InspectWindow';
import { useDispatch } from 'react-redux';

function ImageContainer(props) {
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();
    const [isInspectVisible, setIsInspectVisible] = useState(false);

    useEffect(() => {
        if (localStorage.images) {
            JSON.parse(localStorage.images).map((image) => {
                if (image.id === props.id) {
                    setLike(true);
                };
            })
        }
    }, []);

    useEffect(() => {
        if (isInspectVisible) {
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

            let images = [];

            if (localStorage.images) {
                images = JSON.parse(localStorage.images);
            }

            images.push(props);
            localStorage.setItem('images', JSON.stringify(images));
        } else {
            icon = "./src/assets/dislike.svg";
            let images = JSON.parse(localStorage.images);
            let index = 0;
            images.map((image) => {
                if (image.id === props.id) {
                    images.splice(index, 1);
                }
                index++;
            });
            localStorage.setItem('images', JSON.stringify(images));
        }
    }

    const handleInspect = () => {

        setIsInspectVisible(true);

    }

    const handleDownload = async () => {

        window.location.href = `${props.image}&force=true`;
    }


    let icon;
    let numLikes;
    if (like) {
        icon = "./src/assets/like.svg";
        numLikes = props.likes + 1;
    } else {
        icon = "./src/assets/dislike.svg";
        numLikes = props.likes;
    }
    return (
        <>
            <div className="imageContainer">
                <img src={props.image} onClick={handleInspect} className='image' />
                <div className="imageControls">
                    <div className='likes-container'>
                        <img src={icon} onClick={handleSave} />
                        <p>{numLikes}</p>
                    </div>
                    <div className='download-container'>
                        <img src="./src/assets/download.svg" onClick={handleDownload} />
                    </div>
                    
                </div>
            </div>
            <InspectWindow key={isInspectVisible ? '-open' : '-close'} image={props} setIsInspectVisible={setIsInspectVisible} isInspectVisible={isInspectVisible} />
        </>
    );
}

export default ImageContainer;