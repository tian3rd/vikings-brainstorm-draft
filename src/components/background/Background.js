import React from "react";
import styled from "styled-components";
import wave from "../../assets/images/Wave.svg";

const Background = () => {
  return (
    <Wrapper>
      <Wave src={wave} alt="wave" />
    </Wrapper>
  );
};

export default Background;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 200px;
`;

const Wave = styled.img`
  position: absolute;
  width: 100%;
  height: 323.61px;
  top: -203px;
  z-index: 1;
`;
