import { useRef, useState } from 'react';
import style from "./photoUploader.module.scss"
import { UploadFile } from '../Icons';

export default function PhotoUploader ({ onImageUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
//   const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUpload = async () => {
    event.preventDefault()
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'images');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/ddggwaua5/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log('Image uploaded:', data.secure_url);
      onImageUpload(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (<div>
    <div  className={style.container}>
      <input type="file" onChange={handleFileChange} className={style.fileInput} id='file'
    //   ref={fileInputRef}
      />
      <label htmlFor='file' className={style.fileInput__btn}>
       <UploadFile/>
      <span className={style.fileInput__text}>Choose file</span>
      </label>
      <button onClick={handleUpload} disabled={!selectedFile} className={style.btn}>
        Upload
      </button>

    </div>
      {fileName && <p className={style.fileName} >{fileName}</p>}
      </div>
  );
};


