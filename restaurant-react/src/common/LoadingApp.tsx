import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: relative !important;
  width: 100vw;
  height: 100vh;
`;

export default function LoadingApp() {
  return (
    <LoadingContainer>
      <div className="center-absolute text-center">
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3">Loading, wait...</div>
      </div>
    </LoadingContainer>
  );
}
