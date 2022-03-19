package main

import "fmt"

type List[T any] []T

func fn[T any](t T) {
	fmt.Println(t)
}

func main() {
	fn(2)
	var a List[int]
	a = append(a, 0)
	fmt.Println(a)
}
