package com.company;

import java.io.*;
import java.net.*;

public class SenderVideo {

    public static void main(String[] args) throws Exception{
        File file = new File("E:/15.mp4");
        FileInputStream fileInputStream = new FileInputStream(file);
        DatagramPacket packet;
        DatagramSocket socket = new DatagramSocket(5000);
        int size = 0;
        byte[] buffer = new byte[(int)file.length()];

        // max size of packet is 6500 something..
        size = fileInputStream.read(buffer);
        int i = 0;
        for (i = 0; (i+1)*65000 < size; i++) {
            byte[] dataToSent = new byte[65001];
            System.arraycopy(buffer, (i*65000), dataToSent, 0, 65000);
            packet = new DatagramPacket(dataToSent ,65000, InetAddress.getLocalHost(),5001);
            socket.send(packet);
        }

        //Remaining data of last packet
        System.out.println(i*65000);
        int remain = size - i*65000;

        byte[] dataToSent = new byte[remain];
        System.arraycopy(buffer, (i*65000), dataToSent, 0, remain);
        packet = new DatagramPacket(dataToSent ,remain, InetAddress.getLocalHost(),5001);
        socket.send(packet);



    }

}

class ReceiverVideo {

    public static void main(String[] args) throws Exception{
        DatagramSocket datagramSocket = new DatagramSocket(5001);
        File file = new File("E:/15new.mp4");
        FileOutputStream fileOutputStream = new FileOutputStream(file);

        byte[] buffer = new byte[10000000];
        DatagramPacket packet = new DatagramPacket(buffer,buffer.length);
        while (true){
            datagramSocket.receive(packet);
            fileOutputStream.write(packet.getData(),0,packet.getLength());
        }


    }
}
class TCPClient {

    public static void main(String args[]) throws Exception{
        Socket socket = new Socket(InetAddress.getLocalHost(),5000);

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        DataInputStream dis = new DataInputStream(socket.getInputStream());
        DataOutputStream dos = new DataOutputStream(socket.getOutputStream());

        String clientOutput = br.readLine();
        while (!clientOutput.equals("stop")){

            dos.writeUTF(clientOutput);
            dos.flush();
            System.out.println(" Server said "+ dis.readUTF());

            clientOutput = br.readLine();
        }



    }
}

class TCPServer {


    public static void main(String[] args) throws Exception{

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        ServerSocket serverSocket = new ServerSocket(5000);
        Socket socket = serverSocket.accept();

        DataInputStream dis = new DataInputStream(socket.getInputStream());
        DataOutputStream dos = new DataOutputStream(socket.getOutputStream());

        String serverInput = dis.readUTF();
        while (!serverInput.equals("stop")){

            System.out.println(" Client Said "+serverInput);
            String serverOutput  = br.readLine();

            dos.writeUTF(serverOutput);
            dos.flush();

            serverInput = dis.readUTF();

        }

    }

}

class UDPClient {


    public static void main(String[] args) throws Exception{

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        DatagramSocket datagramSocket = new DatagramSocket(5001);

        byte[] byteArray;

        String clientInput;
        do{

            clientInput = bufferedReader.readLine();
            byteArray = clientInput.getBytes();
            datagramSocket.send(new DatagramPacket(byteArray,byteArray.length, InetAddress.getLocalHost(),5000));

            byteArray = new byte[100];
            DatagramPacket datagramPacket = new DatagramPacket(byteArray,byteArray.length);
            datagramSocket.receive(datagramPacket);

            System.out.println(new String(byteArray));



        }while (!clientInput.equals("stop"));
    }

}

class UDPServer {

    public static void main(String[] args) throws Exception{

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        DatagramSocket datagramSocket = new DatagramSocket(5000);


        while (true){
            byte[] byteArray = new byte[100];
            DatagramPacket datagramPacket = new DatagramPacket(byteArray,byteArray.length);

            datagramSocket.receive(datagramPacket);
            String serverInput = new String(byteArray);
            if (serverInput.equals("stop"))break;
            System.out.println("Client said "+serverInput);


            String serverOutput = bufferedReader.readLine();
            byteArray = serverOutput.getBytes();
            datagramPacket = new DatagramPacket(byteArray,byteArray.length, InetAddress.getLocalHost(),datagramPacket.getPort());
            datagramSocket.send(datagramPacket);


        }


    }

}