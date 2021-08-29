package main

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

func main() {
	ch := make(chan int)
	wg.Add(2)

	go func(ch <-chan int) {
		// for i := range ch{
		// 	fmt.Println("Received: ", i)
		// }

		for {
			if i, ok := <- ch; ok {
				fmt.Println("Received: ", i)
			}else{
				break;
			}
		}
		// fmt.Println("Received: ", <-ch)
		// fmt.Println("Received: ", <-ch)
		// fmt.Println("Received: ", <-ch)
		// fmt.Println("Received: ", <-ch)
		// fmt.Println("Received: ", <-ch)

		wg.Done()
	}(ch)

	go func(ch chan<- int) {

		defer wg.Done()

		defer func() {
			if recover() != nil {
				fmt.Println("Found some error")
			} else {
				fmt.Println("No Errors")
			}
		}()
		ch <- 1
		ch <- 2
		// "create Error" ->
		// close(ch)   
		ch <- 3
		close(ch)
	}(ch)

	wg.Wait()

}
