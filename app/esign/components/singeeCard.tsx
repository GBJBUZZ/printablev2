
interface SigneeType {
  firstName: string;
  lastName: string;
  email: string;
  bg: string;
  outline?: string ;
}

interface SigneeProps {
  signees: SigneeType[];
  removeSignee: any;
}

const SigneeCard = ({ signees, removeSignee }: SigneeProps) => {
  return (
    <>
      {}
      {signees.length > 0 && (
        <div className=" rounded-[5px]  mb-4 ">
          <h2 className="text-lg font-semibold mb-2">Other signees</h2>
          {signees.map((signee, index) => {
            const backgroundColor = signee.bg;
            const initial = signee.firstName
              ? signee.firstName.charAt(0).toUpperCase()
              : "?";

            return (
              <div
                key={index}
                className={`flex slide-down items-center p-2 mb-2 border-2 border-b-blue-700 bg-white rounded-md `}
                style={{ border: `2px solid ${signee.outline}` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2"
                  style={{ backgroundColor }}
                >
                  {initial}
                </div>
                <div className="flex-1 w-[30vh] overflow-hidden  ">
                  <p className="font-medium">
                    {signee.firstName} {signee.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{signee.email}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash cursor-pointer text-black"
                  viewBox="0 0 16 16"
                  onClick={() => removeSignee(index)}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default SigneeCard;
