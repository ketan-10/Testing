package com.company;


import java.util.Comparator;
import java.util.TreeSet;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.ToIntFunction;

public class Java8 {


    public static void main(String[] args) {
        TreeSet<Employee> employees = new TreeSet<>((e1, e2)->{return Integer.compare(e1.getId(), e2.getId());});
        TreeSet<Employee> employees2 = new TreeSet<>(Comparator.comparingInt(Employee::getId));

        ToIntFunction<Employee> f = Employee::getId;


        /**
         * My own code In class Sorting
         */
        Sorting<Object> employeeSorting = new Sorting<>(null,new IntegerFunction<Object>() {
            @Override
            public boolean compare(Object o1, Object o2) {
                return ((Employee) o1).getId() < ((Employee)o2).getId();
            }
        });

        Sorting<Employee> employeeSorting1 = new Sorting<>(null, new IntegerFunction<Employee>() {
            @Override
            public boolean compare(Employee o1, Employee o2) {
                return o1.getId() < o2.getId();
            }
        });

        Sorting<Employee> employeeSorting2 = new Sorting<>(null,(o1, o2) -> ((Employee) o1).getId() < ((Employee)o2).getId());

        Sorting<Employee> employeeSorting3 = new Sorting<>(null,IntegerFunction.toFunction(Employee::getId));
        {
            Sorting<Employee> employeeSorting4 = new Sorting<>(null,IntegerFunction.toFunction(new ToInt<Employee>() {
                @Override
                public int toInteger(Employee employee) {
                    return employee.getId();
                }
            }));

            Sorting<Employee> employeeSorting5 = new Sorting<>(null,IntegerFunction.toFunction(employee -> employee.getId()));

            Sorting<Emp> employeeSorting6 = new Sorting<>(null,IntegerFunction.toFunction(new ToInt<Employee>() {
                @Override
                public int toInteger(Employee employee) {
                    return employee.getId();
                }
            }));


        }

    }

    void identity() {
        Hello hello = this::hello;
    }

    void hello(){
        System.out.println("Hello");
    }
}

interface Hello{
    void sayHello();
}

class Employee{

    protected int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
    public int getId() {
        return id;
    }


}

class Emp extends Employee{

    public Emp(int id, String name) {
        super(id, name);
    }
    public int getId() {
        return id;
    }
}




