"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCMSData } from "@/lib/cms/contentStore";
import { 
    getCourseEnrollments, 
    createAssignment, 
    getCourseAssignments, 
    getCourseSubmissions, 
    gradeSubmission, 
    Enrollment, 
    Assignment, 
    Submission 
} from "@/lib/courses/courseManager";
import { GraduationCap, Users, BookOpen, CheckCircle, PenTool, Award, Plus, FileText } from "lucide-react";

export default function TeacherDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const { user } = useAuth();
    const { data } = useCMSData();
    const courses = data.courses || [];

    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    
    // Assignment Creation Form
    const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
    const [assignTitle, setAssignTitle] = useState("");
    const [assignDesc, setAssignDesc] = useState("");
    const [assignScore, setAssignScore] = useState(10);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Grading state
    const [gradingSubId, setGradingSubId] = useState<string | null>(null);
    const [gradeScore, setGradeScore] = useState(0);
    const [gradeFeedback, setGradeFeedback] = useState("");

    const loadCourseData = async (courseId: string) => {
        if (!courseId) return;
        const enrs = await getCourseEnrollments(courseId);
        setEnrollments(enrs);
        const assigns = await getCourseAssignments(courseId);
        setAssignments(assigns);
        const subs = await getCourseSubmissions(courseId);
        setSubmissions(subs);
    };

    useEffect(() => {
        if (selectedCourseId) {
            loadCourseData(selectedCourseId);
        } else {
            setEnrollments([]);
            setAssignments([]);
            setSubmissions([]);
        }
    }, [selectedCourseId]);

    const handleCreateAssignment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCourseId || !user) return;
        setIsSubmitting(true);
        await createAssignment(selectedCourseId, user.uid, assignTitle, assignDesc, assignScore);
        setIsSubmitting(false);
        setIsCreatingAssignment(false);
        setAssignTitle("");
        setAssignDesc("");
        setAssignScore(10);
        loadCourseData(selectedCourseId); // Refresh
    };

    const handleGradeSubmission = async (subId: string, maxScore: number, childId: string) => {
        if (!subId || !user) return;
        await gradeSubmission(subId, gradeScore, gradeFeedback, user.uid, childId);
        setGradingSubId(null);
        setGradeScore(0);
        setGradeFeedback("");
        loadCourseData(selectedCourseId);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black mb-2">{isArabic ? "مرحباً بك، أيها المعلم" : "Welcome, Teacher"}</h2>
                        <p className="text-blue-100 font-medium">{isArabic ? "إدارة الكورسات، المهام، وتقييم الطلاب" : "Manage courses, assignments, and grade students"}</p>
                    </div>
                    <GraduationCap className="w-16 h-16 text-blue-200/50" />
                </div>
            </div>

            {/* Course Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    {isArabic ? "اختر الكورس للإدارة" : "Select Course to Manage"}
                </label>
                <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none font-bold text-gray-800"
                >
                    <option value="">{isArabic ? "-- اختر كورس --" : "-- Select a Course --"}</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{isArabic ? c.titleAr : c.titleEn}</option>
                    ))}
                </select>
            </div>

            {selectedCourseId && (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Students & Assignments */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Enrolled Students */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{isArabic ? "الطلاب المسجلين" : "Enrolled Students"}</h3>
                            </div>
                            
                            {enrollments.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">{isArabic ? "لا يوجد طلاب مسجلين." : "No enrolled students."}</p>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {enrollments.map(enr => (
                                        <div key={enr.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-sm">
                                                {enr.childId.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">Student ID: {enr.childId.slice(0, 6)}</p>
                                                <p className="text-xs text-green-600 font-bold">{isArabic ? "مسجل" : "Enrolled"}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Assignments List */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{isArabic ? "مهام الكورس" : "Course Assignments"}</h3>
                                </div>
                                <button
                                    onClick={() => setIsCreatingAssignment(!isCreatingAssignment)}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-bold text-sm hover:bg-orange-100"
                                >
                                    <Plus className="w-4 h-4" />
                                    {isArabic ? "إضافة مهمة" : "Add Assignment"}
                                </button>
                            </div>

                            {isCreatingAssignment && (
                                <form onSubmit={handleCreateAssignment} className="mb-6 p-4 bg-orange-50/50 rounded-xl border border-orange-100 space-y-4">
                                    <input
                                        required
                                        type="text"
                                        placeholder={isArabic ? "عنوان المهمة" : "Assignment Title"}
                                        value={assignTitle}
                                        onChange={e => setAssignTitle(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                                    />
                                    <textarea
                                        required
                                        placeholder={isArabic ? "وصف المهمة" : "Description"}
                                        value={assignDesc}
                                        onChange={e => setAssignDesc(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm resize-none"
                                    />
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-600 block mb-1">{isArabic ? "الدرجة القصوى (النقاط)" : "Max Score (Points)"}</label>
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                value={assignScore}
                                                onChange={e => setAssignScore(Number(e.target.value))}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-5 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50"
                                        >
                                            {isArabic ? "حفظ" : "Save"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {assignments.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">{isArabic ? "لا يوجد مهام." : "No assignments created."}</p>
                            ) : (
                                <div className="space-y-3">
                                    {assignments.map(a => (
                                        <div key={a.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-gray-800">{a.title}</h4>
                                                <p className="text-sm text-gray-500 line-clamp-2">{a.description}</p>
                                            </div>
                                            <span className="font-black text-orange-500 bg-orange-100 px-3 py-1 rounded-full text-xs">
                                                {a.maxScore} {isArabic ? "نقطة" : "pts"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Grading Desk */}
                    <div className="lg:col-span-1">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                    <PenTool className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{isArabic ? "مكتب التقييم" : "Grading Desk"}</h3>
                            </div>

                            {submissions.length === 0 ? (
                                <p className="text-gray-500 text-center py-10 text-sm">
                                    <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    {isArabic ? "لا توجد تسليمات بعد." : "No submissions yet."}
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {submissions.map(sub => {
                                        const assign = assignments.find(a => a.id === sub.assignmentId);
                                        if (!assign) return null;
                                        const isGrading = gradingSubId === sub.id;

                                        return (
                                            <div key={sub.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                                                        Student: {sub.childId.slice(0, 5)}
                                                    </span>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${sub.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {sub.status}
                                                    </span>
                                                </div>
                                                <h5 className="font-bold text-gray-800 text-sm">{assign.title}</h5>
                                                
                                                {sub.content && (
                                                    <div className="bg-white p-2 rounded border border-gray-200 text-sm text-gray-700">
                                                        {sub.content}
                                                    </div>
                                                )}
                                                {sub.link && (
                                                    <a href={sub.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline block break-all">
                                                        {sub.link}
                                                    </a>
                                                )}

                                                {sub.status === 'submitted' && !isGrading && (
                                                    <button
                                                        onClick={() => { setGradingSubId(sub.id); setGradeScore(assign.maxScore); }}
                                                        className="w-full py-2 bg-green-500 text-white font-bold rounded-lg text-sm hover:bg-green-600"
                                                    >
                                                        {isArabic ? "تقييم الآن" : "Grade Now"}
                                                    </button>
                                                )}

                                                {isGrading && (
                                                    <div className="bg-white p-3 rounded-lg border border-green-200 space-y-3">
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-600">{isArabic ? "الدرجة" : "Score"}</label>
                                                            <input
                                                                type="number"
                                                                max={assign.maxScore}
                                                                min={0}
                                                                value={gradeScore}
                                                                onChange={e => setGradeScore(Number(e.target.value))}
                                                                className="w-full px-3 py-1.5 rounded border border-gray-200 outline-none text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-600">{isArabic ? "ملاحظات (اختياري)" : "Feedback"}</label>
                                                            <input
                                                                type="text"
                                                                value={gradeFeedback}
                                                                onChange={e => setGradeFeedback(e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded border border-gray-200 outline-none text-sm"
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleGradeSubmission(sub.id, assign.maxScore, sub.childId)}
                                                                className="flex-1 bg-green-500 text-white text-xs font-bold py-2 rounded hover:bg-green-600"
                                                            >
                                                                {isArabic ? "حفظ" : "Save"}
                                                            </button>
                                                            <button
                                                                onClick={() => setGradingSubId(null)}
                                                                className="flex-1 bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded hover:bg-gray-300"
                                                            >
                                                                {isArabic ? "إلغاء" : "Cancel"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {sub.status === 'graded' && (
                                                    <div className="bg-green-50 p-2 rounded-lg text-sm">
                                                        <div className="font-bold text-green-700">Score: {sub.score} / {assign.maxScore}</div>
                                                        {sub.feedback && <div className="text-xs text-green-600 mt-1">{sub.feedback}</div>}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
