"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  ArrowLeft,
  Star,
  Archive,
  Trash2,
  Filter,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Message {
  id: number
  text: string
  sender: "user" | "contact"
  timestamp: Date
  read: boolean
}

interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unreadCount: number
  online: boolean
  role: string
  university: string
  project: string
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for considering my application!",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    online: true,
    role: "Frontend Developer Applicant",
    university: "MIT",
    project: "Frontend Developer Intern",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have some questions about the project requirements",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    online: true,
    role: "Backend Developer Applicant",
    university: "Stanford",
    project: "Backend Developer",
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When can we schedule the interview?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
    online: false,
    role: "UI/UX Designer Applicant",
    university: "UC Berkeley",
    project: "UI/UX Designer",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've updated my portfolio as requested",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0,
    online: false,
    role: "Full Stack Developer Applicant",
    university: "Carnegie Mellon",
    project: "Full Stack Developer",
  },
]

const mockMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      text: "Hi Sarah! Thank you for your application to our Frontend Developer Intern position.",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 2,
      text: "I've reviewed your portfolio and I'm impressed with your React projects. Could you tell me more about your experience with TypeScript?",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 3,
      text: "Thank you so much for reaching out! I've been working with TypeScript for about 2 years now, primarily in React applications.",
      sender: "contact",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      read: true,
    },
    {
      id: 4,
      text: "I've used it extensively in my recent project - a task management app that I built for my software engineering course. The type safety really helped catch bugs early in development.",
      sender: "contact",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      read: true,
    },
    {
      id: 5,
      text: "That sounds great! I'd love to see that project. Could you share the GitHub link?",
      sender: "user",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true,
    },
    {
      id: 6,
      text: "Here's the link: https://github.com/sarahjohnson/task-manager",
      sender: "contact",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false,
    },
    {
      id: 7,
      text: "Thank you for considering my application!",
      sender: "contact",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
  ],
}

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages[1] || [])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setMessages(mockMessages[contact.id] || [])
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Contacts Sidebar */}
        <div
          className={`${isMobileView && selectedContact ? "hidden" : "flex"} flex-col w-full md:w-80 border-r border-white/20 dark:border-slate-700/20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm`}
        >
          {/* Contacts Header */}
          <div className="p-4 border-b border-white/20 dark:border-slate-700/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Messages</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 dark:bg-slate-700/70 border-white/20 dark:border-slate-600/20"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-white/70 dark:hover:bg-slate-700/70 ${
                    selectedContact?.id === contact.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/20"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">{contact.name}</h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatTime(contact.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-1">{contact.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {contact.project}
                      </Badge>
                      {contact.unreadCount > 0 && (
                        <div className="h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {contact.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div
          className={`${isMobileView && !selectedContact ? "hidden" : "flex"} flex-1 flex flex-col bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm`}
        >
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-slate-700/20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {isMobileView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedContact(null)}
                      className="h-8 w-8 md:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedContact.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{selectedContact.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedContact.role} • {selectedContact.university}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Star Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-white border border-white/20 dark:border-slate-600/20"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-white/70" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20 dark:border-slate-700/20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="bg-white/70 dark:bg-slate-700/70 border-white/20 dark:border-slate-600/20 resize-none"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="h-10 w-10 shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Select a conversation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
