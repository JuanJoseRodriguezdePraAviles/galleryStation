import './../css/style.css';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function InspectWindow(props) {
    const [description, setDescription] = useState(props.images.description);
    const [saved, setSaved] = useState(true);
    const descriptionFieldRef = useRef();
    const location = useLocation();

    const closeInspect = () => {
        props.setIsInspectVisible(false);
        
        if(!saved){
            props.setImageClickedID("");
        }
        descriptionFieldRef.current.readOnly = true;
        setSaved(true);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.images);
        if (data.length !== 0) {
            data.map((image) => {
                if (image.id == props.images.id) {
                    setDescription(image.description);
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        
        setDescription(e.target.value);
    }

    const handleEdit = () => {
        if (!saved) {
            const updatedImages = JSON.parse(localStorage.images).map((image) => {
                if (image.id === props.imageClickedID) {
                    let imageUpdate = image;
                    imageUpdate = { ...imageUpdate, description: description }
                    return imageUpdate;
                };
                return image;

            });
            
            localStorage.setItem('images', JSON.stringify(updatedImages));

            setDescription(description);
            setSaved(true);
        } else {
            setSaved(false);
        }
    }

    useEffect(() => {
        if (descriptionFieldRef.current) {
            descriptionFieldRef.current.readOnly = saved;
        }

    }, [saved]);

    useEffect(() => {
        if(location.pathname === '/'){
            let imageData = props.images.find(image => (image.id === props.imageClickedID));
            if(imageData){
                props.setInspectData({
                    width: imageData.width,
                    height: imageData.height,
                    likes: imageData.likes,
                    date: imageData.updated_at,
                    description: imageData.description ? imageData.description : imageData.alt_description
                });
            }
        } else {
            let imageData = JSON.parse(localStorage.images).find((image) => (image.id === props.imageClickedID));
            
            if(imageData) {
                props.setInspectData({
                    width: imageData.width,
                    height: imageData.height,
                    likes: imageData.likes,
                    date: imageData.updated_at,
                    description: imageData.description ? imageData.description : imageData.alt_description
                });
            }
        }
    }, [props.imageClickedID]);

    useEffect(() => {
        if(props.inspectData.description !== description) {
            setDescription(props.inspectData.description);
        }
    }, [props.inspectData]);

    if (!props.isInspectVisible) {
        return null;
    }
    return (
        <>
            <div id={props.images.id} className="inspect-window">
                <div className='static-data-container'>
                    <p>Width:{props.inspectData.width}</p>
                    <p>Height:{props.inspectData.height}</p>
                    <p>Likes:{props.inspectData.likes}</p>
                    <p>Create at:{formatDate(props.inspectData.date)}</p>
                </div>
                {location.pathname !== '/' ? <button className='btn-container' onClick={handleEdit}>{saved ? 'Edit description' : 'Save'}</button> : <></>}

                <div className='description-container'>
                    <h2>Description</h2>
                    <textarea type='text' className='description-field' readOnly value={description} onChange={handleChange} ref={descriptionFieldRef}></textarea>
                </div>
                <button className='exit' onClick={closeInspect}><i className="fa-solid fa-x icon"></i></button>
            </div>

        </>
    );
}

export default InspectWindow;