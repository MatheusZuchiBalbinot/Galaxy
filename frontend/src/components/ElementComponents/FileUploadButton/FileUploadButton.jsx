import { HiOutlinePhotograph } from 'react-icons/hi';

function FileUploadButton({ uploadedFile, setUploadedFile }) {
  const handleFileUpload = (file) => {
    const inputFile = file.target;

    if (inputFile.files && inputFile.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const dataUrl = e.target.result;

        const typeIndex = dataUrl.indexOf(':') + 1;
        const typeEndIndex = dataUrl.indexOf(';');
        const fileType = dataUrl.substring(typeIndex, typeEndIndex);

        if (fileType.includes('video/')) {
          setUploadedFile({
            video: true,
            url: dataUrl,
          });
        } else if (fileType.includes('image/png') || fileType.includes('image/jpeg')) {
          setUploadedFile({
            image: true,
            url: dataUrl,
          });
        } else {
          throw new Error('Tipo de arquivo não suportado.');
        }
      };

      reader.readAsDataURL(inputFile.files[0]);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('inputFile').click();
  };

  return (
    <>
      <HiOutlinePhotograph onClick={handleButtonClick} />
      <input
        type="file"
        id="inputFile"
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload(e)}
      />
    </>
  );
}

export default FileUploadButton;
