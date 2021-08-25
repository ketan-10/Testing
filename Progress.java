package com.company;

import java.util.Random;

public class Progress {

    public static void main(String[] args) {

        long timeSec = System.currentTimeMillis();
        int frame = 0,progress = 0;
        boolean task = true;
        Random random = new Random();
        double gap;
        Thread thread = null;

        while (true) {

            if (random.nextInt(100000000) == 30 && task){
                System.out.println("Success");
//
//                new Thread(new Runnable() {
//                    @Override
//                    public void run() {
//                        new Thread();
//                    }
//                }).start();
//                new Thread(new Task()::method).start();
//
                thread = new Thread(Task::new);
                thread.start();


                task = false;
            }


            if (thread != null && thread.getState() == Thread.State.TERMINATED){
                System.out.println("Process Terminated and done");
                break;
            }

            if(progress != Task.PROGRESS){
                progress++;
                for (int i = 0; i < progress; i++)
                    System.out.print("_ ");
                System.out.println();

                if (progress == 10){
                    System.out.println("Progress is done");
                }

            }


            frame++;
            gap = (double) (System.currentTimeMillis() - timeSec)/1000;
            if (gap>1){
                System.out.println((int)((frame/gap)/10000));
                frame = 0;
                timeSec = System.currentTimeMillis();

            }

        }

    }

}



class Task{

    volatile static Integer PROGRESS = 0;

    Task(){

        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(2000);
                    synchronized (this) {
                        PROGRESS++;
                    }

            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }

    }

}

