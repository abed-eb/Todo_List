import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./Store";

export const useTodoDispatch: () => AppDispatch = useDispatch;
export const useTodoSelector: TypedUseSelectorHook<RootState> = useSelector;