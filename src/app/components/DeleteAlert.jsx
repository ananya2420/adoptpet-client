"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteAlert({ pet }) {
  const { _id, petName } = pet;

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/pet/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include"
    });

    const data = await res.json();
    redirect('/pets')
    console.log(data);
  };
  return (
    <AlertDialog>
      <Button className={"text-red-500 rounded-none"} variant="outline">
        <TrashBin /> Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete pet part permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{petName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            {/* FIXED: Added Tailwind flex layout classes to push children to the right and add spacing */}
            <AlertDialog.Footer className="flex justify-end gap-2 w-full">
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}