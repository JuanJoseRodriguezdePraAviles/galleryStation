import { Link } from 'react-router-dom';

function Footer() {

    

    

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
            </footer>
        </>
    );
}

export default Footer;