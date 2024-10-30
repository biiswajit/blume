import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  accept,
}: {
  onChange?: (file: File) => void;
  accept?: string;
}) => {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFile: File) => {
    setFile(newFile);
    onChange && onChange(newFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: (files: File[]) => handleFileChange(files[0]),
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-background border-neutral-200 dark:border-neutral-800 rounded-lg">
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            accept={accept || ".pdf,.doc,.docx,application/msword,image/*"}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0)
                handleFileChange(e.target.files[0]);
            }}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-foreground text-base">
              Upload file
            </p>
            <p className="relative z-20 font-sans font-normal text-foreground/50 text-base mt-2">
              Drag or drop your files here or click to upload
            </p>
          </div>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {!file && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-blume-blue-100 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-foreground flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-foreground" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-foreground" />
                )}
              </motion.div>
            )}

            {!file && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-blume-orange-100 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}

            {file && (
              <motion.div
                layoutId={"file-upload"}
                className={cn(
                  "relative overflow-hidden z-40 bg-background flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                  "shadow-sm",
                )}
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-base text-foreground truncate max-w-xs"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-foreground bg-background shadow-input"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>
                <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-foreground">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                  >
                    {file.type}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
