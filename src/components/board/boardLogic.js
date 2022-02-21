const isBoardStringWellFormed = (boardString) => {
	const bStrLen = boardString.length;
	if (bStrLen < 20 || bStrLen > 26 || bStrLen % 2 !== 0) {
		return false;
	}
	let numOfN = 0;
	let numOfO = 0;
	let numOf0123 = 0;
	boardString
		.substring(0, 18)
		.split("")
		.forEach((char) => {
			if (char === "N") {
				numOfN++;
			} else if (char === "O") {
				numOfO++;
			} else if ("0123".includes(char)) {
				numOf0123++;
			}
		});
	if (numOfN !== 6 || numOfO !== 3 || numOf0123 !== 9) {
		return false;
	}
	const validBoatsState = {};
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		.split("")
		.forEach((char) => {
			validBoatsState[char] = 0;
		});
	"BGRYabcdefghijklmnopqrstuvwx".split("").forEach((char) => {
		validBoatsState[char] += 1;
	});
	// console.log(validBoatsState);
	boardString
		.substring(18)
		.split("")
		.forEach((char) => {
			validBoatsState[char] -= 1;
		});
	// console.log(validBoatsState);
	return Object.values(validBoatsState).every((val) => val >= 0);
};

// console.log(isBoardStringWellFormed("O1N1N1N0O1N2N0N3O1GpYx"));
// console.log(isBoardStringWellFormed("O1N1O0N3N1N2N3N3O1BlGh"));
// console.log(isBoardStringWellFormed("N0N3N1O0O1O0N4N3N2RfYnGt"));
// console.log(isBoardStringWellFormed("O1O0N1O1N2N2N3N2R2RaBhYo"));

const doTilesOverlap = (boardString, position1, position2) => {
	if (position1 > position2) {
		[position1, position2] = [position2, position1];
	}
	// console.log(position1, position2);
	let tile1 = boardString.substring(2 * position1, 2 * position1 + 2);
	let tile2 = boardString.substring(2 * position2, 2 * position2 + 2);
	const needCheckRight = "01 12 34 45 67 78";
	const needCheckDown = "03 36 14 47 25 58";
	let relativePositions = "" + position1 + position2;
	if (needCheckRight.includes(relativePositions)) {
		return checkRight(tile1, tile2);
	} else if (needCheckDown.includes(relativePositions)) {
		return checkDown(tile1, tile2);
	}
	return false;
};

const checkDown = (tile1, tile2) => {
	if (tile1 === "O0" || tile1 === "O2") {
		if ("O0 O2 N0 N1".includes(tile2)) {
			return true;
		}
	}
	if (tile1 === "N2" || tile1 === "N3") {
		if ("O0 O2 N0 N1".includes(tile2)) {
			return true;
		}
	}
	return false;
};

const checkRight = (tile1, tile2) => {
	if (tile1 === "O1" || tile1 === "O3") {
		if ("O1 O3 N0 N3".includes(tile2)) {
			return true;
		}
	}
	if (tile1 === "N1" || tile1 === "N2") {
		if ("O1 O3 N0 N3".includes(tile2)) {
			return true;
		}
	}
	return false;
};

// console.log(doTilesOverlap("O1N1O0N3N1N2N3N3O1BlGh", 0, 1));
// console.log(doTilesOverlap("O0O1N2O1N3N2N1N2N2BcYiRrGv", 4, 3));

const isBoardStringValid = (boardString) => {
	if (isBoardStringWellFormed(boardString)) {
		const boardEdges = [];
		boardString
			.substring(18)
			.split("")
			.filter((ele, index) => index % 2 === 1)
			.forEach((ele) => {
				boardEdges.push(ele);
			});
		boardEdges.sort();
		for (let i = 0; i < boardEdges.length - 1; i++) {
			if (boardEdges[i] === boardEdges[i + 1]) {
				return false;
			}
		}
		for (let i = 0; i < 9; i++) {
			for (let j = i + 1; j < 9; j++) {
				if (doTilesOverlap(boardString, i, j)) {
					return false;
				}
			}
		}
	} else {
		return false;
	}
	return true;
};

// console.log(isBoardStringValid("O1N1O0N3N1N2N3N3O1BlGh")); // true
// console.log(isBoardStringValid("N0N3N1O0O1O0N3N3N2GtRfYn")); // true
// console.log(isBoardStringValid("N0N0N3O1O0O1N1N2N2RcBgGqYrRq")); // false

const doTilesInterlock = (boardString, position1, position2) => {
	if (position1 > position2) {
		[position1, position2] = [position2, position1];
	}
	const tile1 = boardString.substring(2 * position1, 2 * position1 + 2);
	const tile2 = boardString.substring(2 * position2, 2 * position2 + 2);
	const needCheckRight = "01 12 34 45 67 78";
	const needCheckDown = "03 36 14 47 25 58";
	let relativePositions = "" + position1 + position2;
	if (needCheckRight.includes(relativePositions)) {
		if (tile1 === "O0" || tile1 === "O2" || tile1 === "N0" || tile1 === "N3") {
			return !"O0 O2 N1 N2".includes(tile2);
		} else {
			return true;
		}
	}
	if (needCheckDown.includes(relativePositions)) {
		if (tile1 === "O1" || tile1 === "O3" || tile1 === "N0" || tile1 === "N1") {
			return !"O1 O3 N2 N3".includes(tile2);
		} else {
			return true;
		}
	}
	return false;
};

// console.log(doTilesInterlock("N0N3N1O0O1O0N3N3N2GtRfYn", 4, 5)); // true
// console.log(doTilesInterlock("N0N3N1O0O1O0N3N3N2GtRfYn", 0, 1)); // true
// console.log(doTilesInterlock("N0N3N1O0O1O0N3N3N2GtRfYn", 4, 7)); // false

const boatAtPosition = {
	0: "aehd",
	1: "bfie",
	2: "cgjf",
	3: "hlok",
	4: "impl",
	5: "jnqm",
	6: "osvr",
	7: "ptws",
	8: "quxt",
};

const canRotateTile = (boardString, position) => {
	let hasAtLeastOneBoat = false;

	boardString
		.substring(18)
		.split("")
		.filter((ele, index) => index % 2 === 1)
		.forEach((ele) => {
			if (boatAtPosition[position].includes(ele)) {
				hasAtLeastOneBoat = true;
			}
		});
	if (!hasAtLeastOneBoat) {
		// console.log("no boat at position " + position);
		return false;
	}
	let canRotate = true;
	if ("0 1 3 4 6 7".includes("" + position)) {
		canRotate = canRotate && checkRightRotation(boardString, position);
	}
	// if (!canRotate) {
	// 	console.log("cannot rotate right");
	// }
	if ("1 2 4 5 7 8".includes("" + position)) {
		canRotate = canRotate && checkLeftRotation(boardString, position);
	}
	// if (!canRotate) {
	// 	console.log("cannot rotate left");
	// }
	if ("0 3 1 4 2 5".includes("" + position)) {
		canRotate = canRotate && checkDownRotation(boardString, position);
	}
	// if (!canRotate) {
	// 	console.log("cannot rotate down");
	// }
	if ("3 6 4 7 5 8".includes("" + position)) {
		canRotate = canRotate && checkUpRotation(boardString, position);
	}
	// if (!canRotate) {
	// 	console.log("cannot rotate up");
	// }
	return canRotate;
};

const checkUpRotation = (boardString, position) => {
	const tile = boardString.substring(2 * position, 2 * position + 2);
	if ("O0 O2 N0 N1".includes(tile)) {
		return true;
	} else {
		return !doTilesInterlock(boardString, position, position - 3);
	}
};

const checkDownRotation = (boardString, position) => {
	const tile = boardString.substring(2 * position, 2 * position + 2);
	if ("O0 O2 N2 N3".includes(tile)) {
		return true;
	} else {
		return !doTilesInterlock(boardString, position, position + 3);
	}
};

const checkLeftRotation = (boardString, position) => {
	const tile = boardString.substring(2 * position, 2 * position + 2);
	if ("O1 O3 N0 N3".includes(tile)) {
		return true;
	} else {
		return !doTilesInterlock(boardString, position, position - 1);
	}
};

const checkRightRotation = (boardString, position) => {
	const tile = boardString.substring(2 * position, 2 * position + 2);
	if ("O1 O3 N1 N2".includes(tile)) {
		return true;
	} else {
		return !doTilesInterlock(boardString, position, position + 1);
	}
};

const rotateTile = (boardString, position) => {
	return boatRotated(tileRotated(boardString, position), position);
};

const tileRotated = (boardString, position) => {
	const orientationRotated =
		(Number(boardString.substring(2 * position + 1, 2 * position + 2)) + 1) % 4;
	return (
		boardString.substring(0, 2 * position + 1) +
		orientationRotated +
		boardString.substring(2 * position + 2)
	);
};

const boatRotated = (boardString, position) => {
	const allBoatsAtPosition = boatAtPosition[position].split("");
	// console.log(allBoatsAtPosition);
	let boatLocations = boardString
		.substring(18)
		.split("")
		.filter((ele, index) => {
			return index % 2 === 1 && allBoatsAtPosition.includes(ele);
		});
	// console.log(boatLocations);
	const boatsIndexInBoardString = boatLocations.map((ele) =>
		boardString.indexOf(ele)
	);
	boatLocations = boatLocations.map((ele) => {
		// console.log(allBoatsAtPosition.indexOf(ele));
		// console.log(allBoatsAtPosition[(allBoatsAtPosition.indexOf(ele) + 1) % 4]);
		return allBoatsAtPosition[(allBoatsAtPosition.indexOf(ele) + 1) % 4];
	});
	// console.log(boatLocations);
	if (boatLocations.length === 1) {
		return (
			boardString.substring(0, boatsIndexInBoardString[0]) +
			boatLocations[0] +
			boardString.substring(boatsIndexInBoardString[0] + 1)
		);
	}
	if (boatLocations.length === 2) {
		return (
			boardString.substring(0, boatsIndexInBoardString[0]) +
			boatLocations[0] +
			boardString.substring(
				boatsIndexInBoardString[0] + 1,
				boatsIndexInBoardString[1]
			) +
			boatLocations[1] +
			boardString.substring(boatsIndexInBoardString[1] + 1)
		);
	}
};

// console.log(rotateTile("O0O1O0N3N1N2N3N3N2Gp", 7) === "O0O1O0N3N1N2N3N0N2Gt"); // true
// console.log(rotateTile("N0O1N1N0O0O1N0N3N1Rt", 8) === "N0O1N1N0O0O1N0N3N2Rq"); // true
// console.log(canRotateTile("N0N1N1O0O1O0N3N3N2GtReYn", 1));

const findSolution = (boardString, target) => {
	const q = [];
	const boards = [];
	const steps = [];
	const uniqueBoards = new Set();
	for (let i = 0; i < 9; i++) {
		if (canRotateTile(boardString, i)) {
			q.push(i);
			boards.push(boardString);
			steps.push("");
		}
	}
	uniqueBoards.add(boardString);
	while (true) {
		let sz = q.length;
		for (let i = 0; i < sz; i++) {
			let rotateAtPosition = q.shift();
			let currentBoard = boards.shift();
			let currentStep = steps.shift();
			// rotate once
			let rotated1Board = rotateTile(currentBoard, rotateAtPosition);
			let next1Step = currentStep + rotateAtPosition;
			if (isGameOver(rotated1Board, target)) {
				return next1Step;
			} else {
				if (uniqueBoards.has(rotated1Board)) {
					continue;
				} else {
					uniqueBoards.add(rotated1Board);
				}
				for (let j = 0; j < 9; j++) {
					if (j === rotateAtPosition) {
						continue;
					}
					if (canRotateTile(rotated1Board, j)) {
						q.push(j);
						boards.push(rotated1Board);
						steps.push(next1Step);
					}
				}
			}
			// rotate twice
			let rotated2Board = rotateTile(currentBoard, rotateAtPosition);
			rotated2Board = rotateTile(rotated2Board, rotateAtPosition);
			let next2Steps = currentStep + rotateAtPosition + "" + rotateAtPosition;
			if (isGameOver(rotated2Board, target)) {
				return next2Steps;
			} else {
				if (uniqueBoards.has(rotated2Board)) {
					continue;
				} else {
					uniqueBoards.add(rotated2Board);
				}
				for (let j = 0; j < 9; j++) {
					if (j === rotateAtPosition) {
						continue;
					}
					if (canRotateTile(rotated2Board, j)) {
						q.push(j);
						boards.push(rotated2Board);
						steps.push(next2Steps);
					}
				}
			}
			// rotate thrice
			let rotated3Board = rotateTile(currentBoard, rotateAtPosition);
			rotated3Board = rotateTile(rotated3Board, rotateAtPosition);
			rotated3Board = rotateTile(rotated3Board, rotateAtPosition);
			let next3Steps =
				currentStep +
				rotateAtPosition +
				"" +
				rotateAtPosition +
				"" +
				rotateAtPosition;
			if (isGameOver(rotated3Board, target)) {
				return next3Steps;
			} else {
				if (uniqueBoards.has(rotated3Board)) {
					continue;
				} else {
					uniqueBoards.add(rotated3Board);
				}
				for (let j = 0; j < 9; j++) {
					if (j === rotateAtPosition) {
						continue;
					}
					if (canRotateTile(rotated3Board, j)) {
						q.push(j);
						boards.push(rotated3Board);
						steps.push(next3Steps);
					}
				}
			}
		}
	}
};

const isGameOver = (boardString, target) => {
	return boardString.substring(18) === target;
};

export { canRotateTile, rotateTile, findSolution, isGameOver };
