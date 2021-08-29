package main


func main(){
	myMap := make(map[string]bool);

	myMap["a"] = true;
	val,err := myMap["a"]

	println(val,err);
}