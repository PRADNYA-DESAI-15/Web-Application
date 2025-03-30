import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/files/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:8000/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("File uploaded successfully!");
            fetchFiles();
        } catch (error) {
            console.error("Error uploading file", error);
        }
    };

    return (

        <div className="container mt-4">
            <h2>Upload a File</h2>
            <input type="file" onChange={handleFileChange} className="form-control mb-2" />
            <button className="btn btn-primary" onClick={handleUpload}>Upload</button>

            <h3 className="mt-4">Uploaded Files</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Upload Date</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.file.split("/").pop()}</td>
                            <td>{new Date(file.upload_date).toLocaleString()}</td>
                            <td>
                                <a href={`http://localhost:8000${file.file}`} download className="btn btn-success btn-sm">
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileUpload;
