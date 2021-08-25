package helloworld;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;


public class Main {
 
    private static class ChangeableString {
        String str;

        public ChangeableString(String str) {
            this.str = str;
        }

        public void changeTo(String newStr) {
            str = newStr;
        }

        public String toString() {
            return str;
        }
    }

    public static void main(String[] args) {


        List<Integer> values = List.of(1,2,3,4,5,6,7,8,9,10);

        int total = values.parallelStream().reduce(0,(x,y)->{
            System.out.println("X: "+x+" Y: "+y+" Result: "+(x+y));
            return x+y;
        });
        System.out.println(total);

        //        (https://stackoverflow.com/questions/22577197/java-8-streams-collect-vs-reduce)

        // Below Code is example of concatenation with Reduce ->
        // Here it not efficient as we are using string concat, which is O(n) complexity.
        // so concatenating all strings will give n^2
        // We should use StringBuffer with cashes all strings then concats.
        List<String> strings = List.of("1","2","3","4","5","6","7","8","9");

        // if Stream is parallel K is applied on each element Start
        // But if the Stream is not parallel K is applied only on Start of first element
        String join = strings.parallelStream().reduce("K",(x,y) -> {
            System.out.println("X "+x+" Y "+y+" Result: "+x.concat(y));
            return x.concat(y);

        });
        System.out.println(join);



//      'Reduce' with mutating 'StringBuilder'

//        String[] grades = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};
//
//        StringBuilder concat = Arrays.stream(grades).parallel().reduce(
//                new StringBuilder(),
//                (sb, s) -> sb.append(s),
//                (sb1, sb2) -> sb1.append(sb2));
//        System.out.println(concat);


//   This Will not work, as 'Reduce' is expected to return a new StringBuilder object each time as BiFunction<>
//   As 'Reduce' does not support Mutating object, (It is not thread safe)
//   It will throw ArrayOutOfBound, or give junk data, or Cuncurrency Exception

//        Here We are returning the same object by Mutating it,
//        But Stream will execute this in parallel,
//        And there might be case where 'two append' Operations will happen concurrently and that will fail



//        In below code We are returning a 'new StringBuilder' each time,
//        And This works, but we created new StringBuilder object each time, which is eliminate our point to remove complexity

        String[] grades2 = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};

        StringBuilder concat2 = Arrays.stream(grades2).parallel()
                .reduce(new StringBuilder(),
                        (sb, s) -> {
                            StringBuilder newSb = new StringBuilder(sb);
                            newSb.append(s);
                            return newSb;
                        },
                        (sb1, sb2) -> {
                            StringBuilder newSb = new StringBuilder(sb1);
                            newSb.append(sb2);
                            return newSb;
                        });

        System.out.println(concat2);

//        Other Example to Calculate Total Length of all strings
        int totalLength = Arrays.stream(grades2).parallel().reduce(0,
                (sb, s) -> {
                    System.out.println("TEST [ONE] 1 -> "+sb+" 2 -> "+s+" Output: "+(sb+s.length()));
                    return sb+s.length();
                },
                (sb1, sb2) -> {
//            Many will be called in case of parallel
                    System.out.println("TEST [MANY] 1 -> "+sb1+" 2 -> "+sb2+" Output: "+(sb1+sb2));
                    return sb1+sb2;
                });

        System.out.println(totalLength);



//        Using Collect() method, it uses BiConsumer<> instead of BiFunction<>
//        We can directly mutate the StringBuilder
//        collect is threadSafe By Default
//        Code From (https://stackoverflow.com/questions/56023452/how-does-reduce-method-work-with-parallel-streams-in-java-8)

        values.stream().collect(() -> new StringBuilder(),
                (stringBuilder, integer) -> stringBuilder.append(integer),
                (stringBuilder, stringBuilder2) -> stringBuilder.append(stringBuilder2));

///////////////////////////////////

//        https://stackoverflow.com/questions/3486393/java-string-value-change-in-function
//        (Java String uses call by Value)

        String totalLengthCollect = Arrays.stream(grades2).parallel().collect(() -> new ChangeableString(""),
                (accumulator, s) -> {
                    int preLen;
                    try{
                         preLen = Integer.parseInt(accumulator.toString());
                    }catch (Exception e){
                        preLen = 0;
                    }
                    System.out.println("TEST [ONE] [COLLECT] 1 -> "+accumulator+" 2 -> "+s+" Output: "+(preLen+s.length()));
                    accumulator.changeTo(String.valueOf(preLen + s.length()));
                },
                (sb1, sb2) -> {
//            Many will be called in case of parallel
                    int preLen1;
                    try{
                        preLen1 = Integer.parseInt(sb1.toString());
                    }catch (Exception e){
                        preLen1 = 0;
                    }
                    int preLen2;
                    try{
                        preLen2 = Integer.parseInt(sb2.toString());
                    }catch (Exception e){
                        preLen2 = 0;
                    }
                    String totalLen = String.valueOf(preLen1+preLen2);
                    System.out.println("TEST [MANY] [COLLECT] 1 -> "+sb1+" 2 -> "+sb2+" Output: "+(totalLen));
                    sb1.changeTo(String.valueOf(totalLen));
                }).toString();

        System.out.println(totalLengthCollect);


    }
}
