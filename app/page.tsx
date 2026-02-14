"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [url, setUrl] = useState("")
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ---------- Load bookmarks ----------
  const loadBookmarks = async (userId: string) => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error

      setBookmarks(data || [])
    } catch (err) {
      console.error("Load bookmarks error:", err)
    } finally {
      setLoading(false)
    }
  }

  // ---------- Initial Session Check ----------
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
        await loadBookmarks(session.user.id)
      }

      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        loadBookmarks(session.user.id)
      } else {
        setUser(null)
        setBookmarks([])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ---------- Add bookmark ----------
  const addBookmark = async () => {
    if (!user) {
      alert("You are not logged in")
      return
    }

    if (!url.trim()) {
      alert("Enter a URL")
      return
    }

    try {
      const { error } = await supabase.from("bookmarks").insert([
        {
          user_id: user.id,
          url: url,
          title: url,
        },
      ])

      if (error) throw error

      setUrl("")
      await loadBookmarks(user.id)
    } catch (err) {
      console.error("Add error:", err)
      alert("Failed to add bookmark")
    }
  }

  // ---------- Delete bookmark ----------
  const deleteBookmark = async (id: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)

      if (error) throw error

      await loadBookmarks(user.id)
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  // ---------- Logout ----------
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setBookmarks([])
  }

  // ---------- Login ----------
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  // ---------- Loading ----------
  if (loading) {
    return <div className="container">Loading...</div>
  }

  // ---------- Not Logged In ----------
  if (!user) {
    return (
      <div className="container">
        <h2>Please login</h2>
        <button onClick={handleLogin}>
          Login with Google
        </button>
      </div>
    )
  }

  // ---------- Main UI ----------
  return (
    <div className="container">
      <div className="title">🔖 Smart Bookmark</div>
      <div className="subtitle">Welcome {user.email}</div>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>

      <div className="inputRow">
        <input
          type="text"
          placeholder="Paste a link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addBookmark}>Add</button>
      </div>

      <h3>Your Links</h3>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet</p>
      ) : (
        bookmarks.map((b) => (
          <div key={b.id} className="bookmark">
            <a href={b.url} target="_blank" rel="noreferrer">
              {b.url}
            </a>

            <button
              className="deleteBtn"
              onClick={() => deleteBookmark(b.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

