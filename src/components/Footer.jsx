import { incrementPage } from '../redux/slices/SearchSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Footer() {

    const dispatch = useDispatch();

    const handleLoadMore = () => {
        dispatch(incrementPage());
    }

    return (
        <>
            <footer>
                <div className="description-container">
                    <Link to='/' className='title-link'>
                        <h1>Gallery Station</h1>
                    </Link>
                    
                    <p>Our image bank allows the user to create custom collections of their favorite images</p>
                </div>
                <div className="socials-container">
                    <div>
                        <img src="./src/assets/Mail.svg"/> <p>example@gmail.com</p>
                    </div>
                    <div>
                        <img src="./src/assets/Phone.svg"/> <p>+34 666 555 999</p>
                    </div>
                </div>
                <button className='btn-load-more' onClick={handleLoadMore}>Load More</button>
            </footer>
        </>
    );
}

export default Footer;