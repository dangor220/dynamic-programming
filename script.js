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
const maxTime = 20;

function getMaxResult(quanta, time) {
  const results = [];
	const matrix = new Array(time).fill(0);

  for (const [keyLevel, level] of Object.entries(quanta)) {
    for (const [keyQuant, quant] of Object.entries(level)) {

      matrix.forEach((item, index, arr) => {
        if (quant.time <= index) {
          arr[index] = [quant.score, keyLevel, keyQuant];
        }
      })
      
     console.log(matrix);
    }
    
  }
}

getMaxResult(semanticQuanta, maxTime);
