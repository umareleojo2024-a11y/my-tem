package com.example.data

import com.example.model.ChatMessage
import com.example.model.CommunityGroup
import com.example.model.Conversation
import com.example.model.MarketplaceItem
import com.example.model.NotificationItem
import com.example.model.Post
import com.example.model.Story
import com.example.model.UserProfile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.text.NumberFormat
import java.util.Locale

object NigeriaChatRepository {

    val currentUser = UserProfile(
        id = "usr_eleojo_001",
        username = "eleojocafe",
        fullName = "Eleojo Cafe",
        avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        stateOfOrigin = "Kogi",
        city = "Abuja",
        bio = "Founder of Nigeria Chat. Connecting 200 Million Nigerians worldwide 🇳🇬✨",
        isVerified = true,
        isOnline = true
    )

    private val _conversations = MutableStateFlow<List<Conversation>>(
        listOf(
            Conversation(
                id = "conv_001",
                recipientName = "Babatunde Adeleke",
                recipientUsername = "tunde_lagos",
                recipientAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                recipientState = "Lagos",
                lastMessage = "Hello Eleojo! Excited about Nigeria Chat 🚀",
                timestamp = "10m ago",
                unreadCount = 1,
                isOnline = true
            ),
            Conversation(
                id = "conv_002",
                title = "Naija Tech Hub 🇳🇬",
                isGroup = true,
                recipientName = "Naija Tech Hub 🇳🇬",
                recipientUsername = "naija_tech",
                recipientAvatar = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200",
                recipientState = "Abuja",
                lastMessage = "Let us organize an Abuja tech meetup next weekend!",
                timestamp = "1h ago",
                unreadCount = 3,
                isOnline = true
            ),
            Conversation(
                id = "conv_003",
                recipientName = "Chioma Okonkwo",
                recipientUsername = "chioma_ph",
                recipientAvatar = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
                recipientState = "Rivers",
                lastMessage = "The event in Port Harcourt was phenomenal!",
                timestamp = "3h ago",
                unreadCount = 0,
                isOnline = false
            ),
            Conversation(
                id = "conv_004",
                recipientName = "Amina Yusuf",
                recipientUsername = "amina_kano",
                recipientAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
                recipientState = "Kano",
                lastMessage = "Sent the new Northern art catalog.",
                timestamp = "Yesterday",
                unreadCount = 0,
                isOnline = false
            )
        )
    )
    val conversations: StateFlow<List<Conversation>> = _conversations.asStateFlow()

    private val _messages = MutableStateFlow<Map<String, List<ChatMessage>>>(
        mapOf(
            "conv_001" to listOf(
                ChatMessage(
                    id = "m1",
                    conversationId = "conv_001",
                    senderId = "usr_tunde",
                    senderName = "Babatunde Adeleke",
                    senderAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                    messageText = "Good day Eleojo! How is the Nigeria Chat rollout going?",
                    timestamp = "10:30 AM",
                    isSelf = false
                ),
                ChatMessage(
                    id = "m2",
                    conversationId = "conv_001",
                    senderId = currentUser.id,
                    senderName = currentUser.fullName,
                    senderAvatar = currentUser.avatarUrl,
                    messageText = "Going great! We have real-time messaging, stories, marketplace in Naira, and community groups all live.",
                    timestamp = "10:35 AM",
                    isSelf = true
                ),
                ChatMessage(
                    id = "m3",
                    conversationId = "conv_001",
                    senderId = "usr_tunde",
                    senderName = "Babatunde Adeleke",
                    senderAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                    messageText = "Hello Eleojo! Excited about Nigeria Chat 🚀",
                    timestamp = "10:40 AM",
                    isSelf = false
                )
            ),
            "conv_002" to listOf(
                ChatMessage(
                    id = "m10",
                    conversationId = "conv_002",
                    senderId = "usr_chioma",
                    senderName = "Chioma Okonkwo",
                    senderAvatar = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
                    messageText = "Welcome founders and developers to Naija Tech Hub!",
                    timestamp = "8:15 AM",
                    isSelf = false
                ),
                ChatMessage(
                    id = "m11",
                    conversationId = "conv_002",
                    senderId = "usr_amina",
                    senderName = "Amina Yusuf",
                    senderAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
                    messageText = "Let us organize an Abuja tech meetup next weekend!",
                    timestamp = "9:00 AM",
                    isSelf = false
                )
            )
        )
    )
    val messages: StateFlow<Map<String, List<ChatMessage>>> = _messages.asStateFlow()

    private val _posts = MutableStateFlow<List<Post>>(
        listOf(
            Post(
                id = "p1",
                authorName = "Eleojo Cafe",
                authorUsername = "eleojocafe",
                authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
                authorState = "Kogi",
                isVerified = true,
                content = "Welcome to Nigeria Chat! Built with love for our vibrant community across Nigeria and around the globe. Share your thoughts, connect with friends, and let Naija shine! 🇳🇬💚",
                mediaUrl = "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800",
                location = "Abuja FCT, Nigeria",
                likesCount = 48,
                commentsCount = 12,
                isLiked = true,
                timestamp = "1h ago"
            ),
            Post(
                id = "p2",
                authorName = "Babatunde Adeleke",
                authorUsername = "tunde_lagos",
                authorAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                authorState = "Lagos",
                isVerified = true,
                content = "Tech innovators in Lagos: Who is building AI tools tailored for African languages (Yoruba, Igbo, Hausa, Pidgin)? Let us connect in the comments!",
                location = "Yaba, Lagos",
                likesCount = 35,
                commentsCount = 19,
                isLiked = false,
                timestamp = "3h ago"
            ),
            Post(
                id = "p3",
                authorName = "Chioma Okonkwo",
                authorUsername = "chioma_ph",
                authorAvatar = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
                authorState = "Rivers",
                isVerified = true,
                content = "Sunny afternoon in Port Harcourt! Don't miss the Port Harcourt Creative Festival this Friday evening. 🍲🎨",
                mediaUrl = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
                location = "Port Harcourt, Rivers",
                likesCount = 29,
                commentsCount = 7,
                isLiked = false,
                timestamp = "5h ago"
            )
        )
    )
    val posts: StateFlow<List<Post>> = _posts.asStateFlow()

    private val _stories = MutableStateFlow<List<Story>>(
        listOf(
            Story(
                id = "s1",
                authorName = "Babatunde Adeleke",
                authorUsername = "tunde_lagos",
                authorAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                mediaUrl = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
                caption = "Lekki toll gate sunsets 🌅 #LagosVibes",
                timestamp = "2h ago"
            ),
            Story(
                id = "s2",
                authorName = "Amina Yusuf",
                authorUsername = "amina_kano",
                authorAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
                mediaUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
                caption = "Kano art exhibition opening today! 🎨",
                timestamp = "4h ago"
            ),
            Story(
                id = "s3",
                authorName = "Eleojo Cafe",
                authorUsername = "eleojocafe",
                authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
                mediaUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                caption = "Abuja tech founders meetup in progress 🇳🇬🚀",
                timestamp = "6h ago"
            )
        )
    )
    val stories: StateFlow<List<Story>> = _stories.asStateFlow()

    private val _marketplaceItems = MutableStateFlow<List<MarketplaceItem>>(
        listOf(
            MarketplaceItem(
                id = "m1",
                title = "Apple iPhone 15 Pro Max (256GB)",
                priceNaira = 1450000L,
                locationState = "Lagos",
                category = "Phones & Gadgets",
                imageUrl = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
                sellerName = "Lagos iStore NG"
            ),
            MarketplaceItem(
                id = "m2",
                title = "Toyota Camry 2020 (Lagos Cleared)",
                priceNaira = 16800000L,
                locationState = "Lagos",
                category = "Vehicles",
                imageUrl = "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
                sellerName = "AutoMobiles Nigeria"
            ),
            MarketplaceItem(
                id = "m3",
                title = "3-Bedroom Luxury Terrace Duplex",
                priceNaira = 95000000L,
                locationState = "FCT Abuja",
                category = "Real Estate",
                imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
                sellerName = "Abuja Prime Properties"
            ),
            MarketplaceItem(
                id = "m4",
                title = "Handmade Nigerian Agbada Attire",
                priceNaira = 85000L,
                locationState = "Oyo",
                category = "Fashion",
                imageUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
                sellerName = "Ibadan Classic Tailors"
            )
        )
    )
    val marketplaceItems: StateFlow<List<MarketplaceItem>> = _marketplaceItems.asStateFlow()

    private val _groups = MutableStateFlow<List<CommunityGroup>>(
        listOf(
            CommunityGroup(
                id = "g1",
                name = "Lagos Tech & Startup Ecosystem 🚀",
                category = "Technology",
                description = "The largest gathering of software engineers, founders, and tech investors in Yaba & Lagos.",
                membersCount = 14200,
                avatarUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200",
                isJoined = true
            ),
            CommunityGroup(
                id = "g2",
                name = "Naija Foodies & Jollof Masters 🍲",
                category = "Food & Culture",
                description = "Celebrating authentic Nigerian recipes, street food, and the glorious Jollof!",
                membersCount = 28900,
                avatarUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
                isJoined = false
            ),
            CommunityGroup(
                id = "g3",
                name = "Abuja Real Estate & Living 🏢",
                category = "Business",
                description = "Housing, land acquisition, and modern architecture in the federal capital.",
                membersCount = 8750,
                avatarUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200",
                isJoined = false
            )
        )
    )
    val groups: StateFlow<List<CommunityGroup>> = _groups.asStateFlow()

    private val _notifications = MutableStateFlow<List<NotificationItem>>(
        listOf(
            NotificationItem(
                id = "n1",
                title = "New Like",
                message = "Babatunde Adeleke liked your welcome post",
                type = "like",
                timestamp = "30m ago",
                isRead = false
            ),
            NotificationItem(
                id = "n2",
                title = "New Comment",
                message = "Chioma Okonkwo commented: 'Proudly Nigerian! Loving Nigeria Chat.'",
                type = "comment",
                timestamp = "1h ago",
                isRead = false
            ),
            NotificationItem(
                id = "n3",
                title = "New Follower",
                message = "Amina Yusuf started following you from Kano State",
                type = "follow",
                timestamp = "4h ago",
                isRead = true
            )
        )
    )
    val notifications: StateFlow<List<NotificationItem>> = _notifications.asStateFlow()

    fun sendMessage(conversationId: String, text: String, replyToText: String? = null, mediaUrl: String? = null) {
        val newMsg = ChatMessage(
            id = "msg_${System.currentTimeMillis()}",
            conversationId = conversationId,
            senderId = currentUser.id,
            senderName = currentUser.fullName,
            senderAvatar = currentUser.avatarUrl,
            messageText = text,
            mediaUrl = mediaUrl,
            mediaType = if (mediaUrl != null) "image" else null,
            replyToText = replyToText,
            timestamp = "Just now",
            isRead = true,
            isSelf = true
        )

        val currentMap = _messages.value.toMutableMap()
        val list = (currentMap[conversationId] ?: emptyList()) + newMsg
        currentMap[conversationId] = list
        _messages.value = currentMap

        // Update conversation last message
        _conversations.value = _conversations.value.map { conv ->
            if (conv.id == conversationId) {
                conv.copy(
                    lastMessage = text.ifEmpty { "Photo Attachment" },
                    timestamp = "Just now"
                )
            } else conv
        }
    }

    fun startConversation(recipientName: String): Conversation {
        val newConv = Conversation(
            id = "conv_${System.currentTimeMillis()}",
            recipientName = recipientName,
            recipientUsername = recipientName.lowercase().replace(" ", "_"),
            recipientAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=$recipientName",
            recipientState = "Nigeria",
            lastMessage = "Started a new conversation",
            timestamp = "Just now",
            isOnline = true
        )
        _conversations.value = listOf(newConv) + _conversations.value
        return newConv
    }

    fun addPost(content: String, mediaUrl: String? = null, location: String = "Lagos, Nigeria") {
        val newPost = Post(
            id = "p_${System.currentTimeMillis()}",
            authorName = currentUser.fullName,
            authorUsername = currentUser.username,
            authorAvatar = currentUser.avatarUrl,
            authorState = currentUser.stateOfOrigin,
            isVerified = currentUser.isVerified,
            content = content,
            mediaUrl = mediaUrl,
            location = location,
            likesCount = 0,
            commentsCount = 0,
            isLiked = false,
            timestamp = "Just now"
        )
        _posts.value = listOf(newPost) + _posts.value
    }

    fun toggleLikePost(postId: String) {
        _posts.value = _posts.value.map { p ->
            if (p.id == postId) {
                val nextLiked = !p.isLiked
                val delta = if (nextLiked) 1 else -1
                p.copy(
                    isLiked = nextLiked,
                    likesCount = maxOf(0, p.likesCount + delta)
                )
            } else p
        }
    }

    fun addStory(mediaUrl: String, caption: String) {
        val newStory = Story(
            id = "s_${System.currentTimeMillis()}",
            authorName = currentUser.fullName,
            authorUsername = currentUser.username,
            authorAvatar = currentUser.avatarUrl,
            mediaUrl = mediaUrl,
            caption = caption,
            timestamp = "Just now"
        )
        _stories.value = listOf(newStory) + _stories.value
    }

    fun toggleGroupJoin(groupId: String) {
        _groups.value = _groups.value.map { g ->
            if (g.id == groupId) {
                val nextJoined = !g.isJoined
                val delta = if (nextJoined) 1 else -1
                g.copy(
                    isJoined = nextJoined,
                    membersCount = maxOf(1, g.membersCount + delta)
                )
            } else g
        }
    }

    fun markAllNotificationsRead() {
        _notifications.value = _notifications.value.map { it.copy(isRead = true) }
    }

    fun formatNaira(amount: Long): String {
        val formatter = NumberFormat.getNumberInstance(Locale.US)
        return "₦" + formatter.format(amount)
    }
}
