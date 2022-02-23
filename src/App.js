import styled from "styled-components";
import Layout from "./components/layout/layout";
import Title from "./components/section/Title";
import Board from "./components/board/Board";
import Background from "./components/background/Background";

function App() {
  return (
    <Layout>
      <Wrapper>
        <Title title="Vikings" version="1.0.0" />
        <BoardWrapper>
          <Board />
        </BoardWrapper>
        <Background />
      </Wrapper>
    </Layout>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  background: rgba(255, 245, 225, 0.8);
`;

const BoardWrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 600px;
`;
