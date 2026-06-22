const users = [];

for (let i = 0; i < 1_000_000; i++) {
  users.push({
    id: i,
    fullName: `User ${i.toString().padStart(7, "0")}`,
  });
}

const target = "User 0999999";

// Linear Search
function linearSearch(list, name) {
  let comparisons = 0;

  for (let i = 0; i < list.length; i++) {
    comparisons++;

    if (list[i].fullName === name) {
      return {
        user: list[i],
        comparisons,
      };
    }
  }

  return null;
}

// Binary Search
function binarySearch(list, name) {
  let low = 0;
  let high = list.length - 1;
  let comparisons = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid].fullName;

    comparisons++;

    if (guess === name) {
      return {
        user: list[mid],
        comparisons,
      };
    }

    if (guess > name) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}

// Benchmark helper
function benchmark(fn, list, name, iterations = 1000) {
  const start = performance.now();

  let result;

  for (let i = 0; i < iterations; i++) {
    result = fn(list, name);
  }

  const end = performance.now();

  return {
    time: `${(end - start).toFixed(2)} ms`,
    comparisons: result.comparisons,
    found: result.user.fullName,
  };
}

const linearResult = benchmark(linearSearch, users, target, 1000);

const binaryResult = benchmark(binarySearch, users, target, 1000);

console.log("LINEAR SEARCH");
console.log(linearResult);

console.log("BINARY SEARCH");
console.log(binaryResult);
