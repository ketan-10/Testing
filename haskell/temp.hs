module StateTransformer where

newtype Holder a = Holder a

newtype StateT s m a = StateT (s -> m (a, s))

runStateT :: StateT s m a -> s -> m (a, s)
runStateT (StateT f) = f -- 'constructor pattern matching' like `(Just x) = x`

-- "above same as: " -> newtype StateT s m a = StateT { runStateT :: s -> m (a, s) }


example7 :: StateT Int Holder String
example7 = StateT (\state -> Holder ("result", state + 1))

example8 :: StateT Int Holder String
example8 = 
    let 
        mayb = StateT ( \s ->  Holder ("result", s + 1))
    in mayb 

-- myStateT :: StateT Int IO String
-- myStateT = StateT (\state -> return ("result", state + 1))

example6 :: Holder (String, Int)
example6 = 
    let 
        mayb = runStateT example8 5
    in mayb 



