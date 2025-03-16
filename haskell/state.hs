{-# OPTIONS_GHC -Wno-unrecognised-pragmas #-}
{-# HLINT ignore "Use >>" #-}
{-# HLINT ignore "Use >=>" #-}
module StateTransformer where

-- Define the StateT monad transformer
-- This definition automatically creates the runStateT function
-- runStateT :: StateT s m a -> (s -> m (a, s))
-- which extracts the function wrapped by the StateT constructor
newtype StateT s m a = StateT { runStateT :: s -> m (a, s) }


-- temp - test START
newtype Holder a = Holder a

example7 :: StateT Int Holder String
example7 = StateT (\state -> Holder ("result", state + 1))

myStateT :: StateT Int IO String
myStateT = StateT (\state -> return ("result", state + 1))

-- example6 :: Holder (String, Int)
-- example6 :: IO (String, Int)
example6 = 
    let 
        mayb = runStateT example7 5
    in mayb 
-- temp - test END



-- Get the current state
get :: Monad m => StateT s m s
get = StateT (\s -> return (s, s))

-- Replace the state with a new state
put :: Monad m => s -> StateT s m ()
put s = StateT (\_ -> return ((), s))

-- Modify the state with a function
modify :: Monad m => (s -> s) -> StateT s m ()
modify f = do
    s <- get
    put (f s)

-- Lift a computation from the underlying monad
lift :: Monad m => m a -> StateT s m a
lift m = StateT $ \s -> do
    a <- m
    return (a, s)

-- Instance declarations

-- Functor instance
instance (Functor m) => Functor (StateT s m) where
    fmap f m = StateT $ \s -> 
        fmap (\(a, s') -> (f a, s')) (runStateT m s)

-- Applicative instance
instance (Monad m) => Applicative (StateT s m) where
    pure a = StateT $ \s -> return (a, s)
    mf <*> ma = StateT $ \s -> do
        (f, s') <- runStateT mf s
        (a, s'') <- runStateT ma s'
        return (f a, s'')

-- Monad instance
instance (Monad m) => Monad (StateT s m) where
    return = pure
    (>>=) :: Monad m => StateT s m a -> (a -> StateT s m b) -> StateT s m b
    -- m >>= k = StateT $ \s -> do
    --     (a, s') <- runStateT m s
    --     runStateT (k a) s'
    m >>= k = StateT ( 
        \s -> runStateT m s 
            >>= \(a, s') -> runStateT (k a) s'
        )

    -- this will be called when we call >>= after put 10
    -- m = after Put 10 new c`reated StateT
    -- k = everything after put 10 as a function 
    -- StateT = note we are creating StateT but not calling runStateT i.e it's function yet
    -- when the f^n will be called it will 
    -- runStateT = runStateT acts like an extractor which calls the constructor function

-- Example usage
example4 :: StateT Int Maybe String
example4 = do
    s <- get 
    put 10
    modify (+5)
    s <- get
    return $ "Current state: " ++ show s

example5 :: Maybe Int
example5 = 
    let 
        mayb = runStateT example4 5
    in mayb >>= \v -> Just (snd v)


-- Example 2 usage
example :: StateT Int IO String
example = do
    put 10
    modify (+5)
    s <- get
    return $ "Current state: " ++ show s



example2 :: StateT Int IO String
example2 = do
    put 10
    s1 <- get
    lift $ putStrLn $ "State before modify: " ++ show s1
    modify (+5)
    s2 <- get
    lift $ putStrLn $ "State after modify: " ++ show s2
    return $ "Current state: " ++ show s2


example20 :: StateT Int IO String
example20 = put 10 
    >>= \x -> get 
    >>= \s1 -> lift (putStrLn $ "State before modify: " ++ show s1) 
    >>= \_ -> modify (+5) 
    >>= \_ -> get 
    >>= \s2 -> lift (putStrLn $ "State after modify: " ++ show s2) 
    >>= \_ -> return ("Current state: " ++ show s2)

-- >>= StateT (\_ -> return ((), 10)), [(\x) -> ...]
-- StateT ( 
--    \s -> runStateT { StateT (\_ -> return ((), 10))} s 
--          >>= \(a, s') -> runStateT ([(\x) -> ...] a) s'
--  )

-- on call 
--    \0 -> runStateT { StateT (\_ -> return ((), 10))} 0
--          >>= \(a, s') -> runStateT ([(\x) -> ...] a) s'
-- >
--    \0 -> IO ((), 10))
--          >>= \(a, s') -> runStateT ([(\x) -> ...] a) s' 

-- as you can see so the call `runStateT example2 0` retuns an IO monad
-- returning IO monad mean we got out of StateT monad 

example3 :: StateT String IO String
example3 = do
    s1 <- get
    put "hello"
    lift $ putStrLn $ "State before modify: " ++ show s1
    modify (\s -> "Ketan")
    s2 <- get
    lift $ putStrLn $ "State after modify: " ++ show s2
    return $ "Current state: " ++ show s2


-- Run the example
main :: IO ()
main = do

    let result = runStateT example4 0

    result <- runStateT example2 0
    result2 <- runStateT example3 "init-state"
    putStrLn $ "Result: " ++ fst result
    putStrLn $ "Final state: " ++ show (snd result)
    putStrLn $ "Result2: " ++ fst result2
