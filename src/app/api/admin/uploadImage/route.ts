// import { createRouter } from "next-connect";
// import multer from "multer";

// const upload = multer({
//   // Disk Storage option
//   storage: multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// //const storage = multer.memoryStorage() // Memory Storage option pass along as stream
// //const upload = multer({ storage: storage })

// const apiRoute = createRouter();

// apiRoute.use(upload.array("files")).post((req, res) => {
//   res.status(200).json({ data: "Success" });
// });

// apiRoute.all((req, res) => {
//   res.status(405).json({
//     error: "Method not allowed",
//   });
// });

// export default apiRoute.handler({
//   onError(err, req, res) {
//     res.status(400).json({
//       err,
//     });
//   },
// });
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   //   const request = req;
//   const images = req.body;
//   console.log(images);

//   return new NextResponse(JSON.stringify({ hello: "world" }), {
//     headers: { "content-type": "application/json" },
//   });
// }
