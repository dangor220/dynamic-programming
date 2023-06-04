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

const totalTime = 18;

function getAllOptions(quanta, time) {
	const options = [];

	const matrix = new Array(time + 1).fill(0);
	let oldMatrix = [];

	for (const [keyLevel, level] of Object.entries(quanta)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			let freeTime = 0;

			for (const [index] of matrix.entries()) {
				if (quant.time <= index) {
					freeTime = index - quant.time;

					if (matrix[index] === 0) {
						matrix[index] = {
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					} else if (freeTime && oldMatrix.length !== 0) {
						matrix[index] = {
							...oldMatrix[freeTime],
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					} else {
						matrix[index] = {
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					}
				}
			}

			options.push(matrix[matrix.length - 1]);
			oldMatrix = JSON.parse(JSON.stringify(matrix));
		}
	}

	options.push(Object.values(quanta.base).length);

	return options;
}

function getBestResult(results) {
	
	let max = 0,
		time = 0,
		quants = '';

	let completeCompetition = results.filter(
		(item) => Object.keys(item).length === results[results.length - 1]
	);

	if (completeCompetition.length === 0) {
		return `It's impossible to study all semantic quanta in a given time`;
	}

	completeCompetition.forEach((item) => {
		let currrentMax = 0,
			currentTime = 0,
			currentQuants = '';

		for (const [key, value] of Object.entries(item)) {
			currrentMax += value.score;
			currentTime += value.time;
			currentQuants += `The semantic quantum "${key}" can be studied at the level "${value.keyLevel}" in "${value.score}" points for "${value.time}" time units. \n`;
		}

		if (max < currrentMax) {
			max = currrentMax;
			time = currentTime;
			quants = currentQuants;
		} else if (max === currrentMax) {
			if (currentTime < time) {
				max = currentMax;
				time = currentTime;
			}
		}
	});

	return `The maximum possible level of mastering - "${max}" points for "${time}" time units, where:\n${quants}`;
}

console.log(getBestResult(getAllOptions(semanticQuanta, totalTime)))