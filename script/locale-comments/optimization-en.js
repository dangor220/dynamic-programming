// The data array, where the first element is a subarray with the time to be distributed,
// and the remaining elements are subarrays of lessons, consisting of possible levels of mastery at the given time.
const data = [
  [1, 2, 3, 4, 5],

  [9, 10, 13, 15, 18],
  [6, 8, 9, 11, 16],
  [4, 5, 10, 13, 15],
  [7, 9, 11, 14, 15],
];

let q = 0.5; // The time increment factor for a higher level of mastery in the previous lesson.
let T_0 = data[0].at(-1); // The total time to be distributed.

// Declaration of the conditional optimization function.
function conditionalOptimization(data, q) {
  const conditionalMaximums = {}; // Object holding data with conditional maxima.

  for (let k = data.length - 1; k > 0; k--) {
    // Iteration through each step of the controlled process, starting from the last.
    conditionalMaximums[`Z_${k}`] = {}; // Create an object for the conditional maximum at step k.
    for (const T of data[0]) {
      // Iterating through the array with the time to be distributed.
      for (let t = T; t > 0; t -= data[0][0]) {
        // Getting valid time values.                 TODO: t should decrease in steps t_1 - t_2
        const currLevel = data[k][data[0].indexOf(t)]; // Getting the mastery level at the current step.               TODO: (!!! removed || 0) the index should be taken from the data[0] array based on the value of data[k][data[0].indexOf(t)];

        if (currLevel === 0) continue; // If the mastery level is zero, skip the iteration
        // (each lesson must be mastered).
        if (conditionalMaximums[`Z_${k + 1}`]) {
          // If a conditional maximum exists at the previous step.
          let T_k = T - t + Math.max((t - data[0].at(0)) * q, 0); // Getting the available time for distribution, considering
          // the condition of a higher mastery level at the given t.
          // If there is no conditional maximum for the given time T_k, round it down to the nearest integer.
          if (!conditionalMaximums[`Z_${k + 1}`][T_k]) T_k = Math.floor(T_k);
          // Skip the iteration if the lesson is not mastered.
          T_k = Math.min(T_k, data[0].at(-1)); // T_k cannot exceed the total time to be distributed.
          if (T_k === 0 || t === 0 || !conditionalMaximums[`Z_${k + 1}`][T_k]) continue;

          const Z_max = currLevel + conditionalMaximums[`Z_${k + 1}`][T_k][0]; // Getting the conditional maximum.
          // Record the conditional maximum in the object.
          if (!conditionalMaximums[`Z_${k}`][T] || conditionalMaximums[`Z_${k}`][T][0] < Z_max) {
            conditionalMaximums[`Z_${k}`][T] = [Z_max, t];
          }
        } else {
          conditionalMaximums[`Z_${k}`][t] = [currLevel, t]; // Record the conditional maximum in the object.
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
