const main = document.querySelector(".main");
const form  = document.querySelector(".form");

function updateImages(data){
    main.innerHTML = `
    <div class="img_card">
            <img src="data:image/jpeg;base64, ${data[0].b64_json}" alt="AI Image" class="img">
            <a href="data:image/jpeg;base64, ${data[0].b64_json}" download="AI Image ${new Date().getTime()}.jpg">
                <img src="download.jpg" alt="Download Button" class="image">
            </a>
        </div>
        <div class="img_card">
            <img src="data:image/jpeg;base64, ${data[1].b64_json}" alt="AI Image" class="img">
            <a href="data:image/jpeg;base64, ${data[1].b64_json}" download="AI Image ${new Date().getTime()}.jpg">
                <img src="download.jpg" alt="Download Button" class="image">
            </a>
        </div>
    `;
}

const OPENAI_API_KEY = //YourAPIKey
async function getAIImages(input){
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                    prompt: input,
                    n: 2,
                    size: "512x512",
                    response_format: "b64_json"
            })
        });
        const { data } = await response.json();
        console.log(data);
        updateImages([...data]);
        if(!response.ok) throw new Error("Failed to generate images");
    }
    catch(error){
        alert(error.message);
    }
}

function loadingAnimation(e){
    e.preventDefault();
    const input = e.srcElement[0].value;
    main.innerHTML = ` <div>
    <img src="Iphone-spinner-2.gif" alt="Loading">
    <p>Loading...</p>
</div>`;

    getAIImages(input);
} 

form.addEventListener("submit", loadingAnimation)
