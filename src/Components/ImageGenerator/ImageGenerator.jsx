import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assests/default_image.svg'

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading,setLoading]=useState(false)

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true)
    const response = await fetch(
      "https://ai-image-generator3.p.rapidapi.com/generate",
      {
        method: "POST",
        headers: {
          'x-rapidapi-key': 'cccaad7df8mshdba3bcb86ec1d01p1c3ebfjsn8e4bda46c07f',
          'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          width:1080,
          height:1080
        }),
      }
    );
    let data = await response.json();
    let fimg = data.results.images[0]
    setImage_url(fimg)
    setLoading(false)
  }


  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img className='imgmain' src={image_url === "/" ? default_image : image_url} alt="" />
          <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
          </div>
        </div>
        <div className="search-box">
          <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want to See' />
          <div className="generate-btn" onClick={() => { imageGenerator() }} >Generate</div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator


