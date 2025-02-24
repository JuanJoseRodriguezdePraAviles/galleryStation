import './../css/style.css';
import { useLocation } from 'react-router-dom';

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}



function InspectWindow(props) {
    const closeInspect = () => {
        document.getElementById(props.image.id).setAttribute('class', 'inspect-window hide-window');
        document.body.setAttribute('class', '');
    };

    let isSaved = true;


    const handleEdit = () => {
        console.log("Handle edit");
        
        if(isSaved) {
            document.getElementsByClassName('description-field')[0].removeAttribute('readOnly');
            document.getElementsByClassName('btn-container')[0].innerHTML ='Save';
        } else {
            document.getElementsByClassName('description-field')[0].setAttribute('readOnly', true);
            document.getElementsByClassName('btn-container')[0].innerHTML ='Edit description';
        }
        

        isSaved = !isSaved;
    }

    return (
        <>
            <div id={props.image.id} className="inspect-window hide-window">

                <div className='static-data-container'>
                    <p>Width:{props.image.width}</p>
                    <p>Height:{props.image.height}</p>
                    <p>Likes:{props.image.likes}</p>
                    <p>Create at:{formatDate(props.image.date)}</p>
                </div>
                {useLocation().pathname !== '/' ? <button className='btn-container' onClick={handleEdit}>Edit description</button> : <></>}



                <div className='description-container'>
                    <h2>Description</h2>
                    <textarea type='text' className='description-field' readOnly>{props.image.description}</textarea>
                </div>
                <button className='exit' onClick={closeInspect}><i className="fa-solid fa-x icon"></i></button>


            </div>

        </>
    );
}

export default InspectWindow;