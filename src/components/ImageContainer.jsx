import './../css/style.css';
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import { Landscape } from '@mui/icons-material';

function ImageContainer(props) {
    const [like, setLike] = useState(false);
    const [landscapeTag, setLandscapeTag] = useState(false);
    const [portraitTag, setPortraitTag] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (localStorage.images) {
            JSON.parse(localStorage.images).map((image) => {
                if (image.id === props.image.id) {
                    setLike(true);
                    if (image.tags.indexOf('Landscape') !== -1) {
                        setLandscapeTag(true);
                    }
                    if (image.tags.indexOf('Portrait') !== -1) {
                        setPortraitTag(true);
                    }
                }
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

            let imageUpdate = props.image;
            imageUpdate = { ...imageUpdate, tags: [] }

            images.push(imageUpdate);
            localStorage.setItem('images', JSON.stringify(images));

        } else {

            icon = "./assets/dislike.svg";
            let images = JSON.parse(localStorage.images);
            let index = 0;
            images.map((image) => {
                if (image.id === props.image.id) {
                    images.splice(index, 1);
                }
                index++;
            });
            localStorage.setItem('images', JSON.stringify(images));
        }
    }

    const handleInspect = (e) => {
        if (!props.isInspectVisible && props.image.links.download === e.target.src) {
            props.setImageClickedID(props.image.id);
            props.setIsInspectVisible(true);
        }
    }

    const handleDownload = async () => {
        window.location.href = `${props.image}&force=true`;
    }

    let tagLandscapeClass = 'assignTag';
    let tagPortraitClass = 'assignTag';

    const handleLandscapeTag = (e) => {
        const updatedImages = JSON.parse(localStorage.images).map((image) => {

            if (image.id === props.image.id) {
                let imageUpdate = image;
                if (imageUpdate.tags.indexOf('Landscape') === -1) {
                    imageUpdate.tags.push('Landscape');
                    setLandscapeTag(true)
                } else {
                    imageUpdate.tags.splice(imageUpdate.tags.indexOf('Landscape'), 1);
                    tagLandscapeClass = 'assignTag';
                    setLandscapeTag(false);
                }
                return imageUpdate;
            };
            return image;
        });
        localStorage.setItem('images', JSON.stringify(updatedImages));
    }

    const handlePortraitTag = (e) => {
        const updatedImages = JSON.parse(localStorage.images).map((image) => {

            if (image.id === props.image.id) {
                let imageUpdate = image;
                if (imageUpdate.tags.indexOf('Portrait') === -1) {
                    imageUpdate.tags.push('Portrait');
                    setPortraitTag(true)
                } else {
                    imageUpdate.tags.splice(imageUpdate.tags.indexOf('Portrait'), 1);
                    tagLandscapeClass = 'assignTag';
                    setPortraitTag(false);
                }
                return imageUpdate;
            };
            return image;
        });
        localStorage.setItem('images', JSON.stringify(updatedImages));
    }

    let icon, numLikes;
    if (like) {
        icon = "./assets/Like.svg";
        numLikes = props.image.likes + 1;
    } else {
        icon = "./assets/dislike.svg";
        numLikes = props.image.likes;
    }

    if (landscapeTag) {
        tagLandscapeClass = 'assignedTag';
    } else {
        tagLandscapeClass = 'assignTag';
    }

    if (portraitTag) {
        tagPortraitClass = 'assignedTag';
    } else {
        tagPortraitClass = 'assignTag';
    }

    return (
        <>
            <div className="imageContainer">
                <img src={props.image.links.download} onClick={handleInspect} className='image' />
                <div className="imageControls">
                    <div className='likes-container' onClick={handleSave}>
                        <img src={icon} />
                        <p>{numLikes}</p>
                    </div>
                    <div className='download-container' onClick={handleDownload}>
                        <img src="./assets/download.svg" />
                    </div>
                    {location.pathname !== '/' &&
                        <div className='assignTags'>
                            <Chip label='Landscape' variant="outlined" className={tagLandscapeClass} onClick={handleLandscapeTag} />
                            <Chip label='Portrait' variant="outlined" className={tagPortraitClass} onClick={handlePortraitTag} />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ImageContainer;