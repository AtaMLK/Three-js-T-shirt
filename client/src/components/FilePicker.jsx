/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CustomButton from "./CustomButton";

function FilePicker({ file, setFile, readFile }) {
  return (
    <div className="filepicker-container">
      <input
        id="file-uploader"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="file-uploader" className="filepicker-label">
        Upload File
      </label>
      <p className="text-gray-600 text-xs mt-2 truncate">
        {" "}
        {file === "" ? "No file Selected" : file.name}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          customStyle="text-xs"
          handleClick={() => {
            readFile("logo");
          }}
        />
        <CustomButton
          type="filled"
          title="Full"
          customStyle="text-xs"
          handleClick={() => {
            readFile("full");
          }}
        />
      </div>
    </div>
  );
}

export default FilePicker;
