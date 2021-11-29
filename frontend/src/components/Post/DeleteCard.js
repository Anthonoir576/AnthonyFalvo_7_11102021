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
                        <p>Voulez-vous supprimer la publication ?</p>
                        <div>
                            <span className="deleteYes"
                                // USER A DELETE ICI
                                onClick={() => {fonctionDeletePost()}}>
                                Supprimer
                            </span>
                            <span className="deleteNo"
                                onClick={() => setPop(false)}>
                                Annuler
                            </span>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default DeleteCard;