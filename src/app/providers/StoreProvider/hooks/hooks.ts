import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/providers/StoreProvider";
import { AppThunkDispatch } from "src/app/providers/StoreProvider/model/types.ts";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
