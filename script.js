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
const totalTime = 7;

function getBestResult(quanta, time) {
	const result = [];
	const matrix = new Array(time + 1);
	let oldMatrix = [];

	for (const [keyLevel, level] of Object.entries(quanta)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			for (const [index] of matrix.entries()) {
				if (quant.time <= index) {
					let freeTime = index - quant.time;
					if (freeTime && oldMatrix.length) {
						if (oldMatrix[freeTime].hasOwnProperty(keyQuant)) {
							if (oldMatrix[index].max > quant.score + oldMatrix[freeTime].max - oldMatrix[freeTime][keyQuant].score) {
								matrix[index] = oldMatrix[index];
							} else {
								matrix[index] = {...oldMatrix[freeTime], max:quant.score + oldMatrix[freeTime].max - oldMatrix[freeTime][keyQuant].score,[keyQuant]: { keyLevel, time: quant.time, score: quant.score}};
							}
						} else {
							if (oldMatrix[index].max > quant.score + oldMatrix[freeTime].max) {
								matrix[index] = oldMatrix[index];
							} else {
								matrix[index] = {...oldMatrix[freeTime], max: quant.score + oldMatrix[freeTime].max, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}};
							}
						}
					} else {
						oldMatrix.length && oldMatrix[index].max > quant.score ? (matrix[index] = oldMatrix[index]) : (matrix[index] = { max: quant.score, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}});
					}
				}
			}
			result.push(matrix[matrix.length - 1]);
			oldMatrix = JSON.parse(JSON.stringify(matrix));
		}
	}

	return result[result.length - 1];
}

console.log(getBestResult(semanticQuanta, totalTime));
