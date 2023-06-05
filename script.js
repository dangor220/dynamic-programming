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

function getBestResult(quanta, time) {
	const result = [];
	const arr = new Array(time + 1);
	let prevArr = [];

	for (const [keyLevel, level] of Object.entries(quanta)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			for (const [index] of arr.entries()) {
				if (quant.time <= index) {
					let freeTime = index - quant.time;
					if (freeTime && prevArr.length) {
						if (prevArr[freeTime].hasOwnProperty(keyQuant)) {
							prevArr[index].max > quant.score + prevArr[freeTime].max - prevArr[freeTime][keyQuant].score ?
								arr[index] = prevArr[index] :
								arr[index] = {...prevArr[freeTime], max:quant.score + prevArr[freeTime].max - prevArr[freeTime][keyQuant].score, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}}
						} else {
							prevArr[index].max > quant.score + prevArr[freeTime].max ? 
								arr[index] = prevArr[index] :
								arr[index] = {...prevArr[freeTime], max: quant.score + prevArr[freeTime].max, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}}
						}
					} else {
						prevArr.length && prevArr[index].max > quant.score ? (arr[index] = prevArr[index]) : (arr[index] = { max: quant.score, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}});
					}
				}
			}
			result.push(arr[arr.length - 1]);
			prevArr = JSON.parse(JSON.stringify(arr));
		}
	}
	
	return result[result.length - 1];
}

console.log(getBestResult(semanticQuanta, totalTime));
