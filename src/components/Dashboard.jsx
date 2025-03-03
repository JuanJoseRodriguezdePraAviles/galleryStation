import './../css/style.css';
import ImageContainer from './ImageContainer';
import { incrementPage } from '../redux/slices/SearchSlice';
import { useDispatch } from 'react-redux';



function Dashboard(props) {
    const dispatch = useDispatch();

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
                                description={image.description}>

                            </ImageContainer>
                        </>
                    ))
                    :
                    props.images.map(image => (
                        <>
                            <ImageContainer key={image.id} id={image.id} image={image.links?.download || image.image}
                                width={image.width} height={image.height} likes={image.likes} date={image.links ? image.created_at : image.date}
                                description={image.description}>

                            </ImageContainer>
                        </>
                    ))
                }

            </div>
            <div className='load-more-container'>
                <button className='btn-load-more' onClick={handleLoadMore}>Load More</button>
            </div>



        </>
    );
}

export default Dashboard;