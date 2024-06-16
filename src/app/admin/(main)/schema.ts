import { z } from "zod";

export const upsertExerciseSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  series: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, "Series must be at least 1")
    )
    .optional(),
  repetitions: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, "Repetitions must be at least 1")
    )
    .optional(),
  doneAt: z.string().optional().nullable(),
});

export const deleteExerciseSchema = z.object({
  id: z.string(),
});
