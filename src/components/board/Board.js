import React, { useState, useEffect } from "react";
import styled from "styled-components";
import boardSVG from "./BoardElements";
import {
  calculateTileShift,
  calculateBoatShift,
  calculateArrowShift,
  calculateBoatsState,
  calculateArrowsState,
} from "./calculateBoardLayout";
import {
  canRotateTile,
  rotateTile,
  findSolution,
  isGameOver,
} from "./boardLogic";
import puzzles from "../../data/objectives.json";

const Board = () => {
  let randomProblem = Math.floor(Math.random() * 60);
  const [boardString, setBoardString] = useState(puzzles[randomProblem].board);
  const [arrowsState, setArrowsState] = useState(
    calculateArrowsState(puzzles[randomProblem].target)
  );

  const showSolution = () => {
    const target =
      arrowsState.AB + arrowsState.AG + arrowsState.AR + arrowsState.AY;
    const solution = findSolution(boardString, target);
    console.log("Solution: ", solution);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const position = Number(e.target.title.substring(4));
    if (canRotateTile(boardString, position)) {
      const newBoard = rotateTile(boardString, position);
      setBoardString(newBoard);
    } else {
      console.log("Cannot rotate tile at position:", position);
    }
  };

  const selectChoice = (e) => {
    const choice = e.target.value;
    let problemNo;
    let randomNum = Math.floor(Math.random() * 15);
    switch (choice) {
      case "easy":
        problemNo = randomNum;
        break;
      case "medium":
        problemNo = randomNum + 15;
        break;
      case "hard":
        problemNo = randomNum + 30;
        break;
      case "expert":
        problemNo = randomNum + 45;
        break;
    }
    setBoardString(puzzles[problemNo].board);
    setArrowsState(calculateArrowsState(puzzles[problemNo].target));
  };

  useEffect(() => {
    const target =
      arrowsState.AB + arrowsState.AG + arrowsState.AR + arrowsState.AY;
    if (isGameOver(boardString, target)) {
      setTimeout(() => alert("Congratulations! You won!"), 1000);
    }
  }, [boardString, arrowsState]);

  return (
    <Wrapper>
      <BoardWrapper>
        <Tile0
          src={boardSVG[boardString.substring(0, 18).substring(0, 2)]}
          alt={boardString.substring(0, 18).substring(0, 2)}
          title="Tile0"
          onClick={handleClick}
        />
        <Tile1
          src={boardSVG[boardString.substring(0, 18).substring(2, 4)]}
          alt={boardString.substring(0, 18).substring(2, 4)}
          title="Tile1"
          onClick={handleClick}
        />
        <Tile2
          src={boardSVG[boardString.substring(0, 18).substring(4, 6)]}
          alt={boardString.substring(0, 18).substring(4, 6)}
          title="Tile2"
          onClick={handleClick}
        />
        <Tile3
          src={boardSVG[boardString.substring(0, 18).substring(6, 8)]}
          alt={boardString.substring(0, 18).substring(6, 8)}
          title="Tile3"
          onClick={handleClick}
        />
        <Tile4
          src={boardSVG[boardString.substring(0, 18).substring(8, 10)]}
          alt={boardString.substring(0, 18).substring(8, 10)}
          title="Tile4"
          onClick={handleClick}
        />
        <Tile5
          src={boardSVG[boardString.substring(0, 18).substring(10, 12)]}
          alt={boardString.substring(0, 18).substring(10, 12)}
          title="Tile5"
          onClick={handleClick}
        />
        <Tile6
          src={boardSVG[boardString.substring(0, 18).substring(12, 14)]}
          alt={boardString.substring(0, 18).substring(12, 14)}
          title="Tile6"
          onClick={handleClick}
        />
        <Tile7
          src={boardSVG[boardString.substring(0, 18).substring(14, 16)]}
          alt={boardString.substring(0, 18).substring(14, 16)}
          title="Tile7"
          onClick={handleClick}
        />
        <Tile8
          src={boardSVG[boardString.substring(0, 18).substring(16, 18)]}
          alt={boardString.substring(0, 18).substring(16, 18)}
          title="Tile8"
          onClick={handleClick}
        />
        <Boat0
          src={boardSVG.BB}
          title="BlueBoat"
          alt={calculateBoatsState(boardString.substring(18)).BB}
        />
        <Boat1
          src={boardSVG.BG}
          title="GreenBoat"
          alt={calculateBoatsState(boardString.substring(18)).BG}
        />
        <Boat2
          src={boardSVG.BR}
          title="RedBoat"
          alt={calculateBoatsState(boardString.substring(18)).BR}
        />
        <Boat3
          src={boardSVG.BY}
          title="YellowBoat"
          alt={calculateBoatsState(boardString.substring(18)).BY}
        />
        <Arrow0 src={boardSVG.AB} title="BlueArrow" alt={arrowsState.AB} />
        <Arrow1 src={boardSVG.AG} title="GreenArrow" alt={arrowsState.AG} />
        <Arrow2 src={boardSVG.AR} title="RedArrow" alt={arrowsState.AR} />
        <Arrow3 src={boardSVG.AY} title="YellowArrow" alt={arrowsState.AY} />
      </BoardWrapper>
      <SelectWrapper>
        <div>
          <RadioWrapper
            type="radio"
            name="level"
            value="easy"
            onClick={selectChoice}
          />
          <label>Easy</label>
        </div>
        <div>
          <RadioWrapper
            type="radio"
            name="level"
            value="medium"
            onClick={selectChoice}
          />
          <label>Medium</label>
        </div>
        <div>
          <RadioWrapper
            type="radio"
            name="level"
            value="hard"
            onClick={selectChoice}
          />
          <label>Hard</label>
        </div>
        <div>
          <RadioWrapper
            type="radio"
            name="level"
            value="expert"
            onClick={selectChoice}
          />
          <label>Expert</label>
        </div>
      </SelectWrapper>
      <Solution onClick={showSolution} id="solution">
        Solution
      </Solution>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  z-index: 30;
`;

const SelectWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 20px;
`;

const Solution = styled.p`
  cursor: pointer;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.1);
`;

const BoardWrapper = styled.div`
  position: relative;
  /* border: 1px solid red; */
  height: 573px;
  width: 573px;
  margin: 0 auto 50px;
`;

const RadioWrapper = styled.input``;

const Arrow0 = styled.img`
  position: absolute;
  top: ${(props) => calculateArrowShift(props.alt).top};
  left: ${(props) => calculateArrowShift(props.alt).left};
  rotate: ${(props) => calculateArrowShift(props.alt).rotate};
  visibility: ${(props) => calculateArrowShift(props.alt).visibility};
`;
const Arrow1 = styled.img`
  position: absolute;
  top: ${(props) => calculateArrowShift(props.alt).top};
  left: ${(props) => calculateArrowShift(props.alt).left};
  rotate: ${(props) => calculateArrowShift(props.alt).rotate};
  visibility: ${(props) => calculateArrowShift(props.alt).visibility};
`;
const Arrow2 = styled.img`
  position: absolute;
  top: ${(props) => calculateArrowShift(props.alt).top};
  left: ${(props) => calculateArrowShift(props.alt).left};
  rotate: ${(props) => calculateArrowShift(props.alt).rotate};
  visibility: ${(props) => calculateArrowShift(props.alt).visibility};
`;
const Arrow3 = styled.img`
  position: absolute;
  top: ${(props) => calculateArrowShift(props.alt).top};
  left: ${(props) => calculateArrowShift(props.alt).left};
  rotate: ${(props) => calculateArrowShift(props.alt).rotate};
  visibility: ${(props) => calculateArrowShift(props.alt).visibility};
`;

const Boat0 = styled.img`
  position: absolute;
  top: ${(props) => calculateBoatShift(props.alt).top};
  left: ${(props) => calculateBoatShift(props.alt).left};
  transform: rotate(${(props) => calculateBoatShift(props.alt).rotate});
  visibility: ${(props) => calculateBoatShift(props.alt).visibility};
`;
const Boat1 = styled.img`
  position: absolute;
  top: ${(props) => calculateBoatShift(props.alt).top};
  left: ${(props) => calculateBoatShift(props.alt).left};
  transform: rotate(${(props) => calculateBoatShift(props.alt).rotate});
  visibility: ${(props) => calculateBoatShift(props.alt).visibility};
`;
const Boat2 = styled.img`
  position: absolute;
  top: ${(props) => calculateBoatShift(props.alt).top};
  left: ${(props) => calculateBoatShift(props.alt).left};
  transform: rotate(${(props) => calculateBoatShift(props.alt).rotate});
  visibility: ${(props) => calculateBoatShift(props.alt).visibility};
`;
const Boat3 = styled.img`
  position: absolute;
  top: ${(props) => calculateBoatShift(props.alt).top};
  left: ${(props) => calculateBoatShift(props.alt).left};
  transform: rotate(${(props) => calculateBoatShift(props.alt).rotate});
  visibility: ${(props) => calculateBoatShift(props.alt).visibility};
`;

const Tile0 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 0).top};
  left: ${(props) => calculateTileShift(props.alt, 0).left};
`;

const Tile1 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 1).top};
  left: ${(props) => calculateTileShift(props.alt, 1).left};
`;

const Tile2 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 2).top};
  left: ${(props) => calculateTileShift(props.alt, 2).left};
`;

const Tile3 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 3).top};
  left: ${(props) => calculateTileShift(props.alt, 3).left};
`;

const Tile4 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 4).top};
  left: ${(props) => calculateTileShift(props.alt, 4).left};
`;

const Tile5 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 5).top};
  left: ${(props) => calculateTileShift(props.alt, 5).left};
`;

const Tile6 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 6).top};
  left: ${(props) => calculateTileShift(props.alt, 6).left};
`;

const Tile7 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 7).top};
  left: ${(props) => calculateTileShift(props.alt, 7).left};
`;

const Tile8 = styled.img`
  position: absolute;
  top: ${(props) => calculateTileShift(props.alt, 8).top};
  left: ${(props) => calculateTileShift(props.alt, 8).left};
`;
