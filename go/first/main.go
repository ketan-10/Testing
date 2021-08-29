package main

import (
	"bufio"
	"fmt"
	"strings"
)

func main() {
	var i1 int
	i1 = 1
	fmt.Println(i1)

	var t float64 = 21
	fmt.Printf("%v %T \n", t, t)

	t = float64(i1)

	fmt.Println("Hello, Ketan! 🦑")

	var n bool

	fmt.Printf("%v %T \n", n, n)

	var s string = "Hello, Ketan! 🦑"

	fmt.Printf("%v %T \n", s, s)

	s1 := s[2:]
	fmt.Printf("%v %T \n", s1, s1)

	s2 := s[2]
	fmt.Printf("%v %T \n", s2, s2)

	var s4 byte = s[2]
	fmt.Printf("%v %T \n", s4, s4)

	b := []byte(s)
	fmt.Printf("%v %T \n", b, b)

	s3 := []uint8(s)
	fmt.Printf("%v %T \n", s3, s3)

	r := 'k'
	fmt.Printf("%v %T \n", r, r)

	r2 := []rune(s)
	fmt.Printf("%v %T \n", r2, r2)

	reader := bufio.NewReader(strings.NewReader(s))
	for {
		c, sz, err := reader.ReadRune()
		if err != nil {
			break
		}
		fmt.Printf("%v %T \n", c, c)
		fmt.Printf("%v %T \n", sz, sz)
		fmt.Printf("%q [%d]\n", string(c), sz)
	}

	// for each r2
	for _, r3 := range r2 {
		// fmt.Printf("%v %T \n", r3, r3)
		fmt.Print(string(r3))
	}

	// constants -> only works for compile time values
	// const c1 int = 2 * i1;
	const c1 int = 2

	const (
		_  = iota             // ignore first value by assigning to blank identifier
		KB = 1 << (10 * iota) // shift left 10 times for each iota.
		MB
		GB
		TB
	)

	fmt.Printf("%v %T \n", KB, KB)
	fmt.Printf("%v %T \n", MB, MB)
	fmt.Printf("%v %T \n", GB, GB)

	a1 := [...]int{1, 2, 3, 4, 5}
	a2 := a1
	a2[2] = 100
	fmt.Printf("%v %T \n", a1, a1)
	fmt.Printf("%v %T \n\n", a2, a2)

	sc1 := []int{1, 2, 3, 4, 5}
	sc2 := sc1
	sc2[2] = 100
	fmt.Printf("%v %T \n", sc1, sc1)
	fmt.Printf("%v %T \n\n", sc2, sc2)

	newSc := a1[:]
	fmt.Printf("%v %T \n\n", newSc, newSc)

	var myMap map[string]int;
	myMap = make(map[string]int)
	myMap["ketan"] = 1
	myMap["chaudhari"] = 2


	var t1 interface{} = 1
	fmt.Printf("%v %T \n", t1, t1)
	fmt.Printf("%v %T \n", t1, t1)
	

	// var ms *MyStruct;
	// ms = new(MyStruct)
	// ms = make()

	var n1 = new(int);
	*n1 = 1
	nn1 := *n1;
	nn1++;
	fmt.Printf("%v %T \n", n1, n1)
	fmt.Printf("%v %T \n", *n1, *n1)
	fmt.Printf("%v %T \n", nn1, nn1)

	// var mi1 = make(int);

	returned := test();
	fmt.Printf("%v %T \n\n", *returned, *returned)

	returned2 := test2();
	fmt.Printf("%v %T \n\n", returned2, returned2)


	test3();
}


func test() *[]int {
	a := []int{1, 2, 3, 4, 5}
	fmt.Printf("%v %T \n", a, a)
	return &a
}


func test2() []int {
	a := []int{1, 2, 3, 4, 5}
	fmt.Printf("%v %T \n", a, a)
	return a
}

type MyStruct struct {
	a int
}

func test3(){
	var a counter = 1;
	fmt.Printf("%v %T \n", a, a)
	fmt.Printf("%v %T \n", a.inverse(), a.inverse())
}

type counter int;
func (a counter) inverse() counter {
	return -a;
} 