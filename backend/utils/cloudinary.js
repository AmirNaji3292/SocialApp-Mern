import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name:"dvyfww2yc",
    api_key:439731293942352,
    api_secret:"VXPSkL1HbvxqpfU3aQ6jERRnnbw"
})

export const cloudinaryUploadImage=async(fileUpload)=>{
    try {
        const data = await cloudinary.uploader.upload(fileUpload, {
             resource_type: "auto"
        })
        return {
             url : data.secure_url
        }
   } catch (error) {
        return error
   }
}