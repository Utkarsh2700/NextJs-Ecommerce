import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";

const bucketName = "utkarsh-next-ecommerce";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    // console.log("formdata ", formdata);
    const files = formdata.getAll("file") as File[];
    // console.log("files ", files);
    // console.log("files.length ", files.length);

    const accessKeyId = process.env.S3_ACCESS_KEY;
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error("Access key credentials not found in Environment File");
    }

    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const links = [];
    for (const file of files) {
      // Here we are saving the file to localstorage but instead a better solution is store it on S3 bucket
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const filePath = `./public/${file.name}`;
      fs.writeFileSync(`./public/${file.name}`, buffer);
      revalidatePath("/");
      const ext = file.name.split(".").pop();
      // console.log(ext, file);
      // to make file name more unique we can add userId but we need to figure that out how.
      const newFilename = Date.now() + "." + ext;
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(filePath),
          ACL: "public-read",
          ContentType: mime.lookup(filePath) || file.type,
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
      fs.unlinkSync(filePath);
    }
    return NextResponse.json({
      links,
      message: "Files uploaded successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error.message },
      { status: 500 }
    );
  }
}
