import { FileUploader } from 'react-drag-drop-files';

// interface
import ImageProps from '../../interface/predict';

// icons
import RightIcon from '../../assets/icons/righticon';
import LeftIcon from '../../assets/icons/lefticon';

const fileTypes = ['JPG', 'PNG', 'JPEG'];
function ImageSlider({
  imageList,
  isDrag,
  currentImageIndex,
  // modalOpen,
  // setImageList,
  imageRegistHandler,
  setCurrentImageIndex,
  // closeModal,
  // openModal,
  setIsDrag,
}: ImageProps) {
  // const modalName = 'imageLimit';

  const indexLeftHandler = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? imageList.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };
  const indexRightHandler = () => {
    const isLastSlide = currentImageIndex === imageList.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  if (imageList.length !== 0) {
    return (
      <div className="ImageInput flex justify-center h-80 m-auto relative group ">
        <div className="ImageField  w-30 h-30">
          <img
            src={URL.createObjectURL(imageList[currentImageIndex])}
            alt="Images"
            className="rounded-2xl max-w-20 object-contain h-full "
          />
          {/* left  */}
          <button type="button" onClick={indexLeftHandler}>
            <LeftIcon styleString="hidden group-hover:block w-10 h-10 absolute top-[45%] left-[25%] text-2xl rounded-full bg-BACKGROUND-700 bg-opacity-30 p-2 text-FONT-50 cursor-pointer" />
          </button>
          {/* right */}
          <button type="button" onClick={indexRightHandler}>
            <RightIcon styleString="hidden group-hover:block w-10 h-10 absolute top-[45%] right-[25%]  text-2xl rounded-full bg-BACKGROUND-700 bg-opacity-30 p-2 text-FONT-50 cursor-pointer" />
          </button>
        </div>
      </div>
    );
  }
  // const imageRegistHandler = (files: File[]) => {
  //   const tempImagelist = [...imageList, ...files];

  //   if (tempImagelist.length > 10) {
  //     // alert('10개까지만 됨');
  //     openModal(modalName);
  //   } else {
  //     setImageList(tempImagelist);
  //   }
  // };
  return (
    <div className="ImageInput flex justify-center mt-10 h-[40vh] w-full ">
      <FileUploader
        handleChange={imageRegistHandler}
        name="file"
        types={fileTypes}
        multiple
        onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}>
        <div className="flex justify-center w-[100vh] h-full rounded-lg bg-opacity-60 outline-dashed outline-4 outline-BACKGROUND-300 bg-BACKGROUND-100">
          {!isDrag && (
            <div className="text-center text-2xl font-bold self-center">
              Upload
            </div>
          )}
        </div>
      </FileUploader>
    </div>
  );
}

export default ImageSlider;
