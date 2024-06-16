"use server";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { deleteExerciseSchema, upsertExerciseSchema } from "./schema";
import { z } from "zod";

export async function getUserExercises() {
  const session = await auth();

  const exercises = await prisma.exercise.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return exercises;
}

export async function upsertExercise(
  input: z.infer<typeof upsertExerciseSchema>
) {
  const session = await auth();

  console.log(input);

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }

  if (input.id) {
    // If has id, update exercise
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!exercise) {
      return {
        error: "Not found",
        data: null,
      };
    }

    const updatedExercise = await prisma.exercise.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    });

    return {
      error: null,
      data: updatedExercise,
    };
  }

  if (!input.title) {
    return {
      error: "Title is required",
      data: null,
    };
  }
  if (!input.series) {
    return {
      error: "Series are required",
      data: null,
    };
  }
  if (!input.repetitions) {
    return {
      error: "Repetitions are required",
      data: null,
    };
  }

  const exercise = await prisma.exercise.create({
    data: {
      title: input.title,
      series: input.series,
      repetitions: input.repetitions,
      userId: session?.user?.id,
    },
  });

  return exercise;
}

export async function deleteExercise(
  input: z.infer<typeof deleteExerciseSchema>
) {
  const session = await auth();

  console.log(input);

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!exercise) {
    return {
      error: "Not found",
      data: null,
    };
  }

  await prisma.exercise.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });

  return {
    error: null,
    data: "Exercise deleted successfully.",
  };
}
