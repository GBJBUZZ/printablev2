import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="flex justify-center p-5">
      <SignIn />
    </div>
  );
}
