import penIcon from '../images/Pen-icon.svg';
import { useContext } from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onCardClick, onEditProfile, onAddPlace, cards, onCardLike, onCardDelete }) {
    const contextValue = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${contextValue.currentUser.avatar})` }} >
                    <img src={penIcon} alt="Обновить аватар" className="profile__avatar-edit" onClick={onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__name-edit">
                        <h1 className="profile__name">{contextValue.currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} ></button>
                    </div>
                    <p className="profile__about">{contextValue.currentUser.about}</p>
                </div>

                <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
            </section>
            <section>
                <div className="photo-cards">
                    {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} {...card} />))}
                </div>
            </section>
        </main>
    );
}

export default Main;
