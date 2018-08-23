package com.company;
class A {
    A() {
        // super();
        System.out.println("class A");
    }
}
class B extends A {
    B() {
        // super();
        System.out.println("class B");
    }
}
class C extends B {
    public static void main(String args[]) {
        A a = new B(); //Parent constructor will get called
        System.out.println(a instanceof C);
    }


    private static void function(int a ,String s){

    }
}