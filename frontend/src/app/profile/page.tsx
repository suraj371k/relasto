// app/profile/edit/page.tsx (or pages/profile/edit.tsx if using Pages Router)
"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, X, AlertCircle, User, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const EditProfilePage = () => {
  const { updateProfile, loading, error, user } = useAuthStore()
  const router = useRouter()

  const [experience, setExperience] = useState(user?.experience || 0)
  const [social, setSocial] = useState<string[]>(user?.social || [])
  const [socialInput, setSocialInput] = useState("")
  const [image, setImage] = useState<File | undefined>(undefined)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  

  useEffect(() => {
    if(!user){
        router.push('/auth/login')
    }
  })

  const addSocialLink = () => {
    if (socialInput.trim() && !social.includes(socialInput.trim())) {
      setSocial((prev) => [...prev, socialInput.trim()])
      setSocialInput("")
    }
  }

  const removeSocialLink = (linkToRemove: string) => {
    setSocial((prev) => prev.filter((link) => link !== linkToRemove))
  }

  const handleUpdate = async () => {
    try {
      if (!image) {
        alert("Please select a profile image.")
        return
      }

      await updateProfile({ experience, social, image })
      alert("Profile updated successfully!")
      router.push("/") // Or navigate back to dashboard or profile view
    } catch {
      alert("Update failed. Please try again.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <User className="h-5 w-5" />
        Edit Profile
      </h1>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Profile Image */}
          <div className="space-y-3">
            <Label htmlFor="profile-image">Profile Image</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imagePreview || user?.image} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-sm text-muted-foreground mt-1">{'Upload a new profile picture'}</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <Label>Social Links</Label>
            <div className="flex gap-2">
              <Input
                value={socialInput}
                onChange={(e) => setSocialInput(e.target.value)}
                placeholder="Enter social media URL"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSocialLink()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addSocialLink}
                disabled={!socialInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {social.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {social.map((link, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 pr-1">
                    <span className="truncate max-w-[200px]">{link}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeSocialLink(link)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleUpdate} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Update Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProfilePage
