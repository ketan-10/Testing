package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World")

	var w Writer = ConsoleWriter{}
	w.Write([]byte("ketan"))


	/// counter 

	var c counter = counter(0)
	c.Increment();
	c.Increment();
	c.Increment();
	var c2 *counter = c.Decrement();
	fmt.Println("Decremented: ",*c2)
	fmt.Println(c);
	inc := &c;
	var inc2 = Incrementer(inc);
	fmt.Println(inc.Increment())
	fmt.Println(inc2.Decrement())



}

type Writer interface {
	Write([]byte) (int, error)
}

type ConsoleWriter struct {
}

func (c ConsoleWriter) Write(mybytes []byte) (int, error) {
	n, err := fmt.Println(string(mybytes))
	return n, err
}


// counter 

type Incrementer interface {
	Increment() int
	Decrement() *counter
}

type counter int;

func (c *counter) Increment() int {
	*c++
	return int(*c);  // typecast from 'counter' to 'int'
}

func (c counter) Decrement() *counter {
	c--;
	return &c;
};



func test(i interface{}) {
	switch i.(type) {
	case int:
		fmt.Println("int")
	case string:
		fmt.Println("string")
	default:
		fmt.Println("unknown")
	}
}
