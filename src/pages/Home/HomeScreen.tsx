import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Logo from '../../img/Logo.svg';
import './HomeScreen.css';
import axios from "axios";
import { useNavigate } from 'react-router';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const Home: React.FC = () => {
    const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post(
        'https://api.homologation.cliqdrive.com.br/auth/login/',
        values,
        {
          headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Usuário logado com sucesso:', response.data);
      // Redirecionar para a próxima página, se necessário
      localStorage.setItem('token', "Logado");
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erro de login:', error.response?.data);
        // Tratar erros de login, como exibir uma mensagem para o usuário
      } else {
        console.error('Erro de login:', error);
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
    } else if (values.password.length < 3) {
      errors.password = 'A senha deve ter pelo menos 3 caracteres';
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

export default Home;