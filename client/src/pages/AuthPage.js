import React from 'react';
import is from 'is_js';
import Input from '../components/UI/Input';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/authContext';

//Form controls setup
function createFormControls() {
  return {
    email: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      shouldValidate: true,
      type: 'text',
      label: 'Email',
      placeholder: 'Введите Email',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        email: { active: true, errorMessage: 'Некорректно введен E-mail' },
      },
    },
    password: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      shouldValidate: true,
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        minLength: { active: true, errorMessage: 'Минимум 6 символов в пароле', value: 6 },
      },
    },
  };
}

const AuthPage = () => {
  const auth = React.useContext(AuthContext);
  const { loading, request } = useHttp();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());

  //form validation
  function validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    let error = [];

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
      if (!is.email(value) && value.trim() !== '') error.push(validation.email.errorMessage);
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength.value;
      if (!is.email(value) && value.trim() !== '') error.push(validation.minLength.errorMessage);
    }

    return { isValid, error };
  }

  const onInputChangeHandler = (event, controlName) => {
    const form = { ...formControls };
    const control = { ...form[controlName] };

    control.value = event.target.value;
    control.touched = true;
    const validation = validateControl(control.value, control.validation);
    control.valid = validation.isValid;
    control.errorMessage = validation.error;
    form[controlName] = control;

    let isFormValid = true;
    Object.keys(form).forEach((name) => {
      isFormValid = form[name].valid && isFormValid;
    });

    setIsFormValid(isFormValid);
    setFormControls(form);
  };

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <div key={controlName + index} className="col">
          <Input
            label={control.label}
            placeholder={control.placeholder}
            value={control.value}
            type={control.type}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            validation={control.validation}
            shouldValidate={control.shouldValidate}
            onChange={(event) => onInputChangeHandler(event, controlName)}
          />
        </div>
      );
    });
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {
        email: formControls.email.value,
        password: formControls.password.value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        email: formControls.email.value,
        password: formControls.password.value,
      });
      auth.login(data.token, data.userId, formControls.email.value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrapper wrapper__auth-form">
      <div className="auth-form">
        <h3 className="auth-form__title">Auth page</h3>
        <div className="auth-form__fields">{renderInputs()}</div>
        <div className="auth-form__action">
          <button onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </button>
          <button onClick={registerHandler} disabled={!isFormValid || loading}>
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
