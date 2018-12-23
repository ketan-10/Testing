package com.company;


import javax.swing.text.*;

class Temp <T>  {

    Temp() {

    }

    T findId(T t, int i){

        return t;
    }
    public static <T> void print(T t){
        System.out.println(t);
    }

    public <K extends View> void getId(K k, int i ){


    }

    public <K> void getId(K k, int i ){

        Integer integer = (Integer) k;

    }


}
