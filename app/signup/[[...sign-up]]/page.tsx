import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
     <div 
      className="flex min-h-screen items-center justify-center p-5 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Background for Login.svg')" }} // Ensure the filename matches exactly
    >
      {/* Overlay to make the sign-in box pop if the image is too bright */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm -z-10" />

      <div className="relative z-10">
        <SignUp />
      </div>
    </div>
  );
}

