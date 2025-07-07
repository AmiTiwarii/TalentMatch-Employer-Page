"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Camera,
  Download,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Moon,
  Plus,
  Save,
  Shield,
  Sun,
  Trash2,
  User,
  Users,
  Bell,
  SettingsIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@techcorp.com",
    role: "HR Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    joinedDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@techcorp.com",
    role: "Recruiter",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
    joinedDate: "2023-03-20",
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily.chen@techcorp.com",
    role: "Talent Acquisition",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Pending",
    joinedDate: "2024-01-10",
  },
]

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp",
    designation: "Senior Recruiter",
    bio: "Experienced recruiter with 8+ years in tech talent acquisition. Passionate about connecting great talent with innovative companies.",
    website: "https://johndoe.com",
    linkedin: "https://linkedin.com/in/johndoe",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailMessages: true,
    emailMarketing: false,
    pushApplications: true,
    pushMessages: true,
    pushMarketing: false,
    frequency: "immediate",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    timezone: "America/New_York",
    language: "en",
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const { toast } = useToast()

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleNotificationsSave = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
    setSecurity({ ...security, currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handlePreferencesSave = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved successfully.",
    })
  }

  const handleInviteTeamMember = () => {
    toast({
      title: "Invitation Sent",
      description: "Team member invitation has been sent successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    })
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Profile & Settings</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">Manage your account settings and preferences</p>
            </div>
            <Button
              variant="outline"
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20 w-fit"
              asChild
            >
              <Link href="/profile/public">
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white/20 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
            <TabsTrigger value="profile" className="flex items-center justify-center gap-2 text-xs lg:text-sm border">
              <User className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs lg:text-sm border">
              <Bell className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-xs lg:text-sm border">
              <Shield className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 text-xs lg:text-sm border">
              <Users className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 text-xs lg:text-sm border">
              <SettingsIcon className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <Avatar className="h-20 w-20 lg:h-24 lg:w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-slate-500 dark:text-slate-400">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={profile.designation}
                      onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-applications">New Applications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified when someone applies to your projects
                        </p>
                      </div>
                      <Switch
                        id="email-applications"
                        checked={notifications.emailApplications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailApplications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-messages">Messages</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch
                        id="email-messages"
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailMessages: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing">Marketing Updates</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Receive updates about new features and tips
                        </p>
                      </div>
                      <Switch
                        id="email-marketing"
                        checked={notifications.emailMarketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-applications">New Applications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get push notifications for new applications
                        </p>
                      </div>
                      <Switch
                        id="push-applications"
                        checked={notifications.pushApplications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushApplications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-messages">Messages</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get push notifications for new messages
                        </p>
                      </div>
                      <Switch
                        id="push-messages"
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushMessages: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notification Frequency */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
                  <Select
                    value={notifications.frequency}
                    onValueChange={(value) => setNotifications({ ...notifications, frequency: value })}
                  >
                    <SelectTrigger className="w-full lg:w-64 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNotificationsSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword.current ? "text" : "password"}
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                          className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                        >
                          {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword.new ? "text" : "password"}
                          value={security.newPassword}
                          onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                          className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        >
                          {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPassword.confirm ? "text" : "password"}
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                          className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                        >
                          {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Add an extra layer of security to your account
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {security.twoFactorEnabled
                          ? "Two-factor authentication is enabled"
                          : "Two-factor authentication is disabled"}
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Account Data */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Data</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">Export Account Data</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Download a copy of your account data
                        </p>
                      </div>
                      <Button
                        onClick={handleExportData}
                        variant="outline"
                        className="bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700 w-fit"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-fit">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Management
                    </CardTitle>
                    <CardDescription>Manage your team members and their access</CardDescription>
                  </div>
                  <Button onClick={handleInviteTeamMember} className="bg-blue-600 hover:bg-blue-700 text-white w-fit">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg bg-white/30 dark:bg-slate-700/30 gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{member.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{member.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {member.role}
                            </Badge>
                            <Badge
                              variant={member.status === "Active" ? "default" : "secondary"}
                              className={`text-xs ${
                                member.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-slate-500 dark:text-slate-400 hidden lg:block">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Role</DropdownMenuItem>
                            <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remove Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Application Preferences
                </CardTitle>
                <CardDescription>Customize your application experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div>
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    Choose your preferred theme for the application
                  </p>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger className="w-full lg:w-64 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <SettingsIcon className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Timezone */}
                <div>
                  <Label className="text-base font-medium">Timezone</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    Set your timezone for accurate scheduling
                  </p>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                  >
                    <SelectTrigger className="w-full lg:w-64 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Language */}
                <div>
                  <Label className="text-base font-medium">Language</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Choose your preferred language</p>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger className="w-full lg:w-64 bg-white/50 dark:bg-white/10 border-slate-200 dark:border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          English
                        </div>
                      </SelectItem>
                      <SelectItem value="es">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Español
                        </div>
                      </SelectItem>
                      <SelectItem value="fr">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Français
                        </div>
                      </SelectItem>
                      <SelectItem value="de">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Deutsch
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePreferencesSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
