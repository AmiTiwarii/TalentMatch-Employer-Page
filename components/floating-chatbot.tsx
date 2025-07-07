"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Bot,
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
  Minimize2,
  Maximize2,
  User,
  ExternalLink,
  Sparkles,
  Navigation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  links?: { text: string; url: string }[]
  feedback?: "positive" | "negative" | null
  actions?: { text: string; action: () => void }[]
}

const intelligentResponses = {
  // Navigation queries
  "show me applications": {
    response:
      "I'll take you to the Applications page where you can view all candidate applications, shortlist candidates, and manage the hiring process.",
    links: [{ text: "View Applications", url: "/dashboard/applicants" }],
    navigate: "/dashboard/applicants",
  },
  "view candidates": {
    response:
      "Here you can see all candidates who have applied to your projects. You can review profiles, shortlist, and make offers.",
    links: [{ text: "View Candidates", url: "/dashboard/applicants" }],
    navigate: "/dashboard/applicants",
  },
  "my projects": {
    response:
      "Let me show you your projects dashboard where you can manage all your posted projects, view applications, and track progress.",
    links: [{ text: "My Projects", url: "/dashboard/projects" }],
    navigate: "/dashboard/projects",
  },
  "post new project": {
    response:
      "I'll help you create a new project posting. You can specify requirements, skills needed, and project details.",
    links: [{ text: "Post Project", url: "/dashboard/post-project" }],
    navigate: "/dashboard/post-project",
  },
  "search talent": {
    response:
      "Let me take you to the talent search where you can find students based on skills, university, experience, and more.",
    links: [{ text: "Search Talent", url: "/dashboard/search-talent" }],
    navigate: "/dashboard/search-talent",
  },
  messages: {
    response: "Here's your messaging center where you can communicate with candidates and manage all conversations.",
    links: [{ text: "View Messages", url: "/dashboard/messages" }],
    navigate: "/dashboard/messages",
  },
  dashboard: {
    response: "Taking you to your main dashboard with overview of projects, applications, and key metrics.",
    links: [{ text: "Dashboard", url: "/dashboard" }],
    navigate: "/dashboard",
  },

  // Action queries
  "shortlist candidate": {
    response:
      "To shortlist a candidate: 1) Go to Applications, 2) Find the candidate, 3) Click 'Shortlist' button. I can take you there now.",
    links: [{ text: "View Applications", url: "/dashboard/applicants" }],
    navigate: "/dashboard/applicants",
  },
  "make offer": {
    response:
      "To make an offer: 1) Go to Applications, 2) Select a shortlisted candidate, 3) Click 'Make Offer'. Let me show you.",
    links: [{ text: "View Applications", url: "/dashboard/applicants" }],
    navigate: "/dashboard/applicants",
  },
  "recommend student": {
    response:
      "You can recommend students by going to the candidate profiles and clicking 'Recommend'. This helps match them with suitable projects.",
    links: [{ text: "Search Talent", url: "/dashboard/search-talent" }],
    navigate: "/dashboard/search-talent",
  },

  // Help queries
  "how to": {
    response:
      "I can help you with various tasks! Try asking me to 'show applications', 'post new project', 'search talent', or 'view messages'. What would you like to do?",
  },
  help: {
    response:
      "I'm your AI assistant! I can help you navigate the platform, explain features, and take you directly to the right pages. What do you need help with?",
  },
}

const suggestedQuestions = [
  {
    text: "Show me my applications",
    response: intelligentResponses["show me applications"],
  },
  {
    text: "How do I shortlist a candidate?",
    response: intelligentResponses["shortlist candidate"],
  },
  {
    text: "Take me to search talent",
    response: intelligentResponses["search talent"],
  },
  {
    text: "Help me post a new project",
    response: intelligentResponses["post new project"],
  },
]

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hi! I'm your intelligent assistant. I can help you navigate the platform, manage applications, and answer questions. Try asking me to 'show applications' or 'search talent'!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isFullscreen) {
      inputRef.current?.focus()
    }
  }, [isOpen, isFullscreen])

  const findBestResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()

    // Direct matches
    for (const [key, response] of Object.entries(intelligentResponses)) {
      if (lowerQuery.includes(key)) {
        return response
      }
    }

    // Keyword matching
    if (lowerQuery.includes("application") || lowerQuery.includes("candidate")) {
      return intelligentResponses["show me applications"]
    }
    if (lowerQuery.includes("project") && lowerQuery.includes("post")) {
      return intelligentResponses["post new project"]
    }
    if (lowerQuery.includes("project")) {
      return intelligentResponses["my projects"]
    }
    if (lowerQuery.includes("talent") || lowerQuery.includes("search") || lowerQuery.includes("find")) {
      return intelligentResponses["search talent"]
    }
    if (lowerQuery.includes("message") || lowerQuery.includes("chat")) {
      return intelligentResponses["messages"]
    }
    if (lowerQuery.includes("shortlist")) {
      return intelligentResponses["shortlist candidate"]
    }
    if (lowerQuery.includes("offer")) {
      return intelligentResponses["make offer"]
    }
    if (lowerQuery.includes("recommend")) {
      return intelligentResponses["recommend student"]
    }
    if (lowerQuery.includes("help") || lowerQuery.includes("how")) {
      return intelligentResponses["help"]
    }

    return null
  }

  const handleSuggestedQuestion = (question: { text: string; response: any }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: question.text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: question.response.response,
        timestamp: new Date(),
        links: question.response.links,
        actions: question.response.navigate
          ? [
              {
                text: "Take me there",
                action: () => {
                  router.push(question.response.navigate)
                  setIsOpen(false)
                },
              },
            ]
          : undefined,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const query = inputValue
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const intelligentResponse = findBestResponse(query)

      let botMessage: Message

      if (intelligentResponse) {
        botMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: intelligentResponse.response,
          timestamp: new Date(),
          links: intelligentResponse.links,
          actions: intelligentResponse.navigate
            ? [
                {
                  text: "Take me there",
                  action: () => {
                    router.push(intelligentResponse.navigate!)
                    setIsOpen(false)
                  },
                },
              ]
            : undefined,
        }
      } else {
        botMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            "I understand you're looking for help! I can assist you with navigating to applications, projects, talent search, messages, or help with specific tasks like shortlisting candidates. Try asking me something like 'show my applications' or 'help me post a project'.",
          timestamp: new Date(),
          links: [
            { text: "View Applications", url: "/dashboard/applicants" },
            { text: "My Projects", url: "/dashboard/projects" },
            { text: "Search Talent", url: "/dashboard/search-talent" },
          ],
        }
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
          size="icon"
        >
          <Bot className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>
    )
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <Card className="w-full h-full max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl rounded-none md:rounded-lg md:m-4 md:h-[calc(100vh-2rem)]">
          <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-none md:rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-white/20 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Assistant
                </CardTitle>
                <p className="text-sm opacity-90">Intelligent • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
            <ScrollArea className="flex-1 p-4 md:p-6">
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`rounded-2xl p-4 text-sm md:text-base ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        }`}
                      >
                        {message.content}
                        {message.links && (
                          <div className="mt-3 space-y-2">
                            {message.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                className="flex items-center gap-2 text-sm underline hover:no-underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                                {link.text}
                              </a>
                            ))}
                          </div>
                        )}
                        {message.actions && (
                          <div className="mt-3 space-y-2">
                            {message.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant="secondary"
                                size="sm"
                                onClick={action.action}
                                className="w-full justify-start gap-2"
                              >
                                <Navigation className="h-4 w-4" />
                                {action.text}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.type === "bot" && message.id !== "welcome" && (
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleFeedback(message.id, "positive")}
                          >
                            <ThumbsUp
                              className={`h-4 w-4 ${
                                message.feedback === "positive" ? "text-green-600 fill-current" : "text-slate-400"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleFeedback(message.id, "negative")}
                          >
                            <ThumbsDown
                              className={`h-4 w-4 ${
                                message.feedback === "negative" ? "text-red-600 fill-current" : "text-slate-400"
                              }`}
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Avatar className={`h-8 w-8 ${message.type === "user" ? "order-1 ml-3" : "order-2 mr-3"} self-end`}>
                      <AvatarFallback className="text-sm">
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                      Try these intelligent commands:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="text-left justify-start text-sm h-auto p-4 bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
                          {question.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-700">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything... 'show applications', 'search talent', 'help me post project'"
                    className="flex-1 text-base bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Assistant
                    </Badge>
                    <span className="text-xs text-slate-500">Intelligent navigation & help</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Card className="w-80 md:w-96 h-96 md:h-[32rem] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-white/20 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI Assistant
              </CardTitle>
              <p className="text-xs opacity-90">Intelligent • Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-80 md:h-[26rem]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                      }`}
                    >
                      {message.content}
                      {message.links && (
                        <div className="mt-2 space-y-1">
                          {message.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              className="flex items-center gap-1 text-xs underline hover:no-underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}
                      {message.actions && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="secondary"
                              size="sm"
                              onClick={action.action}
                              className="w-full justify-start gap-1 h-7 text-xs"
                            >
                              <Navigation className="h-3 w-3" />
                              {action.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.type === "bot" && message.id !== "welcome" && (
                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleFeedback(message.id, "positive")}
                        >
                          <ThumbsUp
                            className={`h-3 w-3 ${
                              message.feedback === "positive" ? "text-green-600 fill-current" : "text-slate-400"
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleFeedback(message.id, "negative")}
                        >
                          <ThumbsDown
                            className={`h-3 w-3 ${
                              message.feedback === "negative" ? "text-red-600 fill-current" : "text-slate-400"
                            }`}
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Avatar className={`h-6 w-6 ${message.type === "user" ? "order-1 ml-2" : "order-2 mr-2"} self-end`}>
                    <AvatarFallback className="text-xs">
                      {message.type === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 dark:text-slate-400 text-center">Try these commands:</p>
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start text-xs h-auto p-2 bg-transparent border-slate-200 dark:border-slate-700"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-blue-600" />
                      {question.text}
                    </Button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="icon"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Assistant
              </Badge>
              <span className="text-xs text-slate-500">Intelligent help</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
