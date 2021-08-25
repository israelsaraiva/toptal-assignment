import GenericForm from 'common/GenericForm';
import Input from 'common/input/Input';
import AppPagesEnum from 'pages/pages.enum';
import { useAuth } from 'providers/auth.provider';
import React, { useState } from 'react';
import { FiInfo, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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

export default function LoginPage() {
  const { push } = useHistory();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  async function onSubmit(data: any) {
    try {
      setShowUnauthorized(false);

      if (signIn) {
        setLoading(true);

        const { email, password } = data;

        await signIn(email, password);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setShowUnauthorized(true);
    }
  }

  const wait = (
    <div className="d-flex align-items-center justify-content-center">
      <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
      Wait...
    </div>
  );

  return (
    <GenericForm onValidate={onSubmit}>
      <h1>Log in.</h1>
      <h5 className="small mb-4">
        Log in with your data that you entered during your registration.
      </h5>

      {showUnauthorized && (
        <Alert className="fadeIn" role="alert">
          <div className="d-flex align-items-center">
            <span className="me-2">
              <FiInfo size="16" />
            </span>
            <div>Invalid email or password.</div>
          </div>

          <button
            type="button"
            className="btn p-0"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowUnauthorized(false)}>
            <FiX size="16" />
          </button>
        </Alert>
      )}

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
        placeholder="at least 8 characters"
      />

      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" value="" />
        <label className="form-check-label">Keep me logged in</label>
      </div>

      <button type="submit" className="btn btn-primary py-2 w-100 mb-4" disabled={loading}>
        {loading ? wait : 'Log in'}
      </button>

      <div className="d-flex justify-content-center align-items-center mb-3">
        <div>Dont have an account?</div>

        <button
          type="button"
          className="btn text-primary p-0 ms-1"
          onClick={() => push(AppPagesEnum.Register)}>
          <strong>Sign up</strong>
        </button>
      </div>

      <div className="text-center">
        <span className="text-primary ms-1 cursor-pointer">
          <strong>Forgot password?</strong>
        </span>
      </div>
    </GenericForm>
  );
}
