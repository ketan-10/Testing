package com.company;


import java.io.Serializable;

public class Sorting <T> {

    Sorting(T[] array, IntegerFunction<T> integerFunction){

        if (array == null)
            return;
        int length = array.length;

        integerFunction.compare(array[0],array[1]);


    }


}

interface IntegerFunction<T>{
    boolean compare(T o1, T o2);

    static <K> IntegerFunction<K> toFunction(ToInt<? super K> toInt){
        return (o1, o2) -> toInt.toInteger(o1)<toInt.toInteger(o2);
    }

    static <K> IntegerFunction<K> toFuntion(ToInt<? super K> toInt){
        return new IntegerFunction<K>() {
            @Override
            public boolean compare(K o1, K o2) {
                return toInt.toInteger(o1)<toInt.toInteger(o2);
            }
        };
    }
}

interface ToInt<T>{
    int toInteger(T o);
}

