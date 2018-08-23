package com.company;

public class Count {

    public static void main(String[] args) {

        CountDown cd = new CountDown();
        CountDownThread thread1 = new CountDownThread(cd);
        Thread t1 = new Thread(thread1);
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
    public String string = "Hi";
    volatile boolean done = false;

    //synchronized
    void doCountDown(){
        //synchronized (string) {
            for (i = 0; i < 10; i++) System.out.println(Thread.currentThread().getName() + " i = " + i);
        //}
        done = true;
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
