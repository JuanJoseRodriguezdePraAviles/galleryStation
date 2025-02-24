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
        document.getElementById(props.image.id).setAttribute('class', 'inspect-window hide-window');
        document.body.setAttribute('class', '');

        setDescription(props.image.description);
        document.getElementsByClassName('description-field')[0].setAttribute('readOnly', true);
        setSaved(true);
    };


    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    const handleEdit = () => {
        if (!saved) {
            console.log("Updating description");
            localStorage.setItem(props.image.id,
                JSON.stringify(
                    {
                        ...props.image,
                        description: description
                    }
                ));
            
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

    return (
        <>
            <div id={props.image.id} className="inspect-window hide-window">

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