
const cloudinary = require('cloudinary').v2;
import { GraphQLError } from 'graphql'

export default async function upload(path: string, fileName: string) {

    // Configuration
    cloudinary.config({
        cloud_name: "dssw3epdr",
        api_key: "971944725224197",
        api_secret: "Pxm-CEBHGOOf_AEHd1dlLPl_33E"
    });

    // Upload
    let downloadUrl: string = "";
    try{
        const data = await cloudinary.uploader.upload(path, {public_id: fileName})
        downloadUrl = data.secure_url;
    }catch (e: any) {
        throw new GraphQLError(`error in cloudinary... ${e.message}`);
    }
    // Generate url
    const url = await cloudinary.url(fileName, {
        width: 100,
        height: 100,
        Crop: 'fill'
    });
    return {url, downloadUrl};
}
