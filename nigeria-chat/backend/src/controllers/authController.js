import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const register = async (req, res) => {
  try {
    const { email, password, username, fullName, stateOfOrigin } = req.body;
    if (!email || !password || !username) {
      return errorResponse(res, 'Email, password, and username are required', 400);
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName || username,
          state_of_origin: stateOfOrigin || 'Lagos'
        }
      }
    });

    if (error) {
      return errorResponse(res, error.message, 400);
    }

    return successResponse(res, data, 'Registration successful', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return errorResponse(res, error.message, 401);
    }

    return successResponse(res, data, 'Login successful');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return errorResponse(res, error.message, 404);
    }

    return successResponse(res, profile, 'User profile retrieved');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
