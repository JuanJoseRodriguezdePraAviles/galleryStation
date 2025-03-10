import './../css/style.css';
import React, { useState, useEffect } from 'react';

function ImageContainer(props) {
    const [like, setLike] = useState(false);
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
        if (props.isInspectVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [props.isInspectVisible])

    const handleSave = () => {
        const newLikeState = !like;
        setLike(newLikeState);
        
        if (newLikeState) {
            icon = "./assets/Like.svg";
            let images = [];

            if (localStorage.images) {
                images = JSON.parse(localStorage.images);
            }

            images.push(props);
            localStorage.setItem('images', JSON.stringify(images));
        
        } else {

            icon = "./assets/dislike.svg";
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

    const handleInspect = (e) => {
        if(!props.isInspectVisible && props.image === e.target.src){
            props.setImageClickedID(props.id);
            props.setIsInspectVisible(true);
        }
    }

    const handleDownload = async () => {
        window.location.href = `${props.image}&force=true`;
    }

    let icon, numLikes;
    if (like) {
        icon = "./assets/Like.svg";
        numLikes = props.likes + 1;
    } else {
        icon = "./assets/dislike.svg";
        numLikes = props.likes;
    }
    return (
        <>
            <div className="imageContainer">
                <img src={props.image} onClick={handleInspect} className='image' />
                <div className="imageControls">
                    <div className='likes-container' onClick={handleSave}>
                        <img src={icon} />
                        <p>{numLikes}</p>
                    </div>
                    <div className='download-container' onClick={handleDownload}>
                        <img src="./assets/download.svg" />
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default ImageContainer;