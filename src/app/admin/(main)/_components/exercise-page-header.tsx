import { DashboardPageHeaderNav } from "@/components/dashboard/page";
import { ExerciseUpsertSheet } from "./exercise-upsert-sheet";
import { Button } from "@/components/ui/button";

export function ExercisePageHeader() {
  return (
    <DashboardPageHeaderNav>
      <ExerciseUpsertSheet>
        <Button>Add exercise</Button>
      </ExerciseUpsertSheet>
    </DashboardPageHeaderNav>
  );
}
