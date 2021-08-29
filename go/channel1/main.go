package main

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

func main() {
	fmt.Println("hello world")

	ch := make(chan int, 5)

	wg.Add(1)

	go func(ch <-chan int) {
		i := <-ch
		fmt.Println("i:", i, "ch len: ", len(ch))
		i = <- ch
		fmt.Println("i:", i, "ch len: ", len(ch))
		wg.Done()
	}(ch)

	go func(val int, ch chan<- int) {
		ch <- val * 10
		// print ch len
		fmt.Println("ch len: ", len(ch))
		ch <- val * 100
		wg.Done()
	}(1, ch)

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(val int, ch chan<- int) {
			ch <- val * 10
			// print ch len
			fmt.Println("ch len: ", len(ch))
			wg.Done()
		}(i, ch)
	}

	wg.Wait()
}
