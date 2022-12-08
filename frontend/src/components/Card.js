import bin from '../images/Bin.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const contextValue = useContext(CurrentUserContext);
    const isOwn = card.owner._id === contextValue.currentUser._id || card.owner === contextValue.currentUser._id;

    const cardBinClassName = (
        `photo-cards__bin ${isOwn ? 'photo-cards__bin_visible' : 'photo-cards__bin_hidden'}`
    )

    const isLiked = card.likes.some(i => i === contextValue.currentUser._id);
    const cardLikeButtonClassName = (`photo-cards__like-button ${isLiked && 'photo-cards__like-button_active'}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <div className="photo-cards__item">
            <div style={{ backgroundImage: `url(${card.link})` }} className="photo-cards__pic" alt={card.name} onClick={handleClick}></div>
            <img src={bin} className={cardBinClassName} onClick={handleDeleteClick} alt="Корзина" />
            <div className="photo-cards__description">
                <h2 className="photo-cards__photo-title">{card.name}</h2>
                <div className="photo-cards__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Лайк"></button>
                    <p className="photo-cards__like-amount">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card
