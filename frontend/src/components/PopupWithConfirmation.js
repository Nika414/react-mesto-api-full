function PopupWithConfirmation({
  name,
  isOpen,
  isClose,
  onClose,
  buttonText,
  title,
  onSubmit,
  card,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <div
      className={`popup popup_purpose_${name} ${isOpen ? "popup_opened" : ""} ${
        isClose ? "popup__opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <p className="popup__main-text">{title}</p>
        <form
          onSubmit={handleSubmit}
          className={`popup__form popup__${name}-form`}
          name={`popup__${name}-form`}
          method="post"
          noValidate
        >
          <button className="form__button popup__delete-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithConfirmation;
