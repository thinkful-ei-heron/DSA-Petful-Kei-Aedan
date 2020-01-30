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

    print() {
        let current = this.first;
        let str = '';
        if(current !== null) {
            while(current.next !== null) {
                if (str === ''){
                    str = current.value;
                } else {
                    str = str + ', ' + current.value;
                }
                current = current.next;
            }
            str = str + ', ' + current.value;
            return str;
        }
        return null;
    }
}


module.exports = {
    queue,
}