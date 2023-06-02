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
const maxTime = 7;

function getAllVariants(quanta, time) {
	const results = [];
	let oldMatrix = [];
	let matrix = new Array(time + 1).fill(0);

	for (const [keyLevel, level] of Object.entries(quanta)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			let count = 0;

			matrix.forEach((item, index, arr) => {
				if (quant.time <= index) {
					count = index - quant.time;
					
					if (arr[index] === 0) {
						arr[index] = {
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					} else {
						arr[index] = {
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					}

					if (count && oldMatrix.length !== 0) {
						arr[index] = {
							...oldMatrix[count],
							[keyQuant]: { keyLevel, score: quant.score, time: quant.time },
						};
					}

				}
			});
			
			results.push(matrix[matrix.length - 1]);
			oldMatrix = JSON.parse(JSON.stringify(matrix));
		}
	}

	return results;
}

function getBestResult(results) {
	let max = 0;
	let time = 0;
	let quants = '';
	let completeCompetition = results.filter(item => Object.keys(item).length === 3);

	completeCompetition.forEach((item) => {
		let currrentMax = 0;
		let currentTime = 0;
		let currentQuants = '';

		for (const [key,value] of Object.entries(item)) {
			currrentMax += value.score;
			currentTime += value.time;
			currentQuants += `Занятие: ${key} Уровень: ${value.keyLevel} в ${value.score} баллов за ${value.time} ч.;\n`
		}

		if (max < currrentMax) {
			max = currrentMax;
			time = currentTime;
			quants = currentQuants;
		}

		// Если баллов одинаково, проверяем сколько меньше времени потребовалось на освоение (меньше - лучше);

		if (max === currrentMax) {
			if (currentTime < time) {
				max = currentMax;
				time = currentTime;
			}
		}
	})

	console.log(completeCompetition);


	return `Максимальное число баллов ${max} за ${time} времени:\n${quants}`
}

const variants = getAllVariants(semanticQuanta, maxTime);
const results = getBestResult(variants);

console.log(results)
