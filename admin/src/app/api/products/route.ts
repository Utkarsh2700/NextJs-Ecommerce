import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  // console.log("req", req);
  const { title, description, price, images, category, properties } =
    await req.json();
  await dbConnect();

  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  return Response.json(
    {
      productDoc,
    },
    {
      status: 200,
    }
  );
}

export async function GET(req: Request, res: Response) {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  // if (!id) {
  //   return;
  // }
  if (id) {
    const products = await Product.findById(id);

    return Response.json({ products }, { status: 200 });
  }
  const products = await Product.find();
  return Response.json({ products }, { status: 200 });
}

export async function PUT(req: Request, res: Response) {
  await dbConnect();
  const { title, description, price, _id, images, category, properties } =
    await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(_id, {
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  return Response.json(
    {
      updatedProduct,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req: Request, res: Response) {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const deletedProduct = await Product.findByIdAndDelete(id);

  return Response.json(
    {
      deletedProduct,
    },
    {
      status: 200,
    }
  );
}
