import './../css/style.css';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function InspectWindow(props) {

    const [description, setDescription] = useState(props.image.description);
    const [saved, setSaved] = useState(true);



    const descriptionFieldRef = useRef();


    const closeInspect = () => {
        props.setIsInspectVisible(false);
        props.setInspectingImage(false);


        descriptionFieldRef.current.readOnly = true;
        setSaved(true);


    };
    useEffect(() => {
        const data = JSON.parse(localStorage.images);
        if (data.length !== 2) {
            data.map((image) => {

                if (image.id == props.image.id) {
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

                if (image.id === props.image.id) {
                    let imageUpdate = props.image;

                    imageUpdate =
                    {
                        ...props.image,
                        description: description
                    }

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


    if (!props.isInspectVisible && !props.inspectingImage) {


        return null;
    }

    return (
        <>
            <div id={props.image.id} className="inspect-window">

                <div className='static-data-container'>
                    <p>Width:{props.image.width}</p>
                    <p>Height:{props.image.height}</p>
                    <p>Likes:{props.image.likes}</p>
                    <p>Create at:{formatDate(props.image.date)}</p>
                </div>
                {useLocation().pathname !== '/' ? <button className='btn-container' onClick={handleEdit}>{saved ? 'Edit description' : 'Save'}</button> : <></>}



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