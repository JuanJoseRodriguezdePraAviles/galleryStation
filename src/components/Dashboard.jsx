import './../css/style.css';
import ImageContainer from './ImageContainer';
import { incrementPage } from '../redux/slices/SearchSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import InspectWindow from './InspectWindow';

function Dashboard(props) {
    const dispatch = useDispatch();
    const [isInspectVisible, setIsInspectVisible] = useState(false);
    const [inspectData, setInspectData] = useState({
        width: 0,
        height: 0,
        likes: 0,
        date: "",
        description: ""
    });
    const [imageClickedID, setImageClickedID] = useState("");

    const handleLoadMore = () => {
        const scrollY = window.scrollY;

        dispatch(incrementPage());

        setTimeout(() => {
            window.scrollTo({ top: scrollY, behavior: 'instant'});
        }, 500);
    }

    return (
        <div>
            <div className='bg-blue'>
                {props.filteredImages ?
                    props.filteredImages.map(image => (
                        <ImageContainer key={image.id} image={image} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                            setInspectData={setInspectData} setImageClickedID={setImageClickedID}>
                        </ImageContainer>
                    ))
                    :
                    props.images.map(image => (
                        <ImageContainer key={image.id} image={image} isInspectVisible={image.isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                            setInspectData={inspectData} setImageClickedID={setImageClickedID}>
                        </ImageContainer>
                    ))
                }
            </div>
            {useLocation().pathname === '/' &&
                <div className='load-more-container'>
                    <button className='btn-load-more' onClick={handleLoadMore}>Load More</button>
                </div>
            }
            <InspectWindow key={props.isInspectVisible ? '-open' : '-close'} images={props.filteredImages ? props.filteredImages : props.images} setIsInspectVisible={setIsInspectVisible} isInspectVisible={isInspectVisible} inspectData={inspectData}
                setInspectData={setInspectData} setImageClickedID={setImageClickedID} imageClickedID={imageClickedID} />
        </div>
    );
}
export default Dashboard;