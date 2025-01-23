import dbConnect from "@/lib/dbConnect";
import { Category } from "@/models/category.model";
import { auth } from "@/app/api/auth/[...nextauth]/options";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthResult } from "next-auth";
// import { NextApiResponse } from "next";

// export const GET = auth(async (req, res) => {
//   // if (req.auth) return NextResponse.json(req.auth);
//   // return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

//   const session = await auth(req, res);

//   await dbConnect();
//   return Response.json(
//     {
//       categories: await Category.find().populate("parent"),
//       message: "All Categories fetched Successfully",
//     },
//     { status: 200 }
//   );
// });

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const session = await auth(req, res);
  // console.log({ session });
  await dbConnect();
  return Response.json(
    {
      categories: await Category.find().populate("parent"),
      message: "All Categories fetched Successfully",
    },
    { status: 200 }
  );
}

export async function POST(req: Request, res: Response) {
  await dbConnect();
  const { name, parentCategory, properties } = await req.json();
  console.log("parentCategory", parentCategory);
  const categoryDoc = await Category.create({
    name,
    parent: parentCategory || undefined,
    properties,
  });
  return Response.json(
    { categoryDoc, message: "New Category Added Successfully" },
    { status: 201 }
  );
}

export async function PUT(req: Request, res: Response) {
  await dbConnect();
  const { name, parentCategory, _id, properties } = await req.json();
  console.log("parentCategory", parentCategory);
  const categoryDoc = await Category.findByIdAndUpdate(_id, {
    name,
    parent: parentCategory || undefined,
    properties,
  });
  return Response.json(
    { categoryDoc, message: "New Category Added Successfully" },
    { status: 201 }
  );
}

export async function DELETE(req: Request, res: Response) {
  await dbConnect();
  console.log(req);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const deletedCategory = await Category.findByIdAndDelete(_id);
  return Response.json(
    { deletedCategory, message: "Category Deleted Successfully" },
    { status: 200 }
  );
}
