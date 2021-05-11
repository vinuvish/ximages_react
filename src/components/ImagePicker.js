import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDropzone} from 'react-dropzone';
import CamerImg from "../assets/images/camera.png" 

const ImagePicker = (props) => {
  const [files, setFiles] = useState(props.image);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      if(!!acceptedFiles) {
        props.setImage(acceptedFiles);
      }
    }
  });
  
  const thumbs = files.map(file => (
    <div style={{position: "relative"}} key={file.name}>
      <Thumb>
        <CloseIcon onClick={() => setFiles([])}>x</CloseIcon>
        <ThumbInner>
          <Image
            src={file.preview}
          />
        </ThumbInner>
      </Thumb>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    // files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <DropZone {...getRootProps({className: 'dropzone'})}>
      {thumbs}
        <ImageContainer>
          <input {...getInputProps()} />
          <Picker>
            <PickerText />
          </Picker>
        </ImageContainer>
      </DropZone>
    </>
  );
}

const Thumb = styled.div`
  cursor: pointer;
  display: inline-flex;
  border-radius: 2;
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;

  @media (max-width: 425px) {
    width: 64px;
    height: 64px;
  }
`;

const CloseIcon = styled.div`
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  display: inline-flex;
  // width: 20px;
  // height: 20px;
  position: absolute;
  top: 2px;
  right: 13px;
  z-index: 999;

  @media (max-width: 425px) {
    width: 30px;
    height: 30px;
  }
`;

const ThumbInner = styled.div`
  min-width: 0;
  overflow: hidden;
  border-radius: 3px;
`;

const Image = styled.img`
  display: block;
  width: auto;
  height: 100%;
  overflow: hidden;

  @media (max-width: 425px) {
    width: 64px;
    height: 64px;
  }
`;


const DropZone = styled.div`
	width: 78px;
	height: 78px;
  background-color: transparent;
  z-index: 100;

  @media (max-width: 425px) {
    width: 64px;
    height: 64px;
  }
`;

const ImageContainer = styled.div`
	width: 200px;
	height: 200px;
	background-color: white;
	display: flex;
	justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;

  @media (max-width: 425px) {
    width: 64px;
    height: 64px;
  }
`;

const Picker = styled.div`
	width: 68px;
	height: 68px;
  // border: 1px dashed white;
	display: flex;
	justify-content: center;
  align-items: center;
  
  @media (max-width: 425px) {
    width: 52px;
    height: 52px;
  }
`;

const PickerText = styled.div`
  // color: #fff;
  background-image: url(${CamerImg});
  width: 68px;
  height: 68px;
  background-position: center;
`;

export default ImagePicker;