import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login({ onLogin, isLoginSucceed }) {
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
    reset({ email: "", password: "" });
  }, [reset]);


  function onSubmit(data) {
    onLogin(data.password, data.email);
  }

  return (
    <div className="login auth">
      <h3 className="login__header auth__header">Вход</h3>
      <form
        className="login__form auth__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form__label">
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Введите e-mail",
              },
            })}
            className="login__form-input auth__form-input"
            placeholder="Email"
            type="email"
          />
          <span
            className={`form__item-error ${errors?.email && "form__item-error_active"
              }`}
          >
            {errors?.email?.message}
          </span>
        </label>
        <label className="form__label">
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
            className="login__form-input auth__form-input"
            placeholder="Пароль"
            type="password"
          />
          <span
            className={`form__item-error ${errors?.password && "form__item-error_active"
              }`}
          >
            {errors?.password?.message}
            {isLoginSucceed === false && 'Неправильный логин или пароль'}
          </span>
        </label>
        <button className={`login__form-button auth__form-button ${isValid ? "" : "form__button_inactive"}`} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
