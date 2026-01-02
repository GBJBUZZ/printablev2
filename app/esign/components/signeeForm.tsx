"use client";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSignUrl } from "../useSign";
import SigneeCard from "./singeeCard";

interface Signee {
  email: string;
  firstName: string;
  lastName: string;
  bg: string;
  outline?: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
}

function SingerDetailsForm({ onlyOther }: { onlyOther: boolean }) {
  const [addSignee, setAddSignee] = useState(false);
  const { setSignerEmail, updateSignerEmail, signers_email } = useSignUrl();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signees, setSignees] = useState<Signee[]>([]);
  const { user } = useUser();
  const [errors, setErrors] = useState<FormErrors>({});

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const currentUser: Signee = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    bg: getRandomColor(),
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRepeat = signees.find((signe) => signe.email === email);

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    } else if (emailRepeat) {
      newErrors.email = "Email already added!";
    }

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSignee = () => {
    if (!validateForm()) return;

    const newSignee: Signee = {
      email,
      firstName,
      lastName,
      bg: getRandomColor(),
      outline: getRandomColor(),
    };

    setSignerEmail(email);
    console.log(signers_email);

    setSignees((prev) => [...prev, newSignee]);

    setEmail("");
    setFirstName("");
    setLastName("");
    setAddSignee(false);
    setErrors({});
  };

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    if (onlyOther) {
      setSignerEmail(email);
    } else {
      updateSignerEmail(email);
    }
    console.log(signers_email);
  }, [onlyOther, user]);

  const removeSignee = (index: number) => {
    updateSignerEmail(signees[index].email);
    setSignees((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="signeeForm">
      {!!onlyOther && (
        <>
          <h2 className="font-semibold text-[20px]">Your Details</h2>
          <div
            className="flex slide-down items-center p-2 mb-2 border-2 border-b-blue-700 bg-white rounded-md"
            style={{ border: "2px solid #4F46E5" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2"
              style={{ backgroundColor: "#6366F1" }}
            >
              JD
            </div>
            <div className="flex-1 w-[30vh] overflow-hidden">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-600">john.doe@example.com</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash cursor-pointer text-black"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </div>
        </>
      )}

      <SigneeCard signees={signees} removeSignee={removeSignee} />

      <div
        className={`p-4 bg-white rounded-lg shadow border border-gray-200 transition-all duration-[2000ms] ease-in-out ${
          addSignee ? "rounded-b-none" : "rounded-b-lg"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium">Add signee information</h2>
          <button
            className="text-[#06044B] cursor-pointer transition-transform duration-[2000ms] ease-in-out"
            onClick={() => setAddSignee(!addSignee)}
            aria-label="Toggle add signee form"
          >
            <span
              className={`inline-block transition-transform duration-[2000ms] ease-in-out ${
                addSignee ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus size={16} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-[2000ms] ease-in-out ${
          addSignee
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 bg-white rounded-b-xl width-full shadow border-t-0 border border-gray-200">
          <div className="space-y-2">
            <div>
              <label className="text-xs block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-3 py-2 h-[30px] text-sm bg-gray-200 rounded-md outline-none"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="enter first name"
                  className="w-full h-[30px] px-3 py-2 text-sm bg-gray-200 rounded-md outline-none"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-xs block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="enter last name"
                  className="w-full h-[30px] px-3 py-2 text-sm bg-gray-200 rounded-md outline-none"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="flex items-center gap-1 px-4 py-1.5 text-sm border border-[#06044B] text-[#06044B] rounded-full transition-colors duration-[2000ms] ease-in-out hover:bg-[#06044B] hover:text-green-300"
                onClick={handleAddSignee}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="w-full flex items-center justify-center gap-1 px-4 py-1.5 text-sm border border-[#06044B] text-[#06044B] rounded-full transition-colors duration-[2000ms] ease-in-out hover:bg-[#06044B] hover:text-green-300"
          // Add your save handler here, e.g., onClick={handleSaveSignee}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SingerDetailsForm;