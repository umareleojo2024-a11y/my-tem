import { supabaseAdmin } from '../services/supabaseAdmin.js';
import { errorResponse } from '../utils/response.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return errorResponse(res, 'Unauthorized - Invalid session', 401, error);
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 'Auth verification failed', 500, err.message);
  }
};

export default requireAuth;
