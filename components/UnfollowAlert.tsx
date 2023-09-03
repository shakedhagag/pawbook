"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { FriendProps } from "@/store/slicers/friendsSlice";
import { unfollowFriend } from "@/store/slicers/friendsSlice";
import { useDispatch } from "react-redux";

type UnfollowAlertProps = {
  friend: FriendProps;
  id: string | undefined;
};

export const UnfollowAlert: React.FC<UnfollowAlertProps> = ({ friend, id }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">Unfollow</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently unfollow{" "}
              {friend.name} and remove them from your friends list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => dispatch(unfollowFriend(friend, id))}
              className="bg-red-500 hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
