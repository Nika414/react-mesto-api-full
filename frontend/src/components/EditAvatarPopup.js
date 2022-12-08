import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  useEffect(() => {
    if (isOpen) {
      reset({ avatar: "" });
    }
  }, [isOpen, reset]);

  function onSubmit(data) {
    onUpdateAvatar(data);
  }


  return (
    <PopupWithForm
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isValid={isValid}
      
    >
        
      <label className="form__label">
        <input
          {...register("avatar", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
            pattern: {
              value:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
              message: "Введите URL",
            },
          })}
          className="popup__form-item popup__form-item_value_avatar-link"
          type="url"
          id="avatar"
          placeholder="Ссылка на твой новый аватар"
        />
        <span
          className={`form__item-error ${
            errors?.avatar && "form__item-error_active"
          }`}
        >
          {errors?.avatar?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}
