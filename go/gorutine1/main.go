package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Hello, World!")

	var msg = "Ketan 1";
	fun := func() {
		fmt.Println(msg);
		msg = "Ketan 3";
	}
	msg = "Ketan 2";
	go fun();
	
	time.Sleep(300 * time.Millisecond);
	fmt.Println(msg);

}

