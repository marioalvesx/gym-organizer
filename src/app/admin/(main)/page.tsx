import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ExerciseDataTable } from "./_components/exercises-data-table";
import { Button } from "@/components/ui/button";
import { ExerciseUpsertSheet } from "./_components/exercise-upsert-sheet";
import { PlusIcon } from "@radix-ui/react-icons";
import { getUserExercises } from "./actions";

export default async function Page() {
  const exercises = await getUserExercises();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Exercises</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <ExerciseUpsertSheet>
            <Button variant={"outline"} size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-3" />
              Add exercise
            </Button>
          </ExerciseUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <ExerciseDataTable data={exercises} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
