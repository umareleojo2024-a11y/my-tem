package com.example.model

data class UserProfile(
    val id: String,
    val username: String,
    val fullName: String,
    val avatarUrl: String,
    val coverUrl: String = "",
    val stateOfOrigin: String = "Lagos",
    val city: String = "Lagos",
    val bio: String = "",
    val isVerified: Boolean = false,
    val isOnline: Boolean = false
)

data class Conversation(
    val id: String,
    val title: String? = null,
    val isGroup: Boolean = false,
    val recipientName: String,
    val recipientUsername: String,
    val recipientAvatar: String,
    val recipientState: String = "Lagos",
    val lastMessage: String,
    val timestamp: String,
    val unreadCount: Int = 0,
    val isOnline: Boolean = false
)

data class ChatMessage(
    val id: String,
    val conversationId: String,
    val senderId: String,
    val senderName: String,
    val senderAvatar: String,
    val messageText: String,
    val mediaUrl: String? = null,
    val mediaType: String? = null,
    val replyToText: String? = null,
    val timestamp: String,
    val isRead: Boolean = true,
    val isSelf: Boolean = false
)

data class Post(
    val id: String,
    val authorName: String,
    val authorUsername: String,
    val authorAvatar: String,
    val authorState: String = "Lagos",
    val isVerified: Boolean = false,
    val content: String,
    val mediaUrl: String? = null,
    val location: String = "Lagos, Nigeria",
    val likesCount: Int = 0,
    val commentsCount: Int = 0,
    val isLiked: Boolean = false,
    val timestamp: String = "Just now"
)

data class Story(
    val id: String,
    val authorName: String,
    val authorUsername: String,
    val authorAvatar: String,
    val mediaUrl: String,
    val caption: String = "",
    val timestamp: String = "2h ago"
)

data class MarketplaceItem(
    val id: String,
    val title: String,
    val priceNaira: Long,
    val locationState: String,
    val category: String,
    val imageUrl: String,
    val sellerName: String
)

data class CommunityGroup(
    val id: String,
    val name: String,
    val category: String,
    val description: String,
    val membersCount: Int,
    val avatarUrl: String,
    val isJoined: Boolean = false
)

data class NotificationItem(
    val id: String,
    val title: String,
    val message: String,
    val type: String, // like, comment, follow, message
    val timestamp: String,
    val isRead: Boolean = false
)
