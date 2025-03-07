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
        dispatch(incrementPage());
    }

    return (
        <>
            <div className='bg-blue'>
                {props.filteredImages ?
                    props.filteredImages.map(image => (
                        <>
                            <ImageContainer key={image.id} id={image.id} image={image.links?.download || image.image}
                                width={image.width} height={image.height} likes={image.likes} date={image.links ? image.created_at : image.date}
                                description={image.description? image.description : image.alt_description} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                                setInspectData={setInspectData} setImageClickedID={setImageClickedID}>
                            </ImageContainer>
                        </>
                    ))
                    :
                    props.images.map(image => (
                        <>
                            <ImageContainer key={image.id} id={image.id} image={image.links?.download || image.image}
                                width={image.width} height={image.height} likes={image.likes} date={image.links ? image.created_at : image.date}
                                description={image.description? image.description : image.alt_description} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                                setInspectData={inspectData} setImageClickedID={setImageClickedID}>
                            </ImageContainer>
                        </>
                    ))
                }
            </div>
            {useLocation().pathname === '/' && 
                <div className='load-more-container'>
                    <button className='btn-load-more' onClick={handleLoadMore}>Load More</button>
                </div>
            }
            <InspectWindow key={props.isInspectVisible ? '-open' : '-close'} images={props.filteredImages? props.filteredImages : props.images} setIsInspectVisible={setIsInspectVisible} isInspectVisible={isInspectVisible} inspectData={inspectData}
                            setInspectData={setInspectData}  setImageClickedID={setImageClickedID} imageClickedID={imageClickedID} />
         
        </>
    );
}
export default Dashboard;