import GenericForm from 'common/GenericForm';
import Input from 'common/input/Input';
import { User } from 'models/user.model';
import AppPagesEnum from 'pages/pages.enum';
import { useAppContext } from 'providers/app.provider';
import { Role, useAuth } from 'providers/auth.provider';
import React, { useState } from 'react';
import { FiInfo, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

const Alert = styled.div`
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  display: flex;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  justify-content: space-between;
  align-items: center;
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
`;

const RegisterPage = () => {
  const { push } = useHistory();
  const { signUp } = useAuth();
  const { showSnackbar } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [restaurantOwner, setRestaurantOwner] = useState(false);

  async function onSubmit(data: User) {
    try {
      setErrorMessage(undefined);

      if (signUp) {
        setLoading(true);

        const roles = restaurantOwner ? `{"${Role.RestaurantOwner}"}` : `{"${Role.User}"}`;

        await signUp({ ...data, roles }).then(() => {
          showSnackbar?.({
            variant: 'success',
            message: 'Your account has been created successfully'
          });
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to sign up. Please try again!');
    }
  }

  const wait = (
    <div className="d-flex align-items-center justify-content-center">
      <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
      Wait...
    </div>
  );

  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Provide a valid email'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match')
  });

  return (
    <GenericForm onValidate={onSubmit} validationSchema={validationSchema} className="fadeIn">
      <h1>Register.</h1>
      <h5 className="small mb-4">Provide the following information to create your account</h5>
      {showAlert && (
        <Alert className="fadeIn" role="alert">
          <div className="d-flex align-items-center">
            <span className="me-2">
              <FiInfo size="16" />
            </span>
            <div>{errorMessage}</div>
          </div>

          <button
            type="button"
            className="btn p-0"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}>
            <FiX size="16" />
          </button>
        </Alert>
      )}
      <Input
        type="text"
        name="name"
        className="mb-4"
        label="Your name"
        placeholder="Provide your name and surname"
      />
      <Input
        type="email"
        name="email"
        className="mb-4"
        label="Your e-mail"
        placeholder="name@domain.com"
      />
      <Input
        type="password"
        name="password"
        className="mb-4"
        label="Password"
        placeholder="At least 8 characters"
      />
      <Input
        type="password"
        name="confirmPassword"
        className="mb-4"
        label="Confirm password"
        placeholder="Passwords must match"
      />

      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={restaurantOwner}
          onChange={(event) => setRestaurantOwner(event.target.checked)}
        />
        <label className="form-check-label">Restaurant Owner</label>
      </div>

      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" value="" />
        <label className="form-check-label">
          Ive read and accept the
          <span className="text-primary ms-1 fw-bold">
            <a href="http://google.com">terms & conditions</a>
          </span>
        </label>
      </div>
      <button type="submit" className="btn btn-primary py-2 w-100 mb-4" disabled={loading}>
        {loading ? wait : 'Register'}
      </button>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div>Already have an account?</div>

        <button
          type="button"
          className="btn text-primary p-0 ms-1"
          onClick={() => push(AppPagesEnum.Login)}>
          <strong>Log in</strong>
        </button>
      </div>
    </GenericForm>
  );
};

export default RegisterPage;
