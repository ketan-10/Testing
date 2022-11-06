
## CompletableFuture vs RXJava (Flow)
- CompletableFuture only passes through the 'then' chain/ tree once <br>
  where as Flow in for continuous data, like timer, WebSocket, database read(one by one), reading or uploading file <br>
  It works on 'Consumer request n object' -> Provider then calls onNext 'n' times.
   - **Lazy / Cold:** <br>
     Element are only generated when 'Consumer'(next in chain) ask for it. <br>
     And if you subscribe multiple time -> each will create a different unique stream, with independent elements
   - **Hot:** <br>
     Immediately starts, Don't wait for the subscriber <br>
     all subscribers get the same element <br>
     Only one steam for all subscriber <br>
     If the subscriber does not request the element, it is stacked as a backpressure, till the size is reached. <br>
   - **CF:** <br>
     for completable future you will create a future for each data entity, and they will be running in parallel <br>
     where as in flow there is stream of data which goes through pipeline <br>
   - **JavaScript:** <br>
     java flux vs js generator -> generator waits for the element to process before asking for next element <br>
     i.e backpressure is responsibility of the sender.
     
-  Here Completable future is used for doing things in parallel <br>
   And RX for doing it in flow (stream) -> Data will come in as a pipe, one after another <br>
   Even though all the CompletableFutures are running in parallel, Node that all the callbacks are running on Main thread <br>
-  MONO from future will wait for future to complete (CompletableFutures are 'hot') <br>
   and MONO it will emmit when it is subscribed (Mono is cold) <br>
   but on each subscribe it will give the same future <br>

   [S3 Multipart upload using java-reactive](https://www.baeldung.com/java-aws-s3-reactive#2-handling-a-single-file-upload) <br>
   [RXJava Marble Diagrams](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) <br>
   [Reactive Streams Specification](https://github.com/reactive-streams/reactive-streams-jvm) <br>
   
   ---
   [S3 FileAsyncRequestBody](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/async/FileAsyncRequestBody.java) (putObject) (Publisher/Provider) <br>
   [S3 FileAsyncResponseTransformer](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/async/FileAsyncResponseTransformer.java) (getObject) (Subscriber/Consumer) <br> 

    If we convert the arrayList of completable future to Flux, <br>
    "Flux is for streaming" but the "List of completable future is for parallel" 
    [Stackoverflow](https://stackoverflow.com/a/49494849/10066692) <br>


## Coroutines

There are 2 ways to implement task switching [Stackless vs. Stackful Coroutines](https://blog.varunramesh.net/posts/stackless-vs-stackful-coroutines/) <br>
Basics of Async: [Async Programming and Project Loom by Dr Venkat Subramaniam](https://youtu.be/UqlF6Mfhnz0) <br>
- **Using callbacks/async-await (just compile-time/libary are needed) <- Stackless:** <br>
  - Languages like Javascript, Kotlin, c++, rust use callbacks/async-await pattern 
  - It follows Everything was callbacks!!! pattern
  - Save All `state/locals` in a `closure` and early return by calling a `callback`.
  - How it is implemented in kotlin: [KotlinConf 2017 - Deep Dive into Coroutines on JVM by Roman Elizarov](https://youtu.be/YrrUCSi72E8)
  - Everything was callbacks: <br>
    - Only few functions like `setTimeout()` has permission to push to 'event-loop'
    - To make all the other function suspendable, compiler just converts them to callback like below example
    - In multithreaded application that mean, any free thread can take the callback for execution, as it is not dependent on it's 'callstack'
    - In Case of Javascript/C# after looking the compiled output it is clear, <br>
      The execution continues even inside async function till special functions like `setTimeout()` is called, <br> 
      Then the stack will be poped, According to language ThreadPool or Event Loop will manage the timings     
    ```js
       async function foo(){
          const value = await bar();
          return value + 2;
       }
       async function bar(){
          await new Promise(s => setTimeout(s, 1000));
          return 10;
       }

      // -> to callback ->
      // 'return' is not utilized. 
       function foo(returnCallback){
          bar((value) => {
              let value2 = value + 2;
              returnCallback(value2);
          });
       }
       function bar(callback) { 
          setTimeout(1 sec, () => {
             callback(10);
          });
       }
       
       // -> to promise ->
       // utilize return.
       function foo(){
          return bar().then(x => x + 2);
       }
       function bar(callback) { 
          return new Promise(s => setTimeout(s.bind(this,10),1))
       }
       
       // to generator function -> 
       const foo = async(function* (){
          const value = yield bar();
          return value + 2;
       })
       const bar = async(function* (){
          yield new Promise(s => setTimeout(s, 1000));
          return 10;
       })
       
        // async function -> 
        function async(genFun){
          return () => {
            const gen = genFun();
            
            const recursion = () => {  
              promise.then((output) => {
                const nextPromise = gen.next(output);
                recursion(nextPromise);
              })
            }
            
            const promise = gen.next();
            recursion(promise);
            
          }
        }
     ```
   
  - [Async/Await using Generators yield](https://www.promisejs.org/generators/)
  - [Difference between async/await and ES6 yield with generators](https://stackoverflow.com/questions/36196608/difference-between-async-await-and-es6-yield-with-generators)
- How `yield` could be implemented: 
    - Using `continuation` and `state-machine`:
      - The generator function is considerd as a **Object**.
      - Whenever yield occure the function returns,
      - But before returning it stores the current state and clouser veriables in Object state.
      - Now when next is called the same function is called, But with the previously stored state
      - This is the way `suspend` functions are [implemented in kotlin](https://medium.com/androiddevelopers/the-suspend-modifier-under-the-hood-b7ce46af624f)
    - Using Callbacks 
      - Store everything next to yeild in a callback
      - store the callback in generator Object
      - Call the callback when `.next()` is called.
      - Note: callback is not prefared as it overflows the call-stack, also it is hard to implement in for loop
    - Using Function stack-frame in Heep
      - in python we directly store the stack-frame in Heep.
      - When yeild is called we just re-load the stack-frame from heep.
      - [How are generators and coroutines implemented in CPython?](https://stackoverflow.com/questions/8389812/how-are-generators-and-coroutines-implemented-in-cpython)
- **Creating very small initial size and dynamic size Stacks for each task. <- Stackfull:** <br>
  - Operating System thread stack are not used developer, <br>
    As Operating System Stacks are huge 100MB in ram size reserved <br>
    And they are fixed in size and finite.
  - Small virtual call-stacks are used they have dynamic size. 
  - garbage collector is required as stack size is dynamic.
  - Low level/ System level language control is required (that's why Kotlin was not able to do this, as it does not change binary)
  - Languages like GO, Java Loom use this.
  - [Ron Pressler — Why user-mode threads are (often) the right answer](https1780330@tcs.coyoutu.be/KmMU5Y_r0Uk)

- Temp
```js
  return fetch(url, {
    headers
  }).then(result => {
    return new Promise(resolve => {
      result.json().then((json) => {
        resolve({
          status: result.status,
          data: json
        })
      })
    })
  });
```

## Rust
[he What and How of Futures and async/await in Rust](https://youtu.be/9_3krAQtD2k)
[Crust of Rust: async/await](https://youtu.be/ThjvMReOXYM)

Coming from java when virtual threads are introduced in JDK 19 
Found it very surprising that the underlying implementation on a high level is very similar. (https://inside.java/2021/05/10/networking-io-with-virtual-threads/)
In Java there is a runtime to manage virtual thread stack in heap
And we park thread if IO returns WouldBlock
But the advantage of doing this is no need to think about async await, so existing library code does not have to add support for 'Future'. All the blocking calls by default become Async by language only, I think it's activated by creating a wrapper around syscalls.

