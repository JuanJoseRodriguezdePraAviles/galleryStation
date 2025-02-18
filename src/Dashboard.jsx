import './css/style.css';
import ImageContainer from './ImageContainer';


function Dashboard(props) {


    return (
        <>
            <div className='bg-blue'>
                {props.filteredImages ?
                    props.filteredImages.map(image => (

                        <>
                            <ImageContainer image={image.links.download}>

                            </ImageContainer>
                        </>
                    ))
                    :
                    props.images.map(image => (
                        <>
                            <ImageContainer image={image.links.download}>

                            </ImageContainer>
                        </>
                    ))
                }

            </div>
        </>
    );
}

export default Dashboard;