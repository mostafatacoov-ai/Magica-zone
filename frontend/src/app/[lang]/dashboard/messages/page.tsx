"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAssignedTeachers, getOrCreateChat, sendMessage } from "@/lib/firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Send, User } from "lucide-react";

export default function MessagesPage({ params: { lang } }: { params: { lang: string } }) {
    const { user, role } = useAuth();
    const isArabic = lang === 'ar';
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");

    // For simplicity in this phase, if user is a Parent, load Teachers to message
    useEffect(() => {
        if (role === "parent" && user) {
            getAssignedTeachers(user.uid).then(setTeachers);
        }
    }, [role, user]);

    // Listen to messages for the selected chat
    useEffect(() => {
        if (!selectedChatId) return;

        const messagesRef = collection(db, "chats", selectedChatId, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [selectedChatId]);

    const handleSelectTeacher = async (teacherUid: string) => {
        if (!user) return;
        const chatId = await getOrCreateChat(user.uid, teacherUid);
        setSelectedChatId(chatId);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChatId || !user) return;

        await sendMessage(selectedChatId, user.uid, newMessage);
        setNewMessage("");
    };

    if (!user) return null;

    return (
        <div className="h-[calc(100vh-8rem)] flex bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sidebar / Contacts List */}
            <div className={`w-1/3 border-${isArabic ? 'l' : 'r'} border-gray-200 bg-gray-50 flex flex-col`}>
                <div className="p-6 border-b border-gray-200 bg-white">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isArabic ? "المعلمون" : "Teachers"}
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {teachers.map(teacher => (
                        <div 
                            key={teacher.id}
                            onClick={() => handleSelectTeacher(teacher.id)}
                            className="p-4 bg-white rounded-xl shadow-sm cursor-pointer hover:border-orange-500 border border-transparent transition-all flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="font-bold text-gray-800 truncate">{teacher.email || "Teacher"}</p>
                            </div>
                        </div>
                    ))}
                    {teachers.length === 0 && role === "parent" && (
                        <p className="text-gray-500 text-sm text-center mt-4">
                            {isArabic ? "لا يوجد معلمون متاحون." : "No teachers available."}
                        </p>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white relative">
                {selectedChatId ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, idx) => {
                                const isMe = msg.senderId === user.uid;
                                return (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={msg.id || idx}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`px-5 py-3 rounded-2xl max-w-[70%] ${
                                            isMe 
                                            ? 'bg-orange-500 text-white rounded-br-none' 
                                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={isArabic ? "اكتب رسالة..." : "Type a message..."}
                                    className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    className="px-6 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 shrink-0"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageSquare className="w-16 h-16 text-gray-200 mb-4" />
                        <p>{isArabic ? "اختر معلمًا لبدء المحادثة" : "Select a teacher to start chatting"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Dummy icon for empty state
function MessageSquare(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}
