"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { NAV_ITEMS } from "@/lib/constants";
import { getProjectsSummary } from "@/services/projectsService";
export function CommandPalette({ open, onOpenChange }) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);
    useEffect(() => {
        if (!open)
            return;
        try {
            setProjects(getProjectsSummary());
        }
        catch {
            setProjects([]);
        }
    }, [open]);
    const run = (href) => {
        onOpenChange(false);
        navigate(href);
    };
    return (<CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages and projects..."/>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {NAV_ITEMS.map((item) => (<CommandItem key={item.href} onSelect={() => run(item.href)}>
              <item.icon className="mr-2 h-4 w-4"/>
              {item.title}
            </CommandItem>))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((project) => (<CommandItem key={project.id} onSelect={() => run(`/app/projects/${project.id}`)}>
              {project.name}
            </CommandItem>))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>);
}
