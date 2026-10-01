import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getUploadUrl = async (req, res) => {
  try {
    const { bucket = 'post-images', fileName } = req.body;
    if (!fileName) return errorResponse(res, 'File name is required', 400);

    const ext = fileName.split('.').pop();
    const uniquePath = `${req.user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUploadUrl(uniquePath);

    if (error) return errorResponse(res, error.message, 400);

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(uniquePath);

    return successResponse(res, {
      signedUrl: data.signedUrl,
      token: data.token,
      path: uniquePath,
      publicUrl: publicUrlData.publicUrl
    }, 'Upload URL generated');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
