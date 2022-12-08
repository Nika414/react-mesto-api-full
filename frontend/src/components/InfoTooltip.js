import successLogo from '../images/Union.svg'
import errorLogo from '../images/Error.svg'


function InfoTooltip({ name, isOpen, onClose, isSubmitSucceed }) {
    let infoToolTipLogo;
    let infoToolTipText;

    if (isSubmitSucceed) {
        infoToolTipLogo = successLogo;
        infoToolTipText = 'Вы успешно зарегистрировались!'
    }
    else {
        infoToolTipLogo = errorLogo;
        infoToolTipText = 'Что-то пошло не так! Попробуйте ещё раз.'
    }

    return (
        <div className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''}`}  >
            <div className={`popup__container popup__container_purpose_${name}`}>
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img src={infoToolTipLogo} alt="Знак успешной регистрации" className={`popup__${name}-image`} />
                <p className={`popup__${name}-text`}>{infoToolTipText}</p>
            </div>
        </div>
    )

}

export default InfoTooltip