import defaltImg from "../assets/image/defalt-img.jpg";

export const InputImgComponent = ({ img, alt }) => {

  if (img === "false" || !img) {
    img = defaltImg;
    alt = "defalt img";
  } else {
    img = `${process.env.REACT_APP_IMAGE_URL}` + img;
  };

  const handleImgError = (e) => {
    e.target.src = defaltImg;
  }

  return (
    <img src={img} alt={alt} onError={handleImgError} />
  )
};