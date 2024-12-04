import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../slices/cartCountSlice";
import { setTrue, setFalse } from "../slices/loggedInSlice";

export default function AddItems() {
  const [incrementAmount, setIncrementAmount] = useState(0);
  // const [cartCount, setCartCount] = useState(0);

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.loggedIn.value);

  const handleLogin = () => {
    if (loggedIn) {
      dispatch(setFalse());
    } else {
      dispatch(setTrue());
    }
  };

  return (
    <div>
      {/* <h1 className="text-white">Number of Items in Cart: {}</h1> */}
      <div className="text-white">
        <button onClick={() => dispatch(increment())} className="px-3">
          +
        </button>
        <button onClick={() => dispatch(decrement())} className="px-3">
          -
        </button>
        <input
          onChange={(e) => setIncrementAmount(parseInt(e.target.value))}
          className="text-black"
          type="number"
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
          className="px-3"
        >
          Add X Items
        </button>
        <button
          onClick={() => dispatch(incrementAmount(0))}
          className="bg-blue-500 p-2 rounded-full"
        >
          Clear Cart
        </button>
      </div>
      <button onClick={handleLogin}>Log In/Out</button>
    </div>
  );
}
