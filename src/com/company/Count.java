package com.company;

import java.util.concurrent.atomic.AtomicInteger;

public class Count {

    public static void main(String[] args) {

        CountDown cd = new CountDown();
        Thread t1 = new Thread(new CountInfi(cd));
        t1.setName("Thread 1");
        Thread t2 = new Thread(new CountDownThread(cd));
        t2.setName("Thread 2");

        t1.start();
        //while (!thread1.isDone());
        t2.start();

    }



}

class CountDown{

    private Integer i = 0;
    private String string ;
    volatile boolean done = false;

    //synchronized
    void doCountDown(){
        synchronized (this) {
            for (i = 0; i < 10; i++) System.out.println(Thread.currentThread().getName() + " i = " + i);
        }
        done = true;
    }

    void count(){
        synchronized (i) {
            System.out.println("First");
            while (true) i = 1;
        }
    }

}

class CountDownThread implements Runnable{

    private CountDown countDown;

    CountDownThread(CountDown countDown) {
        this.countDown = countDown;
    }

    @Override
    public void run() {
        countDown.doCountDown();
    }

    public boolean isDone(){
        return  countDown.done;
    }

}

class CountInfi implements Runnable{

    private CountDown countDown;

    CountInfi(CountDown countDown) {
        this.countDown = countDown;
    }

    @Override
    public void run() {
        countDown.count();
    }

    public boolean isDone(){
        return  countDown.done;
    }

}
