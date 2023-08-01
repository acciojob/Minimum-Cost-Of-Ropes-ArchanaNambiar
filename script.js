
function minCostOfRopes(lengths) {
  // Convert the input string to an array of integers
  const ropes = lengths.split(',').map(str => parseInt(str.trim()));

  // Create a min-heap using priority queue
  const heap = new MinHeap();
  ropes.forEach(length => heap.insert(length));

  let totalCost = 0;

  // While there are more than one rope in the heap
  while (heap.size() > 1) {
    // Extract the two shortest ropes from the heap
    const rope1 = heap.extractMin();
    const rope2 = heap.extractMin();

    // Connect the two ropes and add the cost to the total
    const combinedLength = rope1 + rope2;
    totalCost += combinedLength;

    // Insert the result back into the heap
    heap.insert(combinedLength);
  }

  // Return the total minimum cost
  return totalCost;
}

// Sample input string provided in the problem statement
const inputString = '4, 2, 7, 6, 9';
const minCost = minCostOfRopes(inputString);
document.getElementById('result').innerText = minCost;

// MinHeap implementation for priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    const parentIdx = Math.floor((index - 1) / 2);
    if (parentIdx >= 0 && this.heap[parentIdx] > this.heap[index]) {
      [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
      this.bubbleUp(parentIdx);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return minValue;
  }

  bubbleDown(index) {
    const leftChildIdx = 2 * index + 1;
    const rightChildIdx = 2 * index + 2;
    let smallestIdx = index;

    if (leftChildIdx < this.heap.length && this.heap[leftChildIdx] < this.heap[smallestIdx]) {
      smallestIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heap.length && this.heap[rightChildIdx] < this.heap[smallestIdx]) {
      smallestIdx = rightChildIdx;
    }

    if (smallestIdx !== index) {
      [this.heap[index], this.heap[smallestIdx]] = [this.heap[smallestIdx], this.heap[index]];
      this.bubbleDown(smallestIdx);
    }
  }
}
