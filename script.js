
function calculateMinCost() {
  
  // Convert the comma-separated string of ropes into an array of integers
  const ropeLengths = ropes.split(",").map(Number);

  // Create a min heap using the rope lengths
  const minHeap = new MinHeap(ropeLengths);

  let totalCost = 0;

  // Connect ropes until only one rope is left in the heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the heap
    const smallestRope1 = minHeap.extractMin();
    const smallestRope2 = minHeap.extractMin();

    // Calculate the cost of connecting the two ropes
    const cost = smallestRope1 + smallestRope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the connected rope back into the heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// MinHeap class implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Get the size of the heap
  size() {
    return this.heap.length;
  }

  // Insert an element into the heap
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  // Extract the minimum element from the heap
  extractMin() {
    const min = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.sinkDown(0);
    }

    return min;
  }

  // Move an element up in the heap
  bubbleUp(index) {
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element >= parent) {
        break;
      }

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  // Move an element down in the heap
  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const length = this.heap.length;
    let smallestIndex = index;

    if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      this.sinkDown(smallestIndex);
    }
  }
}

// Getting user input and displaying the result
const form = document.getElementById("ropeForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("ropeInput").value;
  const minimumCost = calculateMinCost(input);
  resultDiv.textContent = minimumCost;
});
