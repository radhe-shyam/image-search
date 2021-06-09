import { useState } from 'react';
const SearchBar = ({ onSubmit, isLoading }) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term);
    };

    const onChange = (event) => {
        event.preventDefault();
        setTerm(event.target.value);
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="ui icon input fluid">
                    <input type="text" disabled={isLoading} onChange={onChange} value={term} placeholder="Search images..." />
                    <i className={`circular search link icon ${isLoading ? 'loading' : ''}`} onClick={onFormSubmit}></i>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;