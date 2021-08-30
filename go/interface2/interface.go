package main

import (
	"bytes"
	"fmt"
)

func main() {
	var b WriterCloser = NewBufferedWriterCloser()

	data, err := b.Write([]byte("ketan Chaudhari"))
	b.Close()
	b.Write([]byte("ketan Chaudhari"))

	r, ok := b.(*BufferedWriterCloser)

	if ok {
		fmt.Println("Value: ", r.buffer.String())
	} else {
		fmt.Println("not ok")
	}

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(data)

	
	// bwc := BufferedWriterCloser{
	// 	buffer: bytes.NewBuffer([]byte{}),
	// }
	// var bi WriterCloser = bwc;

	// cant be permited as 'write' method is pointer receiver
	// and if 'write' method modifies the value bwc will not be modified.
	// https://stackoverflow.com/questions/33587227/method-sets-pointer-vs-value-receiver

}

type Writer interface {
	Write(p []byte) (n int, err error)
}

type Closer interface {
	Close() error
}

type WriterCloser interface {
	Writer
	Closer
}

type BufferedWriterCloser struct {
	buffer *bytes.Buffer
}

func (b *BufferedWriterCloser) Write(p []byte) (int, error) {
	buff := b.buffer
	n, err := buff.Write(p)

	if err != nil {
		return 0, err
	}

	v := make([]byte, 8)
	for buff.Len() > 8 {
		_, err := buff.Read(v)

		if err != nil {
			return 0, err
		}
		fmt.Println(string(v))

	}
	return n, nil
}

// 😮😮 -> if no pointer, creates new object; if pointer use the same object
// func (b *BufferedWriterCloser) Close() error {
func (b BufferedWriterCloser) Close() error {
	b.buffer = nil
	return nil
}

// bufferedWriterCloser constructor
// this stack allocation is promoted to heep here. as we are returning * pointer of stack memory out of stack
func NewBufferedWriterCloser() *BufferedWriterCloser {
	return &BufferedWriterCloser{
		buffer: bytes.NewBuffer([]byte{}),
	}
}

