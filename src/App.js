import styled from "styled-components";
import Layout from "./components/layout/layout";
import Title from "./components/section/Title";
import Board from "./components/board/Board";
import Background from "./components/background/Background";
import { findSolution } from "./components/board/boardLogic";

function App() {
  let board = "O0O1N1N3O1N2N3N3N2BbYp";
  let target = "BdYn";
  const solution = findSolution(board, target);
  console.log("Solution: ", solution);
  return (
    <Layout>
      <Wrapper>
        <Title title="Vikings" version="1.0.0" />
        <BoardWrapper>
          <Board board={board} target={target} />
          {/* <Board board="O0O1N1N3O1N2N3N3N2BbYp" target="BdYn" /> */}
          {/* <Board board="O0N1N1N2N1O0N2O0N2Be" target="Bc" /> */}
          {/* <Board board="O1N1O0N3N1N2N3N3O1BlGh" target="BaGx" /> */}
          {/* <Board board="O0O1O0N3N1N2N3N2N2Gs" target="Gu" /> */}
          {/* <Board board="O1N1N1N0N0O0N2O0N3BaGrRoYn" target="BwGkRbYn" /> */}
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
