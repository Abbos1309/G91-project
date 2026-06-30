"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ChevronDown } from "lucide-react";

const API_URL = "http://localhost:5000/jobs";

export default function CreateJob() {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [category, setCategory] = useState("Technology");
    const [jobType, setJobType] = useState("Full-time");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");

    const [loading, setLoading] = useState(false);

    const handleReset = () => {
        setTitle("");
        setCompany("");
        setLocation("");
        setSalary("");
        setCategory("Technology");
        setJobType("Full-time");
        setDescription("");
        setRequirements("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const requirementsArray = requirements
            .split(",")
            .map((req) => req.trim())
            .filter((req) => req !== "");

        try {
            // Making the request directly using the flat states
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

            // Clear the form fields directly upon successful addition
            handleReset();
            alert("Job added successfully!");
        } catch (error) {
            console.error("Failed to add job posting:", error);
            alert("Error adding job posting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-12 max-w-5xl w-full mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin"
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-4 py-2 rounded-md text-sm transition-colors shadow-sm"
                >
                    ← Back to Jobs
                </Link>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Create New Job</h1>
                <p className="text-slate-500 text-sm">Fill in the form below to create a new job posting</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-8">Add New Job</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Job Title *</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Senior Frontend Engineer"
                                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Company *</label>
                            <input
                                type="text"
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="e.g., TechCorp"
                                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Location *</label>
                            <input
                                type="text"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g., San Francisco, CA"
                                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Salary (Optional)</label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="e.g., $100,000 - $150,000"
                                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-slate-400 text-slate-700 font-medium cursor-pointer"
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Finance">Finance</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Job Type</label>
                            <div className="relative">
                                <select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-slate-400 text-slate-700 font-medium cursor-pointer"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">Description *</label>
                        <textarea
                            required
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Job description and responsibilities..."
                            className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg p-4 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">Requirements (comma-separated)</label>
                        <input
                            type="text"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            placeholder="e.g., React, TypeScript, 5+ years experience, Node.js"
                            className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#0f4c81] hover:bg-[#0c3e69] text-white font-bold text-sm py-2.5 rounded-lg transition-colors text-center disabled:opacity-50 shadow-sm"
                        >
                            {loading ? "Adding..." : "Add Job"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold py-2.5 rounded-lg transition-colors text-center shadow-sm"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}