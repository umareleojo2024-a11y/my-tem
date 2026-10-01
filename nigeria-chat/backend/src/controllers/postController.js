import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url, is_verified, state_of_origin),
        media:post_media(id, media_url, media_type, file_name)
      `)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, posts, 'Posts fetched successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const createPost = async (req, res) => {
  try {
    const author_id = req.user.id;
    const { content, location, visibility = 'public', media = [] } = req.body;

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .insert({
        author_id,
        content,
        location,
        visibility
      })
      .select()
      .single();

    if (error) return errorResponse(res, error.message, 400);

    if (media.length > 0) {
      const mediaRecords = media.map(m => ({
        post_id: post.id,
        media_url: m.url,
        media_type: m.type || 'image',
        file_name: m.name || null
      }));
      await supabaseAdmin.from('post_media').insert(mediaRecords);
    }

    return successResponse(res, post, 'Post created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const reactToPost = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id: target_id } = req.params;
    const { reaction_type = 'like' } = req.body;

    const { data, error } = await supabaseAdmin
      .from('reactions')
      .upsert({
        user_id,
        target_type: 'post',
        target_id,
        reaction_type
      })
      .select()
      .single();

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, data, 'Reaction recorded');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
