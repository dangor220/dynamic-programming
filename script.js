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
const totalTime = 11;

function getBestResult(setQuants, totalTime) {
	const result = [];
	const arr = new Array(totalTime + 1);
	let prevArr = [];

	for (const [keyLevel, level] of Object.entries(setQuants)) {
		for (const [keyQuant, quant] of Object.entries(level)) {
			for (const [index] of arr.entries()) {
				if (quant.time <= index) {
					let leftTime = index - quant.time;
					if (leftTime && prevArr.length) {
						if (prevArr[leftTime].hasOwnProperty(keyQuant)) {
							prevArr[index].max > quant.score + prevArr[leftTime].max - prevArr[leftTime][keyQuant].score ?
								arr[index] = prevArr[index] :
								arr[index] = {...prevArr[leftTime], max:quant.score + prevArr[leftTime].max - prevArr[leftTime][keyQuant].score, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}}
						} else {
							prevArr[index].max > quant.score + prevArr[leftTime].max ? 
								arr[index] = prevArr[index] :
								arr[index] = {...prevArr[leftTime], max: quant.score + prevArr[leftTime].max, [keyQuant]: { keyLevel, time: quant.time, score: quant.score}}
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

	return Object.values(result[result.length - 1]).length - 1 === Object.values(setQuants.base).length ? 
					result[result.length - 1] : 
					`It is impossible to master every quantum in ${totalTime} units of time`;
}

console.log(getBestResult(semanticQuanta, totalTime));
