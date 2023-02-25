let node = { num: 3 }
let queue = [node, { num: 4 }, { num: 2 }, { num: 1 },]
for (let i = 0; i < queue.length; i++) {
    if (node === queue[i]) {
        let j = i + 1;
        while (j < queue.length && (queue[j].num > node.num)) {
            queue[j - 1] = queue[j];
            j = j + 1;
        }
        queue[j - 1] = node;
        break;
    }
}
console.log(queue);