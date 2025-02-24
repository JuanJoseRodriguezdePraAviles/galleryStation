import './../css/style.css';
import ImageContainer from './ImageContainer';
import { useLocation } from 'react-router-dom';


function Dashboard(props) {
    console.log(props);
    return (
        <>
            <div className='bg-blue'>
                {props.filteredImages ?
                    props.filteredImages.map(image => (

                        <>
                            <ImageContainer key={image.id} image={image.links?.download || image.image} width={image.width} height={image.height} likes={image.likes} date={image.date} description={image.alt_description} >

                            </ImageContainer>
                        </>
                    ))
                    :
                    props.images.map(image => (
                        <>
                            <ImageContainer key={image.id} id={image.id} image={image.links?.download || image.image} width={image.width} height={image.height} likes={image.likes} date={image.links? image.created_at : image.date} description={image.description}>

                            </ImageContainer>
                        </>
                    ))
                }

            </div>


        </>
    );
}

export default Dashboard;