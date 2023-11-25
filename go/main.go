package main

import "fmt"

type MyObj struct {
  name string 
  age int32
  friends map[string]int
  secondMap *map[string]int
}

func pointerFun(m *map[string]int){

  // *m = make(map[string]int) // <- error, can not de-ref

  if m == nil {
    fmt.Println("Pointer Map is Null")
    var k map[string]int
    m = &k 
  }

  if *m == nil {
    fmt.Println("Dref is null")
    *m = make(map[string]int)
  }

  fmt.Print("M is : ")
  fmt.Println(m)

}


func main() {
  var o1 MyObj
  o2 := MyObj{}
  var o3 *MyObj

  fmt.Println(o1.friends == nil)
  fmt.Println(o2.friends == nil)

  var m1 map[string]int
  m2 := map[string]int{}

  fmt.Println("Map1: ", m1, " Map2: ", m2)
  m2["ketan"] = 10
  fmt.Println("Map1: ", m1, " Map2: ", m2)
  // m1["pooja"] = 17 // <-- error
  fmt.Println("Map1: ", m1, " Map2: ", m2)

  if &o1 == nil {
    fmt.Println("O1 is null")
  }

  o3 = &o1
  if o3 == nil {
    fmt.Println("O2 is null")
  }

  o3.age = 20

//  fmt.Println(o1)

  // pointerFun(nil)

  var m *map[string]int;

  // var k map[string]int  // <- holds zero value (null)
  // m = &k

  // m = &map[string]int{} // <- both have value

  m = new(map[string]int)  // <- de-ref does not have value


  if m == nil {
    fmt.Println("Pointer Map is Null")
    var k map[string]int
    m = &k 
  }

  if *m == nil {
    fmt.Println("Dref is null")
    *m = make(map[string]int)
  }


}
