import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getUserExercises } from "./actions";

export type Exercise = ReturnTypeWithoutPromise<typeof getUserExercises>[0];
