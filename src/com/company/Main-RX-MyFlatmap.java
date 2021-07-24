import io.reactivex.Flowable;
import org.reactivestreams.Publisher;

import java.util.concurrent.TimeUnit;
import java.util.function.Function;


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
