// semanticQuanta[object] = { lesson: { level: { time, score}}, ...}
const semanticQuanta = {
	base: {
		quantum_1: {
			time: 1,
			score: 1,
		},
		quantum_2: {
			time: 2,
			score: 3,
		},
		quantum_3: {
			time: 4,
			score: 5,
		},
	},

	hight: {
		quantum_1: {
			time: 2,
			score: 2,
		},
		quantum_2: {
			time: 4,
			score: 4,
		},
		quantum_3: {
			time: 8,
			score: 6,
		},
	},
};
const totalTime = 20;

function getAllOptions(quanta, time) {
	const options = [];

	const matrix = new Array(time + 1).fill(0);
	let oldMatrix = [];

	for (const [keyLevel, level] of Object.entries(quanta)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			for (const [index] of matrix.entries()) {
				if (quant.time <= index) {
					if (oldMatrix.length === 0) {
						matrix[index] = {
							sum: quant.score,
							[keyQuant]: { keyLevel, time: quant.time, score: quant.score },
						};
					} else if (index - quant.time !== 0) {
						if (
							oldMatrix[index].sum >
							quant.score + oldMatrix[index - quant.time].sum
						) {
							matrix[index] = oldMatrix[index];
						} else {
							if (oldMatrix[index - quant.time].hasOwnProperty(keyQuant)) {
								matrix[index] = {
									...oldMatrix[index - quant.time],
									sum:
										quant.score +
										oldMatrix[index - quant.time].sum -
										oldMatrix[index - quant.time][keyQuant].score,
									[keyQuant]: {
										keyLevel,
										time: quant.time,
										score: quant.score,
									},
								};
							} else {
								matrix[index] = {
									...oldMatrix[index - quant.time],
									sum: quant.score + oldMatrix[index - quant.time].sum,
									[keyQuant]: {
										keyLevel,
										time: quant.time,
										score: quant.score,
									},
								};
							}
						}
					} else {
						if (oldMatrix[index].sum > quant.score) {
							matrix[index] = oldMatrix[index];
						} else {
							matrix[index] = {
								sum: quant.score,
								[keyQuant]: { keyLevel, time: quant.time, score: quant.score },
							};
						}
					}
				}
			}

			options.push(matrix[matrix.length - 1]);
			oldMatrix = JSON.parse(JSON.stringify(matrix));
		}
	}

	return options[options.length-1];
}

console.log(getAllOptions(semanticQuanta, totalTime));
