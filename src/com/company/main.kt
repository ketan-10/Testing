import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

suspend fun main2() = coroutineScope {
    print("hello")

    var i = 1;
    for (count in 10 downTo 0){

        launch {
            delay(1000)
            println(count);
            println("i is : " + i++)
        }

        async {

        }
    }
}


@InternalCoroutinesApi
suspend fun main(){
    var f : Flow<String> = object : Flow<String> {
        override suspend fun collect(collector: FlowCollector<String>) {


            collector.emit("A")
            collector.emit("B")
            collector.emit("C")

        }
    }.map{     // returns a new flow with filter
        "$it ->"
    }



    val ketanMapFlow : Flow<String> = flow {

//        emit("A") -> once when collected
        f.collect { value ->         // in case of actually 'map' it will be extension method, so we can directly call 'collect' which will call the collect method of flow where we called using "(flow).map"

//            return@collect emit(traform(value))
            return@collect emit("$value ketan    ")   // mapping tranform function
        }
    }

    ketanMapFlow.collect (object :FlowCollector<String> {
        override suspend fun emit(value: String) {
            print(value)
        }
    })

//    output :   A -> ketan    B -> ketan    C -> ketan

    print("\n")
    /**
     *    flow(()->{
     *      collect(()->{
     *
     *      })
     *    })
     *
     *
     */

//    public suspend inline fun <T> Flow<T>.collect(crossinline action: suspend (value: T) -> Unit): Unit =
//        collect(object : FlowCollector<T> {
//            override suspend fun emit(value: T) = action(value)
//        })


    f.buffer().collect(object :FlowCollector<String> {
        override suspend fun emit(value: String) {
            print(value)
        }
    })

//    output :   A ->B ->C ->

    print("\n")
    flowOf("A", "B", "C")
        .onEach  { println("1$it") }
        .buffer()  // <--------------- buffer between onEach and collect
        .collect { println("2$it") }
    /**
    1A
    2A
    1B
    2B
    1C
    2C
     */
}

fun foo2(){
    listOf("A","B","C").map(::test2)

    lambdainput3 {
        compute(it);
    }

    // compute(it)
}

inline fun lambdainput3(noinline transform: suspend (String) -> String){

    lamInp2(transform)
}
inline fun lambdainput2(noinline transform: (String) -> String){
//    lamInp2(transform);


}

inline fun lambdainput(transform: (String) -> String, name:String){
//    lamInp2(transform);
//    transform("");
    lamInp3(name);


}
fun lamInp3(name: String){

}

fun lamInp2(transform: suspend (String) -> String){

    GlobalScope.launch{

        async{transform("")}
    }
}

suspend fun foo(): String {
    listOf("A","B","C").map{
        return compute(it)
    }


//    listOf("A","B","C").map(::test)

    return ""

}


@InternalCoroutinesApi
suspend fun flowTest(){

    flowOf("A","B","C").map {
        compute(it);
    }.onStart {  }


    var myFlow: Flow<String> = flow{
        emit("A")
        emit("B")
        emit("C")
    }




    myFlow.collect { value -> print(value) }


//    var names: Flow<String> = flow {
//        this.
//    }
//
//    flowTest(object : Flow<String> {
//        override suspend fun collect(collector: FlowCollector<String>) {
//
//            var it = collector
//
//
//            collector.emit()
//
//        }
//    })



}


fun flowTest( flowString: Flow<String>){

}





fun test2(input:String): String {
    return input;

}

suspend fun test(input:String): String {
    return compute(input);
}


suspend fun compute(input:String): String {
    delay(3000);
    return input;
}

/***

 function(){

    List<> all;
    for(i in 1..10){

        promise p = getData(i).then(d->process(d))
                  .then(d->process2(d))
        all.add(p)
    }

    P.waitAll(all);
 }


 function(){

    for(i in 1..10){

        {(awiat)} async function(){
            d1 = await getData(i)
            d2 = await process(d1)
            d3 = await process(d2)
        }();  // iife
    }

 }


 */
