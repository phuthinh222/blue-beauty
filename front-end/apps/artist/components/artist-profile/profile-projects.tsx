"use client";

import { CheckCircle2, Calendar } from "lucide-react";

export type ProfileProject = {
  id: string;
  date: string;
  tasks: string[];
};

type ProfileProjectsProps = {
  projects: ProfileProject[];
};

export function ProfileProjects({ projects }: ProfileProjectsProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">Các dự án</h3>
      <div className="space-y-6">
        {projects.length === 0 ? (
          <p className="text-center text-sm text-slate-500">Chưa có dự án nào</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border-l-4 border-red-400 pl-4">
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">{project.date}</span>
              </div>
              <ul className="space-y-2">
                {project.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
