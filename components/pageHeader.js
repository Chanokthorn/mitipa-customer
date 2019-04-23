import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MitipaHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 300%;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 10vw;
  font-family: Arial, Helvetica, sans-serif;
`;

const PageHeader = () => (
  <MitipaHeader>
    <HeaderContent>
      <Fade cascade>
        mitipa <FontAwesomeIcon icon="book-reader" color="black" size="large" />
      </Fade>
    </HeaderContent>
  </MitipaHeader>
);

export default PageHeader;
