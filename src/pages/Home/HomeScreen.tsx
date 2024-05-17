import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router';
import axios from "../../BaseService";

import Logo from '../../img/Logo.svg';
import './HomeScreen.css';


interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post(
        'https://api.homologation.cliqdrive.com.br/auth/login/',
        values,
      );
      localStorage.setItem('token', JSON.stringify(response.data.tokens.access));
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert("E-mail e/ou senha incorreto(s)");
      } else {
        alert("Erro de login");
      }
    }
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
    }
    return errors;
  };

  const isValidEmail = (email: string) => {
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
                  <Field type="email" name="email" className="Form-field-email" placeholder="@gmail.com"/>
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <br></br>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <Field type="password" name="password" className="Form-field-password" placeholder="****************"/>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <br></br>

                <button type="submit" className="Button-submit" disabled={isSubmitting}>
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

export default HomeScreen;