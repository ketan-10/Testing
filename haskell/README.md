Haskell Monad

Monad is just like an class with following operations supported

￼![Monads](https://github.com/user-attachments/assets/4c8ecd0f-7178-4c86-a4b7-a7aba6efc0f1)


Monad is an trap, once a value is encapsulated in a monad, it can be extracted out for an operation but the operation must return the same monad.

If you see function >>= once we pass the operation to monad, monad can use that function anyways, in this function we get the inner value and must return the same monad again. 

Now monad will use this function to transform according to its logic
As list [] is also an monad 
‘do [1,2,3] >>= a -> return [ “hello” + a ]’
Will return 
[ hello1, hello2, hello3 ]
Also another example: 

![image](https://github.com/user-attachments/assets/1257567c-d113-4424-bc56-dd515718a615)



Videos: 
Best explanation by jamesKool: https://youtu.be/HIBTu-y-Jwk?si=C3v9vaOAjsa0VU9n

Haskell Example : https://youtu.be/IBB7JpbClo8?si=SVcbH1_Qco8ZMeuv
