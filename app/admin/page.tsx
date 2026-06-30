"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Briefcase } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Job } from "../types";

const API_URL = "http://localhost:5000/jobs";

export default function JobsCRUD() {
    const [jobs, setJobs] = useState<Job[]>([]);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [category, setCategory] = useState("Technology");
    const [jobType, setJobType] = useState("Full-time");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingJobId, setEditingJobId] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        setFetchLoading(true);
        try {
            const response = await axios.get<Job[]>(API_URL);
            setJobs(response.data);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setFetchLoading(false);
        }
    };

    const openCreateModal = () => {
        clearForm();
        setModalMode("create");
        setIsModalOpen(true);
    };

    const openEditModal = (job: Job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary === "Not Specified" ? "" : job.salary);
        setCategory(job.category);
        setJobType(job.job_type);
        setDescription(job.description);
        setRequirements(job.requirements ? job.requirements.join(", ") : "");

        setModalMode("edit");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        clearForm();
        setIsModalOpen(false);
    };

    const clearForm = () => {
        setTitle("");
        setCompany("");
        setLocation("");
        setSalary("");
        setCategory("Technology");
        setJobType("Full-time");
        setDescription("");
        setRequirements("");
        setEditingJobId(null);
    };

    const handleSaveJob = async () => {
        setLoading(true);

        const requirementsArray = requirements
            .split(",")
            .map((req) => req.trim())
            .filter((req) => req !== "");

        try {
            if (modalMode === "create") {
                await axios.post(API_URL, {
                    title,
                    company,
                    location,
                    salary: salary || "Not Specified",
                    category,
                    job_type: jobType,
                    description,
                    requirements: requirementsArray,
                    created_at: new Date().toISOString()
                });
                closeModal();
                getJobs();
            } else if (modalMode === "edit" && editingJobId) {
                await axios.patch(`${API_URL}/${editingJobId}`, {
                    title,
                    company,
                    location,
                    salary: salary || "Not Specified",
                    category,
                    job_type: jobType,
                    description,
                    requirements: requirementsArray,
                });
                closeModal();
                getJobs();
            }
        } catch (error) {
            console.error("Error saving job entry", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            getJobs();
        } catch (error) {
            console.error("Error deleting job listing", error);
        }
    };

    return (
        <div className="p-12 max-w-[1200px] w-full mx-auto font-sans">
            {/* Top Dashboard Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Internal Job Board</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage, create, modify, and track public job vacancies</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 bg-[#0f4c81] hover:bg-[#0c3e69] text-white font-bold text-sm px-4 py-2.5 rounded-lg border-none cursor-pointer transition-colors duration-200 shadow-sm"
                >
                    <Plus size={16} /> Add New Job
                </button>
            </div>

            {/* Main Listings Data Table View */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-x-auto">
                {fetchLoading ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                        Gathering available job listings...
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                        <Briefcase className="w-12 h-12 text-slate-300 mb-3" />
                        <h3 className="text-base font-semibold text-slate-700 mb-1">No vacancies compiled yet</h3>
                        <p className="text-slate-400 text-sm max-w-sm">Get started by creating your very first post configuration profile.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200/60">
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4">Job Info</th>
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4">Requirements</th>
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4">Category</th>
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4">Type</th>
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4">Compensation</th>
                                <th className="text-slate-500 text-xs uppercase font-bold tracking-wider px-6 py-4 text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 align-top">
                                        <div className="font-bold text-slate-900">{job.title}</div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">{job.company} — {job.location}</div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        {job.requirements && job.requirements.length > 0 ? (
                                            <ul className="flex flex-wrap gap-1 p-0 list-none m-0">
                                                {job.requirements.map((req, idx) => (
                                                    <li key={idx} className="text-[11px] bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-slate-300 text-xs">None</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800">
                                            {job.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                            {job.job_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top font-medium text-slate-600">
                                        {job.salary}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(job)}
                                                className="bg-transparent border-none p-2 rounded-md cursor-pointer text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                                                title="Modify Entry"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="bg-transparent border-none p-2 rounded-md cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                                                title="Drop Listing"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* shadcn/ui Dialog Component */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[650px] bg-white p-6 max-h-[90vh] overflow-y-auto rounded-xl">
                    <DialogHeader className="border-b border-slate-100 pb-4 mb-6">
                        <DialogTitle className="text-xl font-bold text-slate-900">
                            {modalMode === "create" ? "Add New Job Listing" : "Modify Listing Details"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Job Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Senior Frontend Engineer"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Company *</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., TechCorp"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Location *</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., San Francisco, CA"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Salary (Optional)</label>
                                <input
                                    type="text"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="e.g., $100,000 - $150,000"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-800">Job Type</label>
                                <select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-800">Description *</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Job description and responsibilities..."
                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-800">Requirements (comma-separated)</label>
                            <input
                                type="text"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                placeholder="e.g., React, TypeScript, 5+ years experience"
                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none bg-slate-50/50 text-slate-700 focus:border-slate-400 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleSaveJob}
                                disabled={loading}
                                className="inline-flex justify-center items-center bg-[#0f4c81] hover:bg-[#0c3e69] text-white font-bold text-sm px-4 py-2.5 rounded-lg border-none cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                {loading ? "Processing..." : modalMode === "create" ? "Add Job" : "Update Details"}
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm px-4 py-2.5 rounded-lg border border-slate-200 cursor-pointer transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}