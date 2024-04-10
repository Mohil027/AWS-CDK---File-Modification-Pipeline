import AWS from "aws-sdk";
import { useState } from "react";
import { nanoid } from "nanoid";
import { FileInput, Label } from "flowbite-react";

function App() {
  
  const [file, setFile] = useState(null);
  
  const [textInput, setTextInput] = useState("");

  
  const uploadFile = async () => {
    
    const S3_BUCKET = "bucket027fovus";

    
    const REGION = "region";
    const id = nanoid();

    
    AWS.config.update({
      accessKeyId: "",
      secretAccessKey: "",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      
      alert("File uploaded successfully.");
    });
    const payload = {
      id: id,
      inputText: textInput,
      inputFile: file.name,
      
    };
  
    
    await fetch("https://bxvhy0q3pb.execute-api.us-east-2.amazonaws.com/prod/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  
  



  
  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    
    setFile(file);
  };

  
  const handleTextInputChange = (e) => {
    
    const value = e.target.value;
    
    setTextInput(value);
  };

  return (
    <div className="p-10 w-full md:w-3/4 flex-1">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Text input:</label>
        <input 
          type="text" 
          className="border border-gray-300 px-4 py-2 rounded-lg w-full" 
          onChange={handleTextInputChange} 
          value={textInput} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">File input:</label>
        <div className="flex items-center">
          <FileInput onChange={handleFileChange}/>
          {/* <input 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <label 
            htmlFor="fileInput" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Choose File
          </label> */}
          {file && <p className="ml-4">{file.name}</p>}
        </div>
      </div>
      <div>
        <button 
          onClick={uploadFile} 
          className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;