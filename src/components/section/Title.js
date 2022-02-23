import React from "react";
import styled from "styled-components";

const Title = ({ title, version }) => {
  return (
    <Wrapper>
      <TitleWrapper>
        {title}
        <Version>{version}</Version>
      </TitleWrapper>
    </Wrapper>
  );
};

export default Title;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  padding: 10px;
  margin: 0 auto 80px;
`;

const TitleWrapper = styled.h1`
  display: flex;
  font-family: Akronim;
  font-style: normal;
  font-weight: normal;
  font-size: 96px;
  line-height: 110px;
  color: #000000;
`;

const Version = styled.p`
  position: absolute;
  font-family: "SF Pro Text";
  font-size: 12px;
  top: -20px;
  right: calc(50% - 150px);
`;
