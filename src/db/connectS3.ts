import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  forcePathStyle: true, // If you want to use virtual host addressing of buckets, you can remove `forcePathStyle: true`.
  endpoint: "http://s3.localhost.localstack.cloud:4566", // TODO: remove this in production
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export * from "@aws-sdk/client-s3";
