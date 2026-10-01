package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.NigeriaChatRepository
import com.example.ui.screens.ChatScreen
import com.example.ui.screens.GroupsScreen
import com.example.ui.screens.HomeScreen
import com.example.ui.screens.MarketplaceScreen
import com.example.ui.screens.NotificationsScreen
import com.example.ui.screens.ProfileScreen
import com.example.ui.screens.SettingsScreen
import com.example.ui.theme.MyApplicationTheme

enum class NavTab(val title: String, val icon: ImageVector) {
    HOME("Feed", Icons.Default.Home),
    CHAT("Chat", Icons.Default.Chat),
    MARKET("Market", Icons.Default.ShoppingCart),
    GROUPS("Groups", Icons.Default.Group),
    ALERTS("Alerts", Icons.Default.Notifications),
    PROFILE("Profile", Icons.Default.Person),
    SETTINGS("Settings", Icons.Default.Settings)
}

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyApplicationTheme {
                NigeriaChatMainApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NigeriaChatMainApp() {
    var currentTab by remember { mutableStateOf(NavTab.HOME) }
    val conversations by NigeriaChatRepository.conversations.collectAsState()
    val unreadChatCount = remember(conversations) { conversations.sumOf { it.unreadCount } }

    val notifications by NigeriaChatRepository.notifications.collectAsState()
    val unreadNotifCount = remember(notifications) { notifications.count { !it.isRead } }

    // Android back handler: Return to HOME feed if currently on another tab
    BackHandler(enabled = currentTab != NavTab.HOME) {
        currentTab = NavTab.HOME
    }

    Scaffold(
        modifier = Modifier
            .fillMaxSize()
            .statusBarsPadding(),
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "🇳🇬 Nigeria Chat",
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 18.sp,
                                color = Color(0xFF008751)
                            )
                        }
                        Text(
                            text = "Owned by Eleojocafe",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(0xFF64748B)
                        )
                    }
                },
                navigationIcon = {
                    Surface(
                        modifier = Modifier
                            .padding(start = 12.dp)
                            .clip(CircleShape)
                            .clickable { currentTab = NavTab.PROFILE },
                        color = Color(0xFFE6F4EA)
                    ) {
                        Text(
                            text = "EC",
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF008751),
                            fontSize = 13.sp,
                            modifier = Modifier.padding(8.dp)
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { currentTab = NavTab.CHAT }) {
                        BadgedBox(
                            badge = {
                                if (unreadChatCount > 0) {
                                    Badge(
                                        containerColor = Color(0xFF008751),
                                        contentColor = Color.White
                                    ) {
                                        Text("$unreadChatCount")
                                    }
                                }
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Chat,
                                contentDescription = "Quick Chat",
                                tint = if (currentTab == NavTab.CHAT) Color(0xFF008751) else Color(0xFF334155)
                            )
                        }
                    }
                    IconButton(onClick = { currentTab = NavTab.SETTINGS }) {
                        Icon(
                            imageVector = Icons.Default.Settings,
                            contentDescription = "Settings",
                            tint = if (currentTab == NavTab.SETTINGS) Color(0xFF008751) else Color(0xFF334155)
                        )
                    }
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(containerColor = Color.White)
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 8.dp
            ) {
                listOf(NavTab.HOME, NavTab.CHAT, NavTab.MARKET, NavTab.GROUPS, NavTab.ALERTS, NavTab.PROFILE).forEach { tab ->
                    val isSelected = currentTab == tab
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentTab = tab },
                        icon = {
                            if (tab == NavTab.CHAT && unreadChatCount > 0) {
                                BadgedBox(
                                    badge = {
                                        Badge(
                                            containerColor = Color(0xFF008751),
                                            contentColor = Color.White
                                        ) {
                                            Text("$unreadChatCount")
                                        }
                                    }
                                ) {
                                    Icon(imageVector = tab.icon, contentDescription = tab.title)
                                }
                            } else if (tab == NavTab.ALERTS && unreadNotifCount > 0) {
                                BadgedBox(
                                    badge = {
                                        Badge(
                                            containerColor = Color(0xFFE11D48),
                                            contentColor = Color.White
                                        ) {
                                            Text("$unreadNotifCount")
                                        }
                                    }
                                ) {
                                    Icon(imageVector = tab.icon, contentDescription = tab.title)
                                }
                            } else {
                                Icon(imageVector = tab.icon, contentDescription = tab.title)
                            }
                        },
                        label = {
                            Text(
                                text = tab.title,
                                fontSize = 11.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF008751),
                            selectedTextColor = Color(0xFF008751),
                            indicatorColor = Color(0xFFE6F4EA),
                            unselectedIconColor = Color(0xFF64748B),
                            unselectedTextColor = Color(0xFF64748B)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentTab) {
                NavTab.HOME -> HomeScreen(onNavigateToChat = { currentTab = NavTab.CHAT })
                NavTab.CHAT -> ChatScreen()
                NavTab.MARKET -> MarketplaceScreen()
                NavTab.GROUPS -> GroupsScreen()
                NavTab.ALERTS -> NotificationsScreen()
                NavTab.PROFILE -> ProfileScreen()
                NavTab.SETTINGS -> SettingsScreen()
            }
        }
    }
}
