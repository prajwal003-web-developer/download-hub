
const HandleClick = async () => {
    let data = document.getElementsByTagName('input')[0].value
    const button = document.getElementsByTagName('button')[0]

    const box = document.getElementById("data")



    if (!data || data.length < 10) {
        box.classList.remove("border-blue-600" , 'border-green-600')
        box.classList.add('border-red-600')
        box.innerText = "Your Link is Too Short..."

        alert("Input Field Should Have Valid Data")
        return
    }
    let url = 'https://fast-api-pied-one.vercel.app/download'

    try {
        button.disabled = true
        box.classList.remove("border-blue-600" , 'border-red-600')
        box.classList.add('border-green-600')
        box.innerText = "The Link Sent To Backend Wait"
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                url:data
            })
        })
        box.innerText = "Data Arrived.."
        const retData = await res.json()

        const a = document.createElement('a')
        a.href = retData.url
        a.target="_blank"
        a.innerText= "View Or Download"
        const parent = document.getElementById('link_Box')
        a.classList.add("font-semibold" ,"w-full", "p-2","text-center",'text-black' , 'bg-white')
        parent.appendChild(a)
       

    } catch (error) {
        box.classList.remove("border-blue-600" , 'border-green-600')
        box.classList.add('border-red-600')
        box.innerText = "The Link Sent is Not So Good Try Next"
        console.log(error)
    }
    finally {
        button.disabled = false
        
    }

    console.log(data)
}
