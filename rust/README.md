[Learning Rust: Memory, Ownership and Borrowing](https://www.youtube.com/watch?v=8M0QfLUDaaA)

[YouCodeThings](https://www.youtube.com/c/YouCodeThings/videos)

[Rust, WebAssembly, and the future of Serverless by Steve Klabnik](https://www.youtube.com/watch?v=CMB6AlE1QuI)

[Pointers and dynamic memory - stack vs heap](https://youtu.be/_8-ht2AKyH4)

```java
class Player {
  public String name;  
}

public main(){
  Player player1 = new Player();
  
  {
    Player player2 = new Player();
    player2.name = new String("John");
    player1.name = Player2.name;
  } // player2 is destroyed here 
  // but player1.name is still valid,
  // as gc will detect that `new String("John")`
  // still has a reference on it of player1,
  // so reference count is now 1 from 2.

  print(player1.name); 
}

```