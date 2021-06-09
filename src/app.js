import SearchBar from './component/SearchBar';
import ImageList from './component/ImageList';
import Unsplash from './api/unsplash';
import { SnackbarProvider } from 'notistack';
import { useState, useRef } from 'react';



const App = () => {
    const providerRef = useRef();
    const [imageList, setImageList] = useState([]),
        [nextPage, setNextPage] = useState(1),
        [searchTerm, setSearchTerm] = useState(''),
        [isLoading, setIsLoading] = useState(false),
        [totalPage, setTotalPage] = useState(0);
    const onSearchSubmit = async (value) => {
        setNextPage(1);
        setSearchTerm(value);
        await updateImageList(value, 1);
    };
    const updateImageList = async (term, page) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await Unsplash.get('/search/photos', {
                params: {
                    query: term,
                    per_page: 30,
                    page: page
                }
            });
            setNextPage(page + 1);
            setTotalPage(response.data.total_pages);
            const newImageList = response.data.results.map(i => ({
                urls: i.urls,
                id: i.id,
                alt_description: i.alt_description
            }));
            setImageList(page === 1 ? newImageList : imageList.concat(newImageList));
            if (newImageList.length === 0) {
                providerRef.current.enqueueSnackbar('We can\'t find any images.', {
                    variant: 'warning'
                });
            }
        } catch (e) {
            providerRef.current.enqueueSnackbar(`Something went wrong - ${e.toString()}`, {
                variant: 'error'
            });
            console.log(e);
        }
        setIsLoading(false);
    }
    return (
        <SnackbarProvider preventDuplicate ref={providerRef} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} 
        action={(key) => (<button className="ui icon circular basic mini button" onClick={()=>providerRef.current.closeSnackbar()}>
                <i className="close icon"></i>
            </button>)}
        >
            <div className="container ui">
                <SearchBar onSubmit={onSearchSubmit} isLoading={isLoading} />
            </div>
            <ImageList imageList={imageList} />
            {
                totalPage >= nextPage
                    ? <button className={`fluid ui button ${isLoading ? 'loading' : ''}`} onClick={() => updateImageList(searchTerm, nextPage)}>Load more..</button>
                    : null
            }
        </SnackbarProvider>
    );
}

export default App;