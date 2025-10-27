const Imagekit = require("imagekit");

const imagekit = new Imagekit({
    // publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    // privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    // urlEndpoint : process.env.IMAGEKIT_URL,

    publicKey : "public_ieHUqt/kZLPS0j7O3knP/ccqQQg=" ,
    privateKey : "private_pZclQ9PO1ksGvcgZZA81DI3nbKM=",
    urlEndpoint : "https://ik.imagekit.io/klpd001",
});

async function uploadFile(file, fileName) {
    const result = await imagekit. upload({
        file: file, // required
        fileName: fileName,
    }) // required
    return result; // Return the URL of the uploaded file
}
module.exports ={
    uploadFile,
}