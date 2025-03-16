import Data.List

import System.IO

maxInit :: Int
maxInit = sum [1..100]

mycustomMap :: (a -> b) -> [a] -> [b]
mycustomMap _ [] = []
mycustomMap f (x:xs) = f x : mycustomMap f xs

-- main :: IO()
-- main = print maxInit

-- temp = mycustomMap (+ 1) [1..5]
-- main :: IO()
-- main = print temp


-- example :: [[Int]]
-- example = do
--     a <- [1,2,3]
--     b <- [10,20,30]
--     return [a, b]


-- example5 :: Maybe
-- example5 = do
--     a <- Just 10


example :: [Maybe Int]
example = do
    a <- [1,2,3]
    return (Just a)

-- [1,2,3].flatMap(a => [1, 2, 3])

example4 :: [Int]
example4 = do
    return 10

example3 :: Maybe Int
example3 = do
    return 10

example2 :: [Int]
example2 = do
    a <- [1,2,3]
    let value = 10
    let square = value * value
    b <- [square, value, 30]
    return 40

-- same as 

example20 :: [Int]
example20 = [1,2,3] >>= 
                \a ->
                    let value = 10
                        square = value * value
                    in [square, value, 30] 
                        >>= \b -> return 40


-- same as 

-- example21 :: [Int]
-- example21 = >>= ([1,2,3]
--                 \a -> (
--                         >>= (let value = 10 square = value * value
--                                 in [square, value, 30]
--                             ) 
--                             \b -> return 40)
--                         )

-- main :: IO()
-- main = print (mycustomMap (+1) [1..5])

main :: IO()
main = print example20

