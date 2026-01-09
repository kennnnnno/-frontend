
// Cloudinaryの設定情報
    export const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME; 
    export const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET||"";  // Unsigned Upload用にCloudinaryで設定が必要

export const photoupload =async (file:File) => {
    
    // フォームデータを作成し、ファイルとプリセットを追加
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        
        const data = await response.json();
        // data.secure_url に公開URLが入っている
        // data.public_id に一意の識別子が入っている
        return { 
            url: data.secure_url, 
            publicId: data.public_id 
        };
        
    } catch (error) {
        console.error('アップロード中にエラーが発生しました:', error);
        throw error;
    }
}

export const photourl=(id:string)=>{
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${id}`;
}