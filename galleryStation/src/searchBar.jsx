import './css/style.css';

function SearchBar() {
    return (
        <>
            <div className="searchFilterContainer">
                <form>
                    <input className="searchInput" type="search"></input>
                    <select>
                        <option value="">Import Date</option>
                        <option value="">Import Date</option>
                        <option value="">Width</option>
                        <option value="">Width</option>
                        <option value="">Height</option>
                        <option value="">Height</option>
                        <option value="">Likes</option>
                        <option value="">Likes</option>
                    </select>
                </form>
            </div>
        </>
    );
}

export default SearchBar;