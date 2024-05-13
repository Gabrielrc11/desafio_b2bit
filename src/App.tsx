import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Logo from './img/Logo.svg';
import './App.css';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const App: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    // Aqui você pode lidar com os valores do formulário
    console.log(values);
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
      errors.email = 'Campo obrigatório';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Email inválido';
    }

    if (!values.password) {
      errors.password = 'Campo obrigatório';
    } else if (values.password.length < 3) {
      errors.password = 'A senha deve ter pelo menos 3 caracteres';
    }

    return errors;
  };

  const isValidEmail = (email: string) => {
    // Lógica de validação de e-mail simples
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="App">
      <div className="App-container">
        <img src={Logo} className="Logo" alt="Logo" />
        <div className="App-form">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <br></br>
                  <Field type="email" name="email" className="form-control-mail" placeholder="@gmail.com"/>
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <br></br>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <Field type="password" name="password" className="form-control-pass" placeholder="****************"/>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <br></br>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  Sign in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default App;