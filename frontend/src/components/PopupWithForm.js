import { useEffect } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  buttonText,
  title,
  children,
  onSubmit,
  isValid
}) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      onClose()
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose, false);
    return () => {
      document.removeEventListener("keydown", handleEscClose, false);
    };
  }, [isOpen]);

  return (
    <div
      className={`popup popup_purpose_${name} ${isOpen ? "popup_opened" : ""} `}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__${name}-form`}
          name={`popup__${name}-form`}
          method="post"
          noValidate
        >
          {children}
          <button
            className={`form__button ${isValid ? "" : "form__button_inactive"}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
