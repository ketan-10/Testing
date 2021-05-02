package com.company;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

public class Promise {


    private final List<Function<String, String>> functions = new ArrayList<>();
    private final List<Promise> children = new ArrayList<>();

    public Promise() { }

    public Promise thenApply(Function<String,String> function) {

        functions.add(function);
        Promise p =  new Promise();
        children.add(p);
        return p;
    }

    public void complete(String input){
        for (int i = 0; i < functions.size(); i++) {
            String out = functions.get(i).apply(input);
            children.get(i).complete(out);
        }
    }

    private static <T> Function<T,T> getFunction(String name){
        return t -> {
            System.out.println(name);
            return t;
        };
    }
    public static void main(String[] args) {
        Promise p1 = new Promise();

        Promise p2 = p1.thenApply(getFunction("p2"));
        Promise p3 = p2.thenApply(getFunction("p3"));
        Promise p5 = p2.thenApply(getFunction("p5"));
        Promise p4 = p1.thenApply(getFunction("p4"));

        p2.complete("10");
/////////////////////////////////////////////////////////////////////////////////////////////////////
        CompletableFuture<Integer> com1 = new CompletableFuture<>();

        CompletableFuture<Integer> com2 = com1.thenApply(getFunction("com2"));
        CompletableFuture<Integer> com3 = com2.thenApply(getFunction("com3"));
        CompletableFuture<Integer> com5 = com2.thenApply(getFunction("com5"));
        CompletableFuture<Integer> com4 = com1.thenApply(getFunction("com4"));

        com2.complete(10);
    }
}
