import { getSession, useSession } from "next-auth/client";
// import prisma from "../db/connect";
import useProtectedRoute from "../utils/useProtectedRoute";

export default function Test() {
  const [session, loading] = useSession();
  useProtectedRoute();

  if (session) {
    return <div>{session.user.name}</div>;
  }

  return <div>...Loading</div>;
}

// export async function getServerSideProps(context) {

//   const allUsers = await prisma.users.findMany();
//   console.log(allUsers);

//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//       text: "asdf",
//     },
//   };
// }
