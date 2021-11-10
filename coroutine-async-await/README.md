
## CompletableFuture vs RXJava (Flow)
- CompletableFuture only passes through the 'then' chain/ tree once <br>
  where as Flow in for continuous data, like timer, WebSocket, database read(one by one), reading or uploading file <br>
  It works on 'Consumer request n object' -> Provider then calls onNext 'n' times.
   - Lazy / Cold: <br>
     Element are only generated when 'Consumer'(next in chain) ask for it. <br>
     And if you subscribe multiple time -> each will create a different unique stream, with independent elements
   - Hot: <br>
     Immediately starts, Don't wait for the subscriber <br>
     all subscribers get the same element <br>
     Only one steam for all subscriber <br>
     If the subscriber does not request the element, it is stacked as a backpressure, till the size is reached. <br>
   - CF: <br>
     for completable future you will create a future for each data entity, and they will be running in parallel <br>
     where as in flow there is stream of data which goes through pipeline <br>
   - JavaScript: <br>
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
    - only few functions like `setTimeout()` has permission to push to 'event-loop'
    - to make all the other function suspendable, compiler just converts them to callback like below example
    - in multithreaded application that mean, any free thread can take the callback for execution, as it is not dependent on it's 'callstack'
    ```js
       async function hello1(){
          const value = await hello2();
          let value2 = value + 2;
          return value2;
       }
        async function hello2(){}

      // -> to callback ->

       function hello2(returnCallback){
           hello((value) => {
           let value2 = value + 2;

           returnCallback(value2);
       });
     ```
- **Creating very small initial size and dynamic size Stacks for each task. <- Stackfull:** <br>
  - Operating System thread stack are not used developer, <br>
    As Operating System Stacks are huge 100MB in ram size reserved <br>
    And they are fixed in size and finite.
  - Small virtual call-stacks are used they have dynamic size. 
  - garbage collector is required as stack size is dynamic.
  - Low level/ System level language control is required (that's why Kotlin was not able to do this, as it does not change binary)
  - Languages like GO, Java Loom use this.
  - [Ron Pressler — Why user-mode threads are (often) the right answer](https://youtu.be/KmMU5Y_r0Uk)



