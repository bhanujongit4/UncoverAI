"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { db, storage } from '../../../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import axios from 'axios';

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [validationFile, setValidationFile] = useState<File | null>(null);
  const [apiImage, setApiImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log("Files uploaded:", uploadedFiles);
  };

  const handleValidationUpload = (uploadedFiles: File[]) => {
    setValidationFile(uploadedFiles[0]);
    console.log("Validation image uploaded:", uploadedFiles);
  };

  const storeImagesInFirebase = async (inputImageUrl: string, outputImageUrl: string) => {
    try {
      const docRef = await addDoc(collection(db, "images"), {
        inputImage: inputImageUrl,
        outputImage: outputImageUrl,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleProcessImage = async () => {
    if (files.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', files[0]);

      try {
        const response = await axios.post('https://flaskbackend-1.onrender.com/infer', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob'
        });

        const outputImageURL = URL.createObjectURL(response.data);
        setApiImage(outputImageURL);

        // Upload input image to Firebase Storage
        const inputImageRef = ref(storage, `images/${files[0].name}`);
        await uploadBytes(inputImageRef, files[0]);

        // Upload API image to Firebase Storage
        const outputImageRef = ref(storage, `images/api_image_${Date.now()}.jpg`);
        await uploadBytes(outputImageRef, response.data);

        // Store both images in Firebase
        await storeImagesInFirebase(inputImageRef.fullPath, outputImageRef.fullPath);
        setSuccessMessage("Done");
      } catch (error) {
        console.error('Error processing the image', error);
        setSuccessMessage("Done");
      } finally {
        setLoading(false);
      }
    } else {
      setSuccessMessage("Please upload an image first.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label htmlFor="file-upload" className="mb-2 font-semibold text-center">Upload image/video</label>
          <FileUpload onChange={handleFileUpload} id="file-upload" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label htmlFor="validation-upload" className="mb-2 font-semibold text-center">Upload (optional) Validation image</label>
          <FileUpload onChange={handleValidationUpload} id="validation-upload" />
        </div>
      </div>

      <div className="w-full mt-8 p-4 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <h2 className="text-center font-semibold mb-4">API Output and Validation ✅</h2>

        <div className="flex justify-center gap-4 mb-4">
          {apiImage ? (
            <div className="flex flex-col items-center">
              <p className="text-center font-semibold mb-2">Processed Image:</p>
              <img src={apiImage} alt="API Output" className="max-w-xs rounded-lg" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-center font-semibold mb-2">Processed Image:</p>
              <img 
                src="https://via.placeholder.com/300" 
                alt="Placeholder" 
                className="w-72 h-72 object-cover rounded-lg" 
              />
            </div>
          )}

          {validationFile ? (
            <div className="flex flex-col items-center">
              <p className="text-center font-semibold mb-2">Uploaded Validation Image:</p>
              <img src={URL.createObjectURL(validationFile)} alt="Validation" className="max-w-xs rounded-lg" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-center font-semibold mb-2">Validation Image:</p>
              <p className="text-center text-gray-500">No validation image uploaded yet.</p>
            </div>
          )}
        </div>

        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            {successMessage}
          </div>
        )}

        <button 
          onClick={handleProcessImage} 
          className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Process and Upload Images'}
        </button>
      </div>
    </div>
  );
}
