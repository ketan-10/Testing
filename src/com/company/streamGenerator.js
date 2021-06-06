// https://blog.logrocket.com/comparing-the-stream-api-and-async-generators-in-node-js-v10/

// Stream Async Counter

const { Readable, Writable } = require('stream');

const createCounterReaderAsync = (delay) => {
  let counter = 0;
  const reader = new Readable({
    objectMode: true,
    read() {},
  });
  setInterval(() => {
    counter += 1;
    console.log('reading Stream Async:', counter);
    reader.push(counter);
  }, delay);
  return reader;
};

const counterReaderAsync = createCounterReaderAsync(1000);

const logWriterAsync = new Writable({
  objectMode: true,
  write: (chunk, _, done) => {
    console.log('writing Stream Async:', chunk);
    done();
  },
});

counterReaderAsync.pipe(logWriterAsync);

// Stream Sync Counter


// const { Readable, Writable } = require('stream');

const createCounterReaderSync = () => {
  let count = 0;
  return new Readable({
    objectMode: true,
    read() {
      count += 1;
      console.log('reading Stream Sync:', count);
      this.push(count);
    },
  });
};

const counterReaderSync = createCounterReaderSync();

const logWriterSync = new Writable({
  objectMode: true,
  write: (chunk, _, done) => {
    setTimeout(() => {
      console.log('writing Stream Sync:', chunk);
      done();
    }, 1000);
  },
});

counterReaderSync.pipe(logWriterSync);



// Generator-sync-counter
function* counterGeneratorSync() {
  let count = 0;
  while (true) {

    count += 1;
    console.log('reading Generator Sync:', count);
    yield count;
  }
}

const counterIteratorSync = counterGeneratorSync();

const logIteratorSync = async (iterator) => {
  for (const item of iterator) {
    await new Promise(r => setTimeout(r, 1000));
    console.log('writing Generator Sync:', item);
  }
};
logIteratorSync(counterIteratorSync);


// Generator Async counter

async function* counterGeneratorAsync(delay) {
  let counter = 0;
  while (true) {
    await new Promise(r => setTimeout(r, delay));
    counter += 1;
    console.log('reading Generator Async:', counter);
    yield counter;
  }
} 
    
const counterIteratorAsync = counterGeneratorAsync(1000);

const logIteratorAsync = async (iterator) => {
  for await (const item of iterator) {
    console.log('writing Generator Async:', item);
  }
};

logIteratorAsync(counterIteratorAsync);


