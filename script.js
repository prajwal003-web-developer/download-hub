let data;

const info = document.getElementsByClassName("info")[0]
const loading =document.getElementById("loading")

const downloadBox = document.getElementsByClassName("download_box")[0]

//helpers
 const showLoading = ()=>{
        loading.classList.remove('hidden')
        info.classList.add('hidden')
    }

    const hideLoading = (show)=>{
        loading.classList.add('hidden')
        show==0? info.classList.remove('hidden'):""
    }

    const getHeading = (text)=>{
        const header = document.createElement("h4")
        header.innerText = text;

        downloadBox.appendChild(header)
    }

    const getLinks = (data={} , extra = "video") =>{

        Object.entries(data).map(([key , value], idx)=>{
            const link = document.createElement("a")
            link.href=value
            link.innerText = key + " "+ extra
            link.setAttribute("download", "")
            downloadBox.append(link)
        })

        
    }

    const getLink = (data)=>{
        if(!data || data==""){
            return 
        }
         const link = document.createElement("a")
            link.href=data
            link.innerText = "Download Video"
            link.setAttribute("download", "")
            // link.target = "_blank"
            downloadBox.append(link)
    }

    const LINK = "https://api.sonzaix.indevs.in/sosmed/"

 const YoutubeDownload = async (link)=>{
    let data ;
    let audios ;
    let err =1
    let download = "https://api.sonzaix.indevs.in/youtube/video?url="+link
    let downloadAudios = "https://api.sonzaix.indevs.in/youtube/music?url="+link

    try {
    const res = await fetch (download)
    const audiores = await fetch(downloadAudios)

    data = await res.json()
    audios = await audiores.json()

    console.log(data, audios)

    getHeading(data?.filename?.split(0,60) || "Download")

    getLinks(data?.download_link)
    getHeading("Audios")
    getLinks(audios?.download_link , "audio")
    } catch (error) {
        err=0
    }
    finally{
        hideLoading(err)
    }



   


 }

 const InstagramDownload = async (link)=>{
    let data ;
    let err =1
    let download = LINK+"instagram?url="+link

   try {
    const res = await fetch (download)
    data = await res.json()

    console.log(data)
    getHeading(data?.filename || "Download Instagram Video: ")

    getLink(data?.video_url)
    
   } catch (error) {
    err =0
   }
   finally{
    hideLoading(err)
   }

 }

 const TiktokDownload = async(link )=>{
    let data ;
    let err =1
    let download = LINK+"tiktok?url="+link

    try {
    const res = await fetch (download)
    data = await res.json()

    console.log(data)
    getHeading(data?.filename || "Download Tiktok Video: ")

    getLink(data?.data?.hdplay || data?.data?.play)
    
   } catch (error) {
    err =0
   }
   finally{
    hideLoading(err)
   }

 }

  const FacebookDownload = async(link)=>{
    let data ;
    let err =1
    let download = LINK+"facebook?url="+link

     try {
    const res = await fetch (download)
    data = await res.json()

    console.log(data)
    getHeading(data?.filename || "Download Facebook Video: ")

    getLink(data?.video_url_hd)
    getLink(data?.video_url_sd)
    
   } catch (error) {
    err =0
   }
   finally{
    hideLoading(err)
   }

 }

function handleDownloadFetch(){

    const inputTag = document.getElementsByTagName("input")[0]
    const link = inputTag.value

    inputTag.value=''

    if(link.length<=0){
        return
    }

    
    const urlType = getTypeOfUrl(link)

    if(!urlType || urlType ==""){
        alert("Url Cannot be verified")
        console.error("Cannot verify URL")
        return
    }
    showLoading()

    switch(urlType){
        case "Youtube":
                YoutubeDownload(link);
                break;
        case "Facebook":
                FacebookDownload(link)
                break;
        case "Instagram":
                InstagramDownload(link)
                break;
        case "Tiktok":
                TiktokDownload(link)
                break;
        default:
            console.log("ERROR")
    }

    console.log(urlType , link)
}

const getTypeOfUrl = (link="APPLE")=>{
    let retValue =''
    if(link.includes("www.instagram.com")){
        retValue = "Instagram"
    } 
    else if(link.includes("tiktok")){
        retValue = "Tiktok"
    }
    else if(link.includes("youtu.be") || link.includes("youtube")){
        retValue ="Youtube"
    }
    else if (link.includes("facebook")){
        retValue = "Facebook"
    }

    return retValue
}