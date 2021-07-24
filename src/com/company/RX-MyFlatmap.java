import io.reactivex.Flowable;
import org.reactivestreams.Publisher;

import java.util.concurrent.TimeUnit;
import java.util.function.Function;



//        CompletableFuture only passes through the 'then' chain/ tree once
//        where as flow in for continuous data, like timer, WebSocket, database read(one by one), reading or uploading file
//        it works on 'Consumer request n object' -> Provider then calls onNext 'n' times.
//
//        Lazy / Cold:
//        Element are only generated when 'Consumer'(next in chain) ask for it.
//        And if you subscribe multiple time -> each will create a different unique stream, with independent elements
//
//        Hot:
//        Immediately starts, Don't wait for the subscriber,
//        all subscribers get the same element,
//        Only one steam for all subscriber,
//        If the subscriber does not request the element, it is stacked as a backpressure, till the size is reached.
//
//        CF:
//        for completable future you will create a future for each data entity, and they will be running in parallel
//        where as in flow there is stream of data which goes through pipeline
//
//        JavaScript:
//        java flux vs js generator -> generator waits for the element to process before asking for next element
//        i.e backpressure is responsibility of the sender.

        // Here Completable future is used for doing things in parallel
        // And RX for doing it in flow (stream) -> Data will come in as a pipe, one after another
        // Even though all the CompletableFutures are running in parallel, Node that all the callbacks are running on Main thread

        // MONO from future will wait for future to complete (CompletableFutures are 'hot')
        // and MONO it will emmit when it is subscribed (Mono is cold)
        // but on each subscribe it will give the same future

//         * Code Help From : https://www.baeldung.com/java-aws-s3-reactive#2-handling-a-single-file-upload
//         * Marble Diagram: https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html
//         * Reactive Streams Specification: https://github.com/reactive-streams/reactive-streams-jvm
//         * S3 FileAsyncRequestBody (putObject) (Publisher/Provider) : https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/async/FileAsyncRequestBody.java
//         * S3 FileAsyncResponseTransformer (getObject) (Subscriber/Consumer) : https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/async/FileAsyncResponseTransformer.java

        // if we convert the arrayList of completable future to Flux,
        // "Flux is for streaming" but the "List of completable future is for parallel"
        // https://stackoverflow.com/a/49494849/10066692

//      https://github.com/ketan-10/aws-lambda-test

public class Main {

    public void subscribe(Function function){}

    public Publisher map(Function function){

        // send publisher so other can subscribe on return value
        // 's' subscription callback function
        // eg. map().subscribe(value -> {})
        // s = value -> {} // function
        return s -> {
            // subscribed is called on returned publisher

            // so, we will call subscribe on parent(self) in chain
            this.subscribe(x->{
                // transform the result according to mapping function
                var transformed = function.apply(x);

                // call the child subscribe callback
                s.send(transformed);
            });
        };

    }


    public Publisher flatMap(Function function) {

        // send publisher so other can subscribe on return value
        // 's' subscription callback function
        // eg. map().subscribe(value -> {})
        // s = value -> {} // function
        return s -> {
            // subscribed is called on returned publisher

            // so, we will call subscribe on parent(self) in chain
            this.subscribe(x -> {
                // mapping function returns a publisher in 'flatmap' callback
                var newPublisher = function.apply(x);

                // subscribe to the mapping publisher
                newPublisher.subscribe(data -> {
                    // call the child subscribe callback
                    s.send(data);
                });
            });
        };
    }

    public static void main(String[] args) {


        Flowable.interval(1000, TimeUnit.MILLISECONDS)
                .flatMap(x-> Flowable.interval(250, TimeUnit.MILLISECONDS)
//                        .map(a-> a+" [T]")
                )
                .map(a-> a+" [T]")
                .subscribe(System.out::println);

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
