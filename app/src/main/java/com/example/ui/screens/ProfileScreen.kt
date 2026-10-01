package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.data.NigeriaChatRepository

@Composable
fun ProfileScreen(
    modifier: Modifier = Modifier
) {
    val user = NigeriaChatRepository.currentUser
    val posts by NigeriaChatRepository.posts.collectAsState()
    val myPosts = remember(posts) { posts.filter { it.authorUsername == user.username } }

    var selectedTabIndex by remember { mutableIntStateOf(0) }
    val tabs = listOf("Posts", "Media", "Friends")

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF4F6F8)),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        // Profile Header Card
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column {
                    // Cover Banner
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(130.dp)
                            .background(
                                Brush.linearGradient(
                                    colors = listOf(Color(0xFF008751), Color(0xFF004D2E))
                                )
                            )
                    )

                    // Details Section
                    Column(
                        modifier = Modifier
                            .padding(horizontal = 16.dp)
                            .padding(bottom = 16.dp)
                    ) {
                        // Avatar Row with Edit Button
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .offset(y = (-40).dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.Bottom
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(86.dp)
                                    .border(4.dp, Color.White, CircleShape)
                                    .clip(CircleShape)
                                    .background(Color.White)
                            ) {
                                AsyncImage(
                                    model = ImageRequest.Builder(LocalContext.current)
                                        .data(user.avatarUrl)
                                        .crossfade(true)
                                        .build(),
                                    contentDescription = user.fullName,
                                    modifier = Modifier.fillMaxSize(),
                                    contentScale = ContentScale.Crop
                                )
                            }

                            OutlinedButton(
                                onClick = { },
                                shape = RoundedCornerShape(20.dp),
                                contentPadding = PaddingValues(horizontal = 14.dp, vertical = 4.dp)
                            ) {
                                Text("Edit Profile", fontSize = 12.sp, color = Color(0xFF0F172A))
                            }
                        }

                        // Name and State
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = user.fullName,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 20.sp,
                                color = Color(0xFF0F172A)
                            )
                            if (user.isVerified) {
                                Spacer(modifier = Modifier.width(6.dp))
                                Icon(
                                    imageVector = Icons.Default.CheckCircle,
                                    contentDescription = "Verified",
                                    tint = Color(0xFF008751),
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Spacer(modifier = Modifier.weight(1f))
                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = Color(0xFFE6F4EA)
                            ) {
                                Text(
                                    text = "🇳🇬 ${user.stateOfOrigin} State",
                                    color = Color(0xFF008751),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }

                        Text(
                            text = "@${user.username}",
                            fontSize = 13.sp,
                            color = Color(0xFF64748B)
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = user.bio,
                            fontSize = 13.5.sp,
                            color = Color(0xFF334155),
                            lineHeight = 19.sp
                        )

                        Spacer(modifier = Modifier.height(14.dp))

                        // Stats Row
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(20.dp)
                        ) {
                            Row {
                                Text(text = "420 ", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(text = "Followers", color = Color(0xFF64748B), fontSize = 13.sp)
                            }
                            Row {
                                Text(text = "180 ", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(text = "Following", color = Color(0xFF64748B), fontSize = 13.sp)
                            }
                            Row {
                                Text(text = "📍 ", fontSize = 13.sp)
                                Text(text = "${user.city}, Nigeria", color = Color(0xFF64748B), fontSize = 13.sp)
                            }
                        }
                    }
                }
            }
        }

        // Tabs Row
        item {
            TabRow(
                selectedTabIndex = selectedTabIndex,
                containerColor = Color.White,
                contentColor = Color(0xFF008751),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp)
                    .clip(RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
            ) {
                tabs.forEachIndexed { index, title ->
                    Tab(
                        selected = selectedTabIndex == index,
                        onClick = { selectedTabIndex = index },
                        text = {
                            Text(
                                text = title,
                                fontWeight = if (selectedTabIndex == index) FontWeight.Bold else FontWeight.Normal,
                                fontSize = 13.sp
                            )
                        }
                    )
                }
            }
        }

        // Tab Content
        when (selectedTabIndex) {
            0 -> {
                // User Posts
                items(myPosts, key = { it.id }) { post ->
                    PostCardView(
                        post = post,
                        onLikeClick = { NigeriaChatRepository.toggleLikePost(post.id) }
                    )
                }
            }
            1 -> {
                // Media
                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(text = "Photos & Media 📷", fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(10.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                AsyncImage(
                                    model = ImageRequest.Builder(LocalContext.current)
                                        .data("https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400")
                                        .crossfade(true)
                                        .build(),
                                    contentDescription = "Media",
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(100.dp)
                                        .clip(RoundedCornerShape(8.dp)),
                                    contentScale = ContentScale.Crop
                                )
                                AsyncImage(
                                    model = ImageRequest.Builder(LocalContext.current)
                                        .data("https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400")
                                        .crossfade(true)
                                        .build(),
                                    contentDescription = "Media",
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(100.dp)
                                        .clip(RoundedCornerShape(8.dp)),
                                    contentScale = ContentScale.Crop
                                )
                            }
                        }
                    }
                }
            }
            2 -> {
                // Friends
                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(text = "My Naija Network 🇳🇬", fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(10.dp))
                            Text(text = "• Babatunde Adeleke (@tunde_lagos) - Lagos", fontSize = 13.sp)
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(text = "• Chioma Okonkwo (@chioma_ph) - Rivers", fontSize = 13.sp)
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(text = "• Amina Yusuf (@amina_kano) - Kano", fontSize = 13.sp)
                        }
                    }
                }
            }
        }
    }
}
