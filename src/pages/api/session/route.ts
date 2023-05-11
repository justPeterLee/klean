// import { getSession } from "next-auth/react";
// import prisma from "../../../../lib/db";

// export default async function handler(req: any, res: any) {
//   let session = await getSession({ req });

//   if (!session) {
//     session = {
//       cart: [],
//     };
//   }

//   if (!session.cart) {
//     session.cart = [];
//   }

//   if (req.method === "POST") {
//     const { item } = req.body;

//     session.cart.push({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//     });

//     // await updateSession(session);

//     res.status(200).json({ success: true });
//   } else if (req.method === "DELETE") {
//     const { id } = req.query;

//     const index = session.cart.findIndex((cartItem) => cartItem.id === id);
//     if (index !== -1) {
//       session.cart.splice(index, 1);
//       await updateSession(session);
//       res.status(200).json({ success: true });
//     } else {
//       res
//         .status(404)
//         .json({ success: false, message: "Item not found in cart" });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method not allowed" });
//   }
// }

// async function updateSession(session: any) {
//   await prisma.session.upsert({
//     where: { sessionId: session.id },
//     create: { sessionId: session.id, data: session },
//     update: { data: session },
//   });
// }
