package main

import (
	"fmt"
)

func main() {

	go logger()
	loggerCh <- "Hello World"
	loggerCh <- "Hello World 2"
	loggerCh <- "Hello World 3"
	loggerCh <- "Hello World 4"

	endCh <- struct{}{} // instanciate annonomous struct of type 'struct{}' with no data '{}'

}

var loggerCh = make(chan string)
var endCh = make(chan struct{})

func logger() {

	for {
		// if msg, ok := <-loggerCh; ok {
		// 	fmt.Println(msg)
		// }
		select {
		case msg := <-loggerCh:
			fmt.Println("Logger 1: ", msg)
		case <-endCh:
			break
		}
	}
}
