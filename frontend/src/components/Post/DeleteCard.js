import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = ( props ) => {

    const [pop, setPop] = useState(false);
    const dispatch      = useDispatch();

    const fonctionDeletePost = () => {

        dispatch(deletePost(props.id));
        setPop(false);

    };

    return (
        <div>
            <div>
            <img src="./image/image/delete.png"
                aria-label="Supprimez la publication" 
                alt="delete post"
                onClick={() => {
                    setPop(!pop);
                }}
            />
            </div>
            <div>
                {pop && (
                <>
                    <div className="deletePublication">
                        <p onClick={() => {fonctionDeletePost()}}>Voulez-vous supprimer la publication ?</p>
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default DeleteCard;