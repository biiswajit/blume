import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  ...(process.env.NODE_ENV === "development" && {
    endpoint: "http://s3.localhost.localstack.cloud:4566",
    forcePathStyle: true,
  }),
});

export * from "@aws-sdk/client-s3";
