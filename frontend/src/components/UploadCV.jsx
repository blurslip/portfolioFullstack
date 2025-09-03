import { useRef, useState } from "react";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;
function UploadCV() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch(`${BASE_URL}/api/cv/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Upload Failed");
        setUploadStatus("Upload Failed");
      } else {
        toast.success("File Uploaded");
        setUploadStatus("File Uploaded");
      }
    } catch (error) {
      setUploadStatus("Upload Failed");
      toast.error("Upload Failed");
      console.error("Something Went Wrong", error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="flex dark:bg-bgprimary items-center justify-center mt-6 mb-6 px-4">
      <div className="w-full flex flex-col items-center justify-center border border-navblock rounded-2xl max-w-md mx-auto py-8 px-6">
        <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-6 text-center">
          Upload Your Latest CV
        </h2>
        <form
          onSubmit={handleUpload}
          className="w-full flex flex-col items-center"
        >
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer mt-2"
          >
            Upload CV
          </button>
        </form>
        {uploadStatus === "Upload Failed" && (
          <p className="mt-4 text-red-400 font-medium">{uploadStatus}</p>
        )}
        {uploadStatus === "File Uploaded" && (
          <p className="mt-4 text-green-400 font-medium">{uploadStatus}</p>
        )}
        {uploadStatus !== "" && uploadStatus !== "Upload Failed" && uploadStatus !== "File Uploaded" && (
          <p className="mt-4 text-yellow-400 font-medium">{uploadStatus}</p>
        )}
      </div>
    </div>
  );
}
export default UploadCV;
