import React from 'react';
import './ImageList.css';
const ImageList = ({ imageList }) => {
    return (
        <ul>
            {imageList.map(image => {
                return (
                    <li key={image.id}>
                        <a target="_blank" href={image.urls.raw} rel="noreferrer">
                            <img alt={image.alt_description} src={image.urls.regular} />
                        </a>
                    </li>
                );
            })
            }
        </ul>
    );
};

export default ImageList;