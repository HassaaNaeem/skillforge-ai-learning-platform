import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "./index"
import { useSelector } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector)