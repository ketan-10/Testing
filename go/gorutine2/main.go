package main

// import fmt, wg
import (
	"fmt"
	"sync"
)

var counter = 0

var wg = sync.WaitGroup{}
var m = sync.RWMutex{}

func main() {
	fmt.Println("Hello, World!")
	
	for i := 0; i < 10; i++ {
		wg.Add(2)
		m.RLock();
		go printCounter()
		
		m.Lock();
		go incrementCouter()
	}

	wg.Wait();

}

func printCounter() {
	
	fmt.Println("Counter: ", counter)
	m.RUnlock();
	wg.Done()
}

func incrementCouter() {
	
	counter++
	m.Unlock();
	wg.Done()
}
