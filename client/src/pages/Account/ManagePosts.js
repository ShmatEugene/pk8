import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import Header from '../../components/Header/Header';
import Input from '../../components/UI/Input';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/http.hook';

//Form controls setup
function createFormControls() {
  return {
    code: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Код специальности',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    title: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: true,
      type: 'text',
      label: 'Назавание',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    yearsToStudy: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Длительность обучения',
    },
    stateFundedPlacecesCounter: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Количество бюджетных мест',
    },
    stateAccreditation: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Наличие аккредитации',
    },
    desc: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Описание',
    },
    prospects: {
      value: '',
      errorMessage: [],
      touched: false,
      valid: false,
      placeholder: '',
      shouldValidate: false,
      type: 'text',
      label: 'Перспективы',
    },
  };
}

const ManagePosts = () => {
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [isFormValid, setIsFormValid] = React.useState(false);
  const { request } = useHttp();
  const history = useHistory();
  const auth = React.useContext(AuthContext);

  //form validation
  function validateControl(value, validation, shouldValidate) {
    let isValid = true;
    let error = [];

    if (!validation || !shouldValidate) {
      return { isValid, error };
    }

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }

    return { isValid, error };
  }

  const onInputChangeHandler = (event, controlName) => {
    const form = { ...formControls };
    const control = { ...form[controlName] };
    control.value = event.target.value;
    control.touched = true;
    const validation = validateControl(control.value, control.validation, control.shouldValidate);
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

  const onSendClickHandler = async () => {
    try {
      let specialityFields = {};
      for (let key in formControls) {
        let value = formControls[key].value;
        specialityFields[key] = value;
      }
      const data = await request(
        '/api/spec/add',
        'POST',
        { specialityFields },
        { Authorization: `Bearer ${auth.token}` },
      );
      console.log(data);
      history.push(`/specialities/${data.spec._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header logo={logo} style={2} title="Управление постами"></Header>
      {renderInputs()}
      <button disabled={!isFormValid} onClick={onSendClickHandler}>
        Отправить
      </button>
    </div>
  );
};

export default ManagePosts;
