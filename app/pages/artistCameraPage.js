let imgUrlfromCamera = document.getElementById('imgUrl') 
/* let captureImage; */


function initCameraPage() {
  if(localStorage.getItem(LS_CURENTARTIST_KEY)){
    currentLoggedArtist = JSON.parse(localStorage.getItem(LS_CURENTARTIST_KEY))
  }
  toLandingPage()
  const liveStream = document.getElementById('liveStream')
  const capture = document.getElementById('capture')
  const canvas = document.getElementById('canvasId')
  const previewCapture = document.getElementById('previewCapture')
  
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: "environment" }
    }
  }).then(stream => {
    liveStream.srcObject = stream
  })
  
  liveStream.addEventListener('canplay', function(){
    canvas.width = liveStream.videoWidth
    canvas.height = liveStream.videoHeight
  })
  previewCapture.src = ''
  imgUrlfromCamera.src = '' 
  
  capture.addEventListener('click', function(){
    const cxt = canvas.getContext('2d')
    cxt.drawImage(liveStream, 0,0)
    let captureImage = canvas.toDataURL("image/png")
    previewCapture.src = captureImage
    
    location.hash = '#addNewItemPage'
    location.hash = '#addNewItemPage'
    divColCapture.style.display = 'block'
    divColInEdit.style.display = 'none' 
    imgUrlfromCamera.src = previewCapture.src 
    stopLiveVideo ()
  }) 

}

function clearCanvas(canvas){
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function stopLiveVideo (){
  location.hash = '#addNewItemPage'
  const stopLiveStream = liveStream.srcObject

  const tracks = stopLiveStream.getTracks()
  tracks.forEach(track => {
    track.stop()
  });
}
