package com.company;

public class Main {

    private Main(){

    }

    String field = "A";
    void foo(){
        String local = "A";
        Runnable r = () -> System.out.println(field+local);
        field = "B";
//        local = "B";
        r.run(); // OUTPUT "BA" (even if java would have allowed the use of non final variable )
    }

    private CounterFun helloMaker(){
        var ref = new Object() {int counter = 0;};

        /**
         * ref is const as its directly passed to below interface i.e it is copied
         * if we would have change its value latter it would not affect the return type as it get copyed
         * also inline interface contains this here to access global variable of Main class
         * which we had to separately add in constructor if we was not using inline interface and creating separate class extending interface
         *
         * (https://www.w3schools.com/js/js_function_closures.asp)
         * instead of coping functional programing directly keeps all local variable alive inside inner function
         * hence inner function (i.e inline interface here) will contain all the local (parent function) as well as global
         * variable alive inside it(inner returned function) so it wont get garbage collected
         * (https://javascript.info/garbage-collection)
         * (actually function contain reference to parent in JSON format)
         *
         * A closure is a function having access to the parent scope even after the patent function has closed
         * (W3 school : JavaScript Closures)
         *
         */
        return () -> {
            ref.counter++; return ref.counter;
        };

    }


    public static void main(String[] args) {
        Main m = new Main();

        CounterFun sf = m.helloMaker();
        /**
         * All the local variable are directly stored in the "sf" i.e in inline interface
         * also it contains reference to its parent class to access global variables
         */

        System.out.println(sf.counterFun());
        System.out.println(sf.counterFun());
    }
}


interface CounterFun {

    int counterFun();

}
