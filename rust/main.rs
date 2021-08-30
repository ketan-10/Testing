fn main() {
    println!("Hello, world!");
    let mut s = String::from("hello");
    {
        let s2 = &mut s;
        // append "world" to s2
        s2.push_str(" world");
        println!("{}", s2);
        println!("{}", s);
    }
    s.push_str(" again");
    println!("{}", s);
}
