import illustration from 'assets/illustrations/food-amico.svg';
import AppPagesEnum from 'pages/pages.enum';
import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import AccessRoutes from './access.routes';

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;

  .left-block {
    flex: 1;
    display: flex;
    align-items: center;

    .content {
      width: 60%;
      margin: auto;
    }
  }

  .right-block {
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, rgba(245, 245, 245, 1) 0%, rgba(230, 230, 250, 1) 110%);

    img {
      width: 60%;
    }
  }
`;

const AccessPage = () => {
  const { push } = useHistory();

  useEffect(() => {
    push(AppPagesEnum.Login);
  }, []);

  return (
    <LoginPageContainer className="fadeIn">
      <div className="d-flex h-100 align-items-stretch">
        <div className="left-block">
          <div className="content">
            <Switch>{AccessRoutes()}</Switch>
          </div>
        </div>
        <div className="right-block">
          <img src={illustration} alt="menu" />
        </div>
      </div>
    </LoginPageContainer>
  );
};

export default AccessPage;
