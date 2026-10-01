-- =============================================================================
-- Nigeria Chat Row Level Security (RLS) Policies
-- Owned by Eleojocafe
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. FRIENDSHIPS
CREATE POLICY "Users can view friendships they are involved in" ON public.friendships
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send friend requests" ON public.friendships
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update friendships they received or sent" ON public.friendships
    FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 3. FOLLOWS
CREATE POLICY "Follows are viewable by everyone" ON public.follows
    FOR SELECT USING (true);

CREATE POLICY "Users can follow others" ON public.follows
    FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow" ON public.follows
    FOR DELETE USING (auth.uid() = follower_id);

-- 4. POSTS
CREATE POLICY "Posts are viewable by everyone or friends" ON public.posts
    FOR SELECT USING (
        visibility = 'public' 
        OR author_id = auth.uid()
        OR (visibility = 'friends' AND EXISTS (
            SELECT 1 FROM public.friendships 
            WHERE status = 'accepted' 
            AND ((sender_id = auth.uid() AND receiver_id = posts.author_id) OR (receiver_id = auth.uid() AND sender_id = posts.author_id))
        ))
    );

CREATE POLICY "Authenticated users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);

-- 5. POST MEDIA
CREATE POLICY "Post media viewable with post access" ON public.post_media
    FOR SELECT USING (true);

CREATE POLICY "Authors can insert media to their posts" ON public.post_media
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM public.posts WHERE id = post_id AND author_id = auth.uid()
    ));

-- 6. COMMENTS
CREATE POLICY "Comments viewable by everyone" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their comments" ON public.comments
    FOR DELETE USING (auth.uid() = author_id);

-- 7. REACTIONS
CREATE POLICY "Reactions viewable by everyone" ON public.reactions
    FOR SELECT USING (true);

CREATE POLICY "Users can manage reactions" ON public.reactions
    FOR ALL USING (auth.uid() = user_id);

-- 8. CONVERSATIONS
CREATE POLICY "Users can view conversations they belong to" ON public.conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversation_members 
            WHERE conversation_members.conversation_id = conversations.id 
            AND conversation_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can create conversations" ON public.conversations
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- 9. CONVERSATION MEMBERS
CREATE POLICY "Members can view members of their conversations" ON public.conversation_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversation_members cm 
            WHERE cm.conversation_id = conversation_members.conversation_id 
            AND cm.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can join conversations" ON public.conversation_members
    FOR INSERT WITH CHECK (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.conversations WHERE id = conversation_id AND created_by = auth.uid()
    ));

-- 10. MESSAGES
CREATE POLICY "Members can view messages in their conversations" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversation_members 
            WHERE conversation_members.conversation_id = messages.conversation_id 
            AND conversation_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Members can send messages in their conversations" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.conversation_members 
            WHERE conversation_members.conversation_id = messages.conversation_id 
            AND conversation_members.user_id = auth.uid()
        )
    );

-- 11. NOTIFICATIONS
CREATE POLICY "Users can view their notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = receiver_id);

CREATE POLICY "Users can update their notifications (mark as read)" ON public.notifications
    FOR UPDATE USING (auth.uid() = receiver_id);

-- 12. STORIES
CREATE POLICY "Active stories are viewable by authenticated users" ON public.stories
    FOR SELECT USING (expires_at > NOW());

CREATE POLICY "Users can post stories" ON public.stories
    FOR INSERT WITH CHECK (auth.uid() = author_id);

-- 13. GROUPS & PAGES
CREATE POLICY "Public groups are viewable" ON public.groups
    FOR SELECT USING (NOT is_private OR EXISTS (
        SELECT 1 FROM public.group_members WHERE group_id = groups.id AND user_id = auth.uid()
    ));

CREATE POLICY "Pages are viewable" ON public.pages
    FOR SELECT USING (true);

-- 14. MARKETPLACE & EVENTS
CREATE POLICY "Marketplace items are viewable" ON public.marketplace_items
    FOR SELECT USING (true);

CREATE POLICY "Sellers can manage their items" ON public.marketplace_items
    FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Events are viewable" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Organizers can manage events" ON public.events
    FOR ALL USING (auth.uid() = organizer_id);
