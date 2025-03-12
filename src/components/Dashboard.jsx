import './../css/style.css';
import ImageContainer from './ImageContainer';
import { incrementPage } from '../redux/slices/SearchSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InspectWindow from './InspectWindow';
import { Pagination } from "@mui/material";


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
    const [page, setPage] = useState(1);
    const [imagesFromPage, setImagesFromPage] = useState([]);

    let location = useLocation();

    let maxPage = 0;

    if (props.filteredImages) {
        maxPage = Math.ceil(props.filteredImages.length / 9);
    } else {
        maxPage = Math.ceil(props.images.length / 9);
    }

    const handlePage = (event, page) => {
        setPage(page);
    }

    useEffect(() => {
        let newImages = [];
        if (props.images.length > 0) {
            for (let i = 0; i < props.images.length; i++) {
                if (i < page * 9) {
                    if (i >= (page - 1) * 9) {
                        newImages.push(props.images[i]);
                    }
                }
            }
        }
        setImagesFromPage(newImages);
    }, [page, props.images, props.tagFilter]);



    const handleLoadMore = () => {
        const scrollY = window.scrollY;

        dispatch(incrementPage());

        setTimeout(() => {
            window.scrollTo({ top: scrollY, behavior: 'instant' });
        }, 500);
    }
    useEffect(() => {
        if(location.pathname === '/favourite'){
            setImagesFromPage(JSON.parse(localStorage.images));
        }
    }, [location.pathname]);

    useEffect(()=>{
        console.log("useEffect", location.pathname);
        if(location.pathname === '/favourite'){
            console.log("Updating images");
            setImagesFromPage(JSON.parse(localStorage.images));
        }
    }, [props.tagFilter]);
    console.log(imagesFromPage);
    return (
        <div>
            {imagesFromPage.length !== 0 && (
                <div className='bg-blue'>
                    {props.filteredImages ?
                        props.filteredImages.map(image => (
                            <ImageContainer key={image.id} image={image} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                                setInspectData={setInspectData} setImageClickedID={setImageClickedID}>
                            </ImageContainer>
                        ))
                        :
                        imagesFromPage.map(image => (
                            props.tagFilter ?
                                image.tags.indexOf('Landscape')===0 &&
                                <ImageContainer key={image.id} image={image} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                                    setInspectData={inspectData} setImageClickedID={setImageClickedID}>
                                </ImageContainer>
                                :
                                <ImageContainer key={image.id} image={image} isInspectVisible={isInspectVisible} setIsInspectVisible={setIsInspectVisible}
                                    setInspectData={inspectData} setImageClickedID={setImageClickedID}>
                                </ImageContainer>

                        ))
                    }
                </div>
            )}
            {imagesFromPage.length === 0 && <p className="message">Your liked images will show here!</p>}

            {useLocation().pathname === '/' ?
                <div className='load-more-container'>
                    <button className='btn-load-more' onClick={handleLoadMore}>Load More</button>
                </div>
                :
                <Pagination count={maxPage} page={page} onChange={handlePage} className='pagination' />
            }
            <InspectWindow key={props.isInspectVisible ? '-open' : '-close'} images={props.filteredImages ? props.filteredImages : props.images} setIsInspectVisible={setIsInspectVisible} isInspectVisible={isInspectVisible} inspectData={inspectData}
                setInspectData={setInspectData} setImageClickedID={setImageClickedID} imageClickedID={imageClickedID} />
        </div>
    );
}
export default Dashboard;