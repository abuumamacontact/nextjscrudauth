import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";
import React, { useRef } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const uploadInputRef = useRef<HTMLDivElement>(null);

  const chooseReplacement = () => {
    onChange("");
    uploadInputRef.current
      ?.querySelector<HTMLInputElement>('input[type="file"]')
      ?.click();
  };

  if (value) {
    return (
      <div className="flex items-start gap-3">
        <div className="relative size-40">
          <img
            src={value}
            alt="Uploaded plant"
            className="h-full w-full rounded-md object-cover"
          />
          <button
            onClick={chooseReplacement}
            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 shadow-sm hover:bg-red-600"
            type="button"
            aria-label="Choose a different image"
          >
            <XIcon className="h-4 w-4 text-white" />
          </button>
        </div>
        <div
          ref={uploadInputRef}
          className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <UploadDropzone<OurFileRouter, "postImage">
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              if (res?.[0]?.ufsUrl) onChange(res[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-25 flex items-center">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
                    //updates the image

          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;