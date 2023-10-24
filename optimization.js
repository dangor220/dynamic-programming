// Массив первый элемент которого является время, а остальные - занятия с возможным уровнем освоения при заданном времени
let data = [
  [1, 2, 3, 4, 5],

  [9, 10, 13, 15, 18],
  [6, 8, 9, 11, 16],
  [4, 5, 10, 13, 15],
  [7, 9, 11, 14, 15],
];
let q = 0.5; // Коэффициент прироста времени при более высоком уровне освоения
let T_0 = 5;

// Объявление функции условной оптимизации
function conditionalOptimization(data, q) {
  const conditionalMaximums = {};   // Объект с условными максимумами
  const k = data.length - 1;        // Число шагов k

  for (let step = k; step >= 1; step--) {   // Обходим каждый шаг, начиная с конца
    conditionalMaximums[`Z_${step}`] = {};  // Создаем объект с данными о условных максимумах при различном времени
    for (const T of data[0]) {              // Обход массива с данными о времени
      for (let t = T; t >= 0; t--) {        // Получаем допустимые значения t
        const currentLevel = data[step][t - 1] || 0;    // Получаем уровень освоения при заданном t или 0, если значение отсутствует

        if (conditionalMaximums[`Z_${step + 1}`]) {     // Если существует предыдущий условный максимум
          const Q = Math.max((t - data[0][0]) * q, 0);  // Находим дополнительное время Q >= 0 при заданном коэффициенте q
                                                        // (при условии повышенного уровня освоения предыдущего занятия)
          let prevLevel = T - t + Q;                    // Получаем общее время
          // Если условный максимум в предыдущем значении не достигается, округляем до целого числа в меньшую сторону
          if (!conditionalMaximums[`Z_${step + 1}`][prevLevel]) prevLevel = Math.floor(prevLevel);
          // Если общее время равняется нулю, то предыдущий условный максимум равен нулю
          const sum = prevLevel === 0 ? currentLevel : currentLevel + conditionalMaximums[`Z_${step + 1}`][prevLevel][0];
          // Добавляем значение в объекст услоовных максимумов
          if (!conditionalMaximums[`Z_${step}`][T] || conditionalMaximums[`Z_${step}`][T][0] < sum) {
            conditionalMaximums[`Z_${step}`][T] = [sum, t];
          }
        } else {
          // Добавляем значение в объекст услоовных максимумов
          conditionalMaximums[`Z_${step}`][t] = [currentLevel, t];
        }
      }
    }
  }
  // Возвращаем объект условных максимумов
  return conditionalMaximums;
}

function unconditionalOptimization(conditionalMaximums, T_0, q) {
  const bestDistribution = [];
  let T = T_0;

  for (let i = 1; i <= Object.keys(conditionalMaximums).length; i++) {
    const time = conditionalMaximums[`Z_${i}`][T][1];
    T = T - time + (time - 1) * q;
    bestDistribution.push(`t_${i}: ${time}`);
  }

  return bestDistribution;
}

let optimization = unconditionalOptimization(
  conditionalOptimization(data, q),
  T_0,
  q
);

console.log(optimization);
