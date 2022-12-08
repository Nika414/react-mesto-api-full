function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_purpose_full-photo ${Object.keys(card).length  ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__full-photo-container">
          <figure className="popup__fig">
            <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
            <img className="popup__full-photo" src={card.link} alt={card.name}/>
            <figcaption className="popup__full-photo-description">{card.name}</figcaption>
          </figure>
        </div>
      </div>
    )
}

export default ImagePopup