// Массив данных - первый элемент которого подмассив с временем, подлежащим распределению,
// остальные элементы - подмассивы занятий, состоящие из возможных уровней освоения при заданном времени.
const data = [
  [1, 2,  3,  4,  5 ],

  [9, 10, 13, 15, 18],
  [6, 8,  9,  11, 16],
  [4, 5,  10, 13, 15],
  [7, 9,  11, 14, 15],
];

let q = 0;              // Коэффициент прироста времени при более высоком уровне освоения предыдущего занятия.
let T_0 = data[0].at(-1); // Общее время, подлежащее распределению.

// Объявление функции условной оптимизации.
function conditionalOptimization(data, q) {
  const conditionalMaximums = {};               // Объект хранящий данные с условными максимумами.

  for (let k = data.length - 1; k > 0; k--) {   // Обход каждого шага управляемого процесса, начиная с последнего.
    conditionalMaximums[`Z_${k}`] = {};         // Создание объекта условного масимума на k-м шаге.
    for (const T of data[0]) {                  // Обход массива с данными о времени, подлежащего распределению.
      for (let t = T; t > 0; t--) {            // Получение допустимых значений времени.
        const currLevel = data[k][t - 1];    // Получение уровня освоения на текущем шаге.               TODO: (!!! убрал || 0)
        
        if (currLevel === 0) continue;       // Если уровень освоения равен нулю, пропускаем итерацию 
                                             // (нужно освоить каждое занятие).
        if (conditionalMaximums[`Z_${k + 1}`]) {        // Если существует условный максимум на предыдущем шаге.
          let T_k = T - t + Math.max((t - data[0].at(0)) * q, 0); // Получение доступного времени для распределения, учитывая
                                                               // условие более высокого уровня освоения при заданном t.
          // Если при заданном времени T_k не существует условного максимума, округлить до целого числа в меньшую сторону.
          if (!conditionalMaximums[`Z_${k + 1}`][T_k]) T_k = Math.floor(T_k);
          // Пропустить итерацию, если занятие не освоено.
          T_k = Math.min(T_k, data[0].at(-1)); // T_k не может превышать общее время подлежащее распределению.
          if (T_k === 0 || t === 0 || !conditionalMaximums[`Z_${k + 1}`][T_k]) continue;
          
          const Z_max = currLevel + conditionalMaximums[`Z_${k + 1}`][T_k][0]; // Получение условного максимума.
          // Запись условного максимума в объект.
          if (!conditionalMaximums[`Z_${k}`][T] || conditionalMaximums[`Z_${k}`][T][0] < Z_max) {
            conditionalMaximums[`Z_${k}`][T] = [Z_max, t];
          }
        } else {
          conditionalMaximums[`Z_${k}`][t] = [currLevel, t];  // Запись условного максимума в объект.
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
      time = conditionalMaximums[`Z_${i}`][data[0].at(-1)][1]
    } else if (!conditionalMaximums[`Z_${i}`][T]) {
      time = conditionalMaximums[`Z_${i}`][Math.floor(T)][1]
    } else {
      time = conditionalMaximums[`Z_${i}`][T][1]
    }

    T = T - time + Math.max((time - data[0].at(0)) * q, 0);
    distribution.push(`t_${i}: ${time}`);
  }
  return distribution;
}

let optimization = unconditionalOptimization(conditionalOptimization(data, q), data, q);
console.log(optimization);