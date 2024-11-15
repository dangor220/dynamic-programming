const data = [
  [1, 2, 3, 4, 5],

  [9, 10, 13, 15, 18],
  [6, 8, 9, 11, 16],
  [4, 5, 10, 13, 15],
  [7, 9, 11, 14, 15],
];

let q = 0.5;
let T_0 = data[0].at(-1);

function conditionalOptimization(data, q) {
  const conditionalMaximums = {};

  for (let k = data.length - 1; k > 0; k--) {
    conditionalMaximums[`Z_${k}`] = {};

    for (const T of data[0]) {
      for (let t = T; t > 0; t -= data[0][0]) {
        const currLevel = data[k][data[0].indexOf(t)];

        if (currLevel === 0) continue;

        if (conditionalMaximums[`Z_${k + 1}`]) {
          let T_k = T - t + Math.max((t - data[0].at(0)) * q, 0);

          if (!conditionalMaximums[`Z_${k + 1}`][T_k]) T_k = Math.floor(T_k);

          T_k = Math.min(T_k, data[0].at(-1));

          if (T_k === 0 || t === 0 || !conditionalMaximums[`Z_${k + 1}`][T_k]) continue;

          const Z_max = currLevel + conditionalMaximums[`Z_${k + 1}`][T_k][0];

          if (!conditionalMaximums[`Z_${k}`][T] || conditionalMaximums[`Z_${k}`][T][0] < Z_max) {
            conditionalMaximums[`Z_${k}`][T] = [Z_max, t];
          }
        } else {
          conditionalMaximums[`Z_${k}`][t] = [currLevel, t];
        }
      }
    }
  }
  return conditionalMaximums;
}

function unconditionalOptimization(conditionalMaximums, data, q) {
  const distribution = [];
  let T = data[0].at(-1);

  for (let i = 1; i <= Object.keys(conditionalMaximums).length; i++) {
    let time;

    if (T > data[0].at(-1)) {
      time = conditionalMaximums[`Z_${i}`][data[0].at(-1)][1];
    } else if (!conditionalMaximums[`Z_${i}`][T]) {
      time = conditionalMaximums[`Z_${i}`][Math.floor(T)][1];
    } else {
      time = conditionalMaximums[`Z_${i}`][T][1];
    }

    T = T - time + Math.max((time - data[0].at(0)) * q, 0);
    distribution.push(`t_${i}: ${time}`);
  }
  return distribution;
}

let optimization = unconditionalOptimization(conditionalOptimization(data, q), data, q);
console.table(conditionalOptimization(data, q));
console.log(optimization);
