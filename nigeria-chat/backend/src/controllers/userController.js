import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return errorResponse(res, 'User not found', 404);
    return successResponse(res, profile, 'Profile fetched successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, data, 'Profile updated successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return successResponse(res, [], 'Empty query');

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, username, full_name, avatar_url, state_of_origin, is_verified')
      .or(`username.ilike.%${q}%,full_name.ilike.%${q}%`)
      .limit(20);

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, data, 'Users search results');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
