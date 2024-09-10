const findUnique = (arr: number[]): number[] => {
  const myMap = new Map<number, number>();
  const uniques: number[] = [];

  arr.forEach((e) => {
    myMap.set(e, (myMap.get(e) || 0) + 1);
  });

  for (let [key, value] of myMap) {
    if (value === 1) {
      uniques.push(key);
    }
  }

  return uniques;
};

// Test cases
console.log("Empty array:", findUnique([]));
console.log("All unique:", findUnique([1, 2, 3, 4, 5]));
console.log("No unique:", findUnique([1, 1, 2, 2, 3, 3]));
console.log("With negative:", findUnique([-1, -1, 2, 3, 3, 4]));
console.log("With floats:", findUnique([1.1, 1.1, 2.2, 3.3]));
console.log("Large numbers:", findUnique([1e10, 1e10, 1e11, 1e12]));
console.log("With zero:", findUnique([0, 0, 1, 2, 2]));
console.log("Mixed types:", findUnique([1, 1.0, 4, 2, 2, 3]));