// Массив первый элемент которого является время, а остальные - занятия с возможным уровнем освоения при заданном времени
let data = [
  [1, 2, 3, 4, 5],

  [9, 10, 13, 15, 18],
  [6, 8, 9, 11, 16],
  [4, 5, 10, 13, 15],
  [7, 9, 11, 14, 15],
];
let q = 0.5; // Коэффициент прироста времени при более высоком уровне освоения

// Объявление функции
function conditionalOptimization(data, q) {
  let conditionalMaximums = {}, // объект с условными максимумами
    k = data.length - 1; // число шагов начиная с последнего

  for (let step = k; step >= 1; step--) {
    conditionalMaximums[`Z_${step}`] = {};
    for (let T of data[0]) {
      for (let t = T; t >= 0; t--) {
        let currentLevel = data[step][t - 1] || 0;

        if (conditionalMaximums[`Z_${step + 1}`]) {
          let Q = (t - data[0][0]) * q;
          if (Q < 0) Q = 0;

          let prevLevel = T - t + Q;

          if (!conditionalMaximums[`Z_${step + 1}`][prevLevel]) {
            prevLevel = Math.floor(prevLevel);
          }

          let sum = null;
          if (prevLevel === 0) {
            sum = currentLevel + 0;
          } else {
            sum =
              currentLevel + conditionalMaximums[`Z_${step + 1}`][prevLevel][0];
          }

          if (
            conditionalMaximums[`Z_${step}`][T] &&
            conditionalMaximums[`Z_${step}`][T][0] > sum
          ) {
            continue;
          } else {
            conditionalMaximums[`Z_${step}`][T] = [sum, t];
          }
        } else {
          conditionalMaximums[`Z_${step}`][t] = [currentLevel, t];
        }
      }
    }
  }
  return conditionalMaximums;
}

function unconditionalOptimization(conditionalMaximums) {
  return conditionalMaximums;
}

unconditionalOptimization(conditionalOptimization(data, q));
