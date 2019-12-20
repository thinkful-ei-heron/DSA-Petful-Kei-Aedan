class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(value) {
        let newLast = new _Node(value, null);
        if (this.last !== null) {
            this.last.next = newLast;
            this.last = newLast;
        } else {
            this.last = newLast;
            this.first = this.last;
        }
    }

    dequeue() {
        if (this.first !== null) {
            let oldFirst = this.first;
            this.first = this.first.next;
            if(this.first === null) this.last = this.first;
            return oldFirst.value;
        }

    }
    peek() {
        if (this.first === null) return null;
        return this.first.value;
    }
    
    isEmpty() {
        return this.first === null;
    }
    
    display() {
        if (this.first === null) return null;
        console.log(`First: ${this.first.value}, Last: ${this.last.value}`);
    }
}


const pairOff = function (str, mQ, fQ) {
    if (str.charAt(0) === 'M') {
        mQ.enqueue(str);
    } else {
        fQ.enqueue(str);
    }

    if (!mQ.isEmpty() && !fQ.isEmpty()) {
        console.log(`F dancer is ${fQ.dequeue()}, and the M dancer is ${mQ.dequeue()}`);
    }
};

// const banker = function(qu) {
//     while(!isEmpty(qu)) {
//         console.log(peek(qu) + ' is talking with the banker.');
//         let d4 = Math.floor(Math.random() * 4);
//         if(d4 === 0) {
//             console.log('But they failed to fill out proper paperwork and have to go to the back of the line.');
//             qu.enqueue(qu.dequeue());
//         }else  {
//             console.log(peek(qu) + ' left the bank.');
//             qu.dequeue();
//         }
//         console.log(' '); 
//     }
// };


module.exports = {
    queue,
    pairOff,
}